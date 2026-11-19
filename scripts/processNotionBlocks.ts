import { createHash } from 'node:crypto'
import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { isFullBlock, type BlockObjectResponse, type Client } from '@notionhq/client'
import { parseHTML } from 'linkedom'
import pMap from 'p-map'
import type { ExtendedBookmarkObjectResponse, ExtendedImageBlockObjectResponse } from '../features/notion/types/blocks'
import type { TraversableBlock } from '../features/notion/types/unions'

const imageDir = path.join(process.cwd(), 'public', 'notion-img')

export async function pruneCachedImages(activeImages: ReadonlySet<string>) {
  await mkdir(imageDir, { recursive: true })
  const entries = await readdir(imageDir, { withFileTypes: true })
  const generatedName = /^[a-f0-9-]{36}(?:-[a-f0-9]{16})?\.[a-z0-9]{1,8}$/i
  await Promise.all(
    entries
      .filter(entry => entry.isFile() && generatedName.test(entry.name) && !activeImages.has(entry.name))
      .map(entry => unlink(path.join(imageDir, entry.name)))
  )
}

async function cacheImage(
  block: Extract<BlockObjectResponse, { type: 'image' }>,
  activeImages: Set<string>
): Promise<ExtendedImageBlockObjectResponse> {
  const image = block.image
  const url = image.type === 'file' ? image.file.url : image.external.url

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const ext = path.extname(new URL(url).pathname).toLowerCase()
    const data = Buffer.from(await response.arrayBuffer())
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 16)
    const filename = `${block.id}-${hash}${/^\.[a-z0-9]{1,8}$/.test(ext) ? ext : '.png'}`
    await mkdir(imageDir, { recursive: true })
    await writeFile(path.join(imageDir, filename), data)
    activeImages.add(filename)
    return { ...block, image: { ...image, cached_url: `/notion-img/${filename}` } }
  } catch (cause) {
    if (image.type === 'file') throw new Error(`Could not save Notion image ${block.id}`, { cause })
    console.warn(`Could not cache external image ${block.id}`)
    return block
  }
}

async function enrichBookmark(block: Extract<BlockObjectResponse, { type: 'bookmark' }>): Promise<ExtendedBookmarkObjectResponse> {
  const { url } = block.bookmark
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3_000) })
    if (!response.ok) return { ...block, bookmarkInfo: { url } }
    const { document } = parseHTML(await response.text())
    const metadata = (...names: string[]) =>
      names.map(name => document.querySelector(`meta[property="${name}"], meta[name="${name}"]`)?.getAttribute('content')).find(Boolean) ?? undefined
    const image = metadata('og:image', 'twitter:image')
    return {
      ...block,
      bookmarkInfo: {
        url,
        title: metadata('og:title', 'twitter:title') ?? document.querySelector('title')?.textContent ?? undefined,
        description: metadata('og:description', 'twitter:description', 'description'),
        image: image ? new URL(image, response.url).href : undefined,
      },
    }
  } catch {
    return { ...block, bookmarkInfo: { url } }
  }
}

function groupLists(blocks: TraversableBlock[]): TraversableBlock[] {
  const grouped: TraversableBlock[] = []
  for (const block of blocks) {
    const previous = grouped.at(-1)
    if (block.type === 'bulleted_list_item') {
      if (previous?.type === 'grouped_bulleted_list_item') previous.grouped_bulleted_list_item.children.push(block)
      else
        grouped.push({
          ...groupedListBase(block),
          id: `grouped_${block.type}_${block.id}`,
          has_children: false,
          type: 'grouped_bulleted_list_item',
          grouped_bulleted_list_item: { children: [block] },
        })
    } else if (block.type === 'numbered_list_item') {
      if (previous?.type === 'grouped_numbered_list_item') previous.grouped_numbered_list_item.children.push(block)
      else
        grouped.push({
          ...groupedListBase(block),
          id: `grouped_${block.type}_${block.id}`,
          has_children: false,
          type: 'grouped_numbered_list_item',
          grouped_numbered_list_item: { children: [block] },
        })
    } else grouped.push(block)
  }
  return grouped
}

function groupedListBase(block: Extract<BlockObjectResponse, { type: 'bulleted_list_item' | 'numbered_list_item' }>) {
  const { object, parent, created_time, last_edited_time, created_by, last_edited_by, archived, in_trash } = block
  return { object, parent, created_time, last_edited_time, created_by, last_edited_by, archived, in_trash }
}

export async function processBlocks(client: Client, block_id: string, activeImages: Set<string>): Promise<TraversableBlock[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined
  do {
    const response = await client.blocks.children.list({ block_id, start_cursor: cursor, page_size: 100 })
    blocks.push(...response.results.filter(isFullBlock))
    cursor = response.next_cursor ?? undefined
  } while (cursor)

  const processed = await pMap(
    blocks,
    async (block): Promise<TraversableBlock> => {
      if (block.type === 'image') return cacheImage(block, activeImages)
      if (block.type === 'bookmark') return enrichBookmark(block)
      if (!block.has_children) return block

      const children = await processBlocks(client, block.id, activeImages)
      const payload = (block as unknown as Record<string, object>)[block.type]
      return { ...block, [block.type]: { ...payload, children } }
    },
    { concurrency: 5 }
  )

  return groupLists(processed)
}
