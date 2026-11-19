import { createFileRoute, notFound } from '@tanstack/react-router'
import siteMeta from 'assets/meta'
import { Spacing } from 'components/base/Spacing'
import { Section } from 'components/layout/Section'
import { RenderNotion } from 'features/notion/containers/_RenderNotion'
import { getPostBySlug } from 'features/notion/postData'
import * as pageStyles from 'features/post/containers/PostPage.css'
import { Top } from 'features/post/containers/Top'
import { Suspense } from 'react'

export const Route = createFileRoute('/$year/$slug')({
  loader: async ({ params: { year, slug } }) => {
    const post = await getPostBySlug(year, slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData: post }) => {
    if (!post) return {}
    const title = `${post.title} – ${siteMeta.title}`
    return {
      meta: [
        { title },
        { name: 'description', content: post.summary },
        { name: 'keywords', content: post.tags.map(tag => tag.name).join(', ') },
        { property: 'og:title', content: title },
        { property: 'og:description', content: post.summary },
      ],
    }
  },
  component: PostPage,
})

function PostPage() {
  const { content, ...meta } = Route.useLoaderData()
  return (
    <>
      <Top meta={meta} />
      <div className={pageStyles.contentLayout}>
        <Suspense fallback={<>...</>}>
          <Section>
            <RenderNotion blocks={content} />
          </Section>
        </Suspense>
      </div>
      <Spacing size={60} />
    </>
  )
}
