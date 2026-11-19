import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { SNAPSHOT_PATH } from '../features/notion/remote/snapshotPath'
import type { NotionSnapshot } from '../features/notion/types/post'

const cacheDir = path.dirname(SNAPSHOT_PATH)
const postsDir = path.join(cacheDir, 'posts')
const { index, posts } = JSON.parse(await readFile(SNAPSHOT_PATH, 'utf8')) as NotionSnapshot
const filenames = new Set(index.map(post => `${post.id}.json`))
await mkdir(postsDir, { recursive: true })
await Promise.all(
  index.map(post => {
    const data = JSON.stringify(posts[post.slug], (key, value) => {
      if (key === 'image' && value?.type === 'file' && value.cached_url) {
        return { ...value, file: { ...value.file, url: value.cached_url } }
      }
      return value
    })
    return writeFile(path.join(postsDir, `${post.id}.json`), data)
  })
)
const entries = await readdir(postsDir, { withFileTypes: true })
await Promise.all(
  entries
    .filter(entry => entry.isFile() && entry.name.endsWith('.json') && !filenames.has(entry.name))
    .map(entry => unlink(path.join(postsDir, entry.name)))
)
await writeFile(path.join(cacheDir, 'index.json'), JSON.stringify(index))
