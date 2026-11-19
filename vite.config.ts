import { readFileSync } from 'node:fs'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { SNAPSHOT_PATH } from './features/notion/remote/snapshotPath.ts'
import type { NotionSnapshot } from './features/notion/types/post'
import { SITE_URL } from './static/site.ts'

export default defineConfig(({ command }) => {
  const index = command === 'build' ? (JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8')) as NotionSnapshot).index : []

  return {
    resolve: { tsconfigPaths: true },
    plugins: [
      tanstackStart({
        srcDirectory: 'app',
        prerender: { enabled: true, crawlLinks: false, failOnError: true, autoSubfolderIndex: false },
        sitemap: { enabled: true, host: SITE_URL },
        pages: [
          { path: '/', sitemap: { priority: 1 } },
          ...index.map(post => ({
            path: `/${post.date.slice(0, 4)}/${encodeURIComponent(post.slug)}`,
            sitemap: { lastmod: post.last_edited_time, priority: 1 },
          })),
          { path: '/feed.xml', sitemap: { exclude: true } },
          { path: '/manifest.webmanifest', sitemap: { exclude: true } },
          { path: '/404', prerender: { outputPath: '/404.html' }, sitemap: { exclude: true } },
        ],
      }),
      vanillaExtractPlugin(),
      react(),
    ],
  }
})
