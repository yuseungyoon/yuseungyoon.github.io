import { getPostIndex } from 'features/notion/remote/snapshot.server'

export async function startPageLoader() {
  const posts = await getPostIndex()
  return { posts }
}
