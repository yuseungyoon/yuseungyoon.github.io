import { About } from 'features/about/About'
import { PostListContainer } from 'features/postList'
import { Suspense } from 'react'

export default async function Home() {
  return (
    <Suspense>
      <About />
      <PostListContainer />
    </Suspense>
  )
}
