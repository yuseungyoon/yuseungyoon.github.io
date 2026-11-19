import 'server-only'

import { readFileSync } from 'node:fs'
import type { NotionSnapshot } from '../types/post'
import { SNAPSHOT_PATH } from './snapshotPath'

let snapshot: NotionSnapshot | undefined

function loadSnapshot(): NotionSnapshot {
  if (snapshot) return snapshot
  try {
    snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8')) as NotionSnapshot
    return snapshot
  } catch (cause) {
    throw new Error('Could not load the Notion snapshot. Run bun run notion:fetch.', { cause })
  }
}

export const getPostIndex = async () => loadSnapshot().index

export const getPostBySlug = async (slug: string) => {
  const { posts } = loadSnapshot()
  return Object.hasOwn(posts, slug) ? posts[slug] : null
}
