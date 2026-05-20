'use client'
import type { PostIndex } from 'features/notion/types'
import { postsAtom } from 'features/postList/postList.atom'
import { useHydrateAtoms } from 'jotai/utils'

interface Props {
  state: {
    posts: PostIndex[]
  }
}

/**
 * 전역 도메인 상태는 Jotai를 사용하여 관리합니다.
 * Hydrate 컴포넌트에는 UI 상태를 포함시키지 않습니다.
 */
export function HydrateOnce({ state }: Props) {
  useHydrateAtoms([[postsAtom, state.posts]])

  return null
}
