import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import logo from 'assets/logo.svg'
import meta from 'assets/meta'
import { Navigation } from 'features/navigation/containers/Navigation'
import type { ReactNode } from 'react'
import { SITE_URL } from 'static/site'
import 'styles/global.css'
import 'styles/font.css'
import 'styles/themes.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: meta.title },
      { name: 'description', content: meta.description },
      { name: 'author', content: meta.author },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: new URL(logo, SITE_URL).href },
    ],
    links: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      { rel: 'alternate', href: '/feed.xml', title: meta.title, type: 'application/rss+xml' },
    ],
  }),
  shellComponent: Document,
  component: Outlet,
  notFoundComponent: NotFound,
})

function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body data-theme="light">
        <Navigation />
        <main>{children}</main>
        <Scripts />
      </body>
    </html>
  )
}

export function NotFound() {
  return <p>페이지를 찾을 수 없습니다.</p>
}
