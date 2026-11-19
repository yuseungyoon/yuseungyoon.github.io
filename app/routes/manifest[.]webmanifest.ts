import { createFileRoute } from '@tanstack/react-router'
import meta from 'assets/meta'

export const Route = createFileRoute('/manifest.webmanifest')({
  server: {
    handlers: {
      GET: () =>
        Response.json(
          {
            name: meta.title,
            short_name: meta.title,
            description: meta.description,
            start_url: '/',
            display: 'standalone',
            icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/x-icon' }],
          },
          { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
        ),
    },
  },
})
