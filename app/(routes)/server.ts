import { getPostIndex } from 'features/notion/remote/r2Fetch.server'

export async function startPageLoader() {
  const posts = await getPostIndex()
  return { posts }
}
