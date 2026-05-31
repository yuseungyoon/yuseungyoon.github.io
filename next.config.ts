import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactCompiler: {
    compilationMode: 'annotation',
  },
  turbopack: {},
}

const vExPlugin = createVanillaExtractPlugin()
const config = compose(vExPlugin)

export default config

/**
 * 여러 개의 플러그인을 배열의 끝부터 순차 적용시킵니다.
 * [a,b,c]일 때 a(b(c(nextConfig)))의 형태가 됩니다.
 */
type PluginFn = (config: NextConfig) => NextConfig
function compose(...fns: PluginFn[]) {
  return fns.reduceRight((acc, fn) => fn(acc), nextConfig)
}
