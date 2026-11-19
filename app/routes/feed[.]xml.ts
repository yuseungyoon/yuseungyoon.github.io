import { createFileRoute } from '@tanstack/react-router'
import siteMeta from 'assets/meta'
import { getPostIndex } from 'features/notion/postData'
import RSS from 'rss'
import { SITE_URL } from 'static/site'

export const Route = createFileRoute('/feed.xml')({
  server: {
    handlers: {
      GET: () => {
        const feed = new RSS({
          title: siteMeta.title,
          description: siteMeta.description,
          site_url: SITE_URL,
          feed_url: `${SITE_URL}/feed.xml`,
          copyright: siteMeta.author,
          language: 'ko',
        })

        for (const post of getPostIndex()) {
          feed.item({
            title: post.title,
            description: post.summary,
            url: `${SITE_URL}/${post.date.slice(0, 4)}/${encodeURIComponent(post.slug)}`,
            date: post.date,
            author: siteMeta.author,
          })
        }

        return new Response(feed.xml(), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
      },
    },
  },
})
