import 'server-only'

import { ENV } from 'static/env'
import type { PostIndicesResponse, PostResponse } from '../types'

const INDEX_URL = () => `${ENV.POST_REPO}/index.json`
const POST_URL = (slug: string) => `${ENV.POST_REPO}/post/${slug}.json`

export const getPostIndex = async (): Promise<PostIndicesResponse> => {
  try {
    const res = await fetch(INDEX_URL())
    if (!res.ok) throw new Error(`index fetch failed: ${res.status}`)
    return (await res.json()) as PostIndicesResponse
  } catch (err) {
    console.error('\n', INDEX_URL(), err, '\n', 'xxxx POST INDEX FETCH ERROR')
    return []
  }
}

export const getPostBySlug = async (slug: string): Promise<PostResponse | null> => {
  try {
    const res = await fetch(POST_URL(slug))
    if (!res.ok) throw new Error(`post fetch failed: ${res.status}`)
    return (await res.json()) as PostResponse
  } catch (err) {
    console.error('\n', POST_URL(slug), err, '\n', 'xxxx POST FETCH ERROR')
    return null
  }
}
