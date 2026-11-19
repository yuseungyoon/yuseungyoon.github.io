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
  const navigate = Route.useNavigate()
  // GitHub Pages serves the same prerendered home page for every query string.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false)

  return (
    <>
      <About />
      <PostListContainer
        postData={posts}
        keyword={hydrated ? (q ?? '') : ''}
        selectedTagId={hydrated ? (t ?? null) : null}
        onTagSelect={tag => {
          void navigate({ search: previous => ({ ...previous, t: tag ?? undefined }), replace: true, resetScroll: false })
        }}
      />
    </>
  )
}
