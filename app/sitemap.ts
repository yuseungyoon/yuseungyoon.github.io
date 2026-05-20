import dayjs from 'dayjs'
import { getPostIndex } from 'features/notion/remote/r2Fetch.server'
import type { MetadataRoute } from 'next'
import { ENV } from 'static/env'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostIndex()

  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${ENV.NEXT_PUBLIC_ROOT}/${dayjs(post.date).year()}/${post.slug}`,
    lastModified: new Date(post.last_edited_time ?? post.date),
    changeFrequency: 'daily',
    priority: 1.0,
  }))

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${ENV.NEXT_PUBLIC_ROOT}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  return [...staticEntries, ...postEntries]
}
