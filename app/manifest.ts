import meta from 'assets/meta'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: meta.title,
    short_name: meta.title,
    description: meta.description,
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
