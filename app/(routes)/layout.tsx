import type { Metadata } from 'next'
import 'styles/global.css'
import 'styles/font.css'
import 'styles/themes.css'
import logo from 'assets/logo.svg'
import meta from 'assets/meta'
import { Navigation } from 'features/navigation/containers/Navigation'
import { ENV } from 'static/env'
import { HydrateOnce } from './(client)/HydrateOnce'
import { Providers } from './(client)/Providers'
import { startPageLoader } from './server'

export const metadata: Metadata = {
  metadataBase: ENV.NEXT_PUBLIC_ROOT ? new URL(ENV.NEXT_PUBLIC_ROOT) : undefined,
  title: meta.title,
  description: meta.description,
  authors: { name: meta.author, url: ENV.NEXT_PUBLIC_ROOT },
  openGraph: {
    images: { url: logo.src },
    title: meta.title,
    description: meta.description,
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { posts } = await startPageLoader()
  return (
    <html lang="ko">
      <body>
        <Providers>
          <HydrateOnce state={{ posts }} />
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
