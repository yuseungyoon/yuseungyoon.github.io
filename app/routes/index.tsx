import { createFileRoute } from '@tanstack/react-router'
import { About } from 'features/about/About'
import { getPostIndex } from 'features/notion/postData'
import { PostListContainer } from 'features/postList'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { q?: string; t?: string } => ({
    q: typeof search.q === 'string' ? search.q : undefined,
    t: typeof search.t === 'string' ? search.t : undefined,
  }),
  loader: getPostIndex,
  component: Home,
})

function Home() {
  const posts = Route.useLoaderData()
  const { q, t } = Route.useSearch()
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

  return (
    <>
      <About />
      <PostListContainer postData={posts} keyword={hydrated ? (q ?? '') : ''} onKeywordChange={() => {}} />
    </>
  )
}
