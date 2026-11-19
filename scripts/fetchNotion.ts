import { existsSync } from 'node:fs'
import { mkdir, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { isFullDatabase, isFullPage, type Client, type PageObjectResponse } from '@notionhq/client'
import dayjs from 'dayjs'
import pMap from 'p-map'
import { getPlainText } from '../features/notion/components/richText/getPlainText'
import { SNAPSHOT_PATH } from '../features/notion/remote/snapshotPath'
import type { NotionSnapshot, PostIndex } from '../features/notion/types/post'
import { getNotionClient, getRequestCount } from './notionClient'
import { processBlocks, pruneCachedImages } from './processNotionBlocks'

function getPostIndex(page: PageObjectResponse): PostIndex {
  const { title, slug, summary, date, tags } = page.properties
  if (
    title?.type !== 'title' ||
    slug?.type !== 'rich_text' ||
    summary?.type !== 'rich_text' ||
    date?.type !== 'date' ||
    tags?.type !== 'multi_select'
  ) {
    throw new Error(`Unexpected blog properties on Notion page ${page.id}`)
  }

  const postSlug = getPlainText(slug.rich_text)
  const postDate = dayjs(date.date?.start ?? null)
  if (!postSlug || !postDate.isValid()) {
    throw new Error(`Published Notion page ${page.id} requires a slug and date`)
  }

  return {
    id: page.id,
    title: getPlainText(title.title),
    slug: postSlug,
    summary: getPlainText(summary.rich_text),
    date: postDate.format('YYYY-MM-DD'),
    tags: tags.multi_select,
    last_edited_time: page.last_edited_time,
  }
}

async function fetchSnapshot(client: Client, database_id: string, activeImages: Set<string>): Promise<NotionSnapshot> {
  const database = await client.databases.retrieve({ database_id })
  const source = isFullDatabase(database) ? database.data_sources[0] : undefined
  if (!source) throw new Error('The Notion blog database has no accessible data source')

  const index: PostIndex[] = []
  let cursor: string | undefined
  do {
    const response = await client.dataSources.query({
      data_source_id: source.id,
      page_size: 100,
      start_cursor: cursor,
      filter: { property: 'published', checkbox: { equals: true } },
      sorts: [{ property: 'date', direction: 'descending' }],
    })
    index.push(...response.results.filter(isFullPage).map(getPostIndex))
    cursor = response.next_cursor ?? undefined
  } while (cursor)

  if (new Set(index.map(post => post.slug)).size !== index.length) {
    throw new Error('Published Notion posts must have unique slugs')
  }

  const posts = await pMap(
    index,
    async post => {
      const content = await processBlocks(client, post.id, activeImages)
      return [post.slug, { ...post, content }] as const
    },
    { concurrency: 3 }
  )

  return { index, posts: Object.fromEntries(posts) }
}

if (!process.argv.includes('--if-missing') || !existsSync(SNAPSHOT_PATH)) {
  const key = process.env.NOTION_TECH_KEY ?? process.env.NOTION_KEY
  const databaseId = process.env.NOTION_TECH_DATABASE_ID ?? process.env.NOTION_DATABASE_ID
  if (!key || !databaseId) throw new Error('Set NOTION_TECH_KEY and NOTION_TECH_DATABASE_ID')

  const startedAt = Date.now()
  const activeImages = new Set<string>()
  const snapshot = await fetchSnapshot(getNotionClient(key), databaseId, activeImages)
  await mkdir(path.dirname(SNAPSHOT_PATH), { recursive: true })
  const tempPath = `${SNAPSHOT_PATH}.${process.pid}.tmp`
  await writeFile(tempPath, JSON.stringify(snapshot))
  await rename(tempPath, SNAPSHOT_PATH)
  await pruneCachedImages(activeImages)
  console.log(`Saved ${snapshot.index.length} Notion posts in ${((Date.now() - startedAt) / 1000).toFixed(1)}s (${getRequestCount()} API requests)`)
}
