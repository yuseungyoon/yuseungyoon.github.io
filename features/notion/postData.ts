import index from '../../.notion-cache/index.json'
import type { PostIndex, PostResponse } from './types/post'

const posts: PostIndex[] = index
const postFiles = import.meta.glob<PostResponse>('/.notion-cache/posts/*.json', { import: 'default' })

export const getPostIndex = () => posts

export async function getPostBySlug(year: string, slug: string) {
  const post = posts.find(post => post.slug === slug && post.date.startsWith(`${year}-`))
  if (!post) return null
  const load = postFiles[`/.notion-cache/posts/${post.id}.json`]
  if (!load) throw new Error(`Missing generated content for ${post.id}`)
  return load()
}
