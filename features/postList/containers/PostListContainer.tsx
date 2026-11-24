import { disassemble } from 'es-hangul'
import type { PostIndex } from 'features/notion/types'
import { useDeferredValue, useMemo } from 'react'
import { PostListView } from '../components/PostListView'
import { PostSearchFilter } from '../components/PostSearchFilter'

type Props = {
  postData: PostIndex[]
  keyword: string

  onKeywordChange: (k: string) => void
}

export function PostListContainer({ postData, keyword, onKeywordChange }: Props) {
  const deferredKeyword = useDeferredValue(keyword.trim().toLowerCase())

  const posts = useMemo(() => {
    const decomposed = deferredKeyword ? disassemble(deferredKeyword) : ''
    return (
      postData?.filter(p => {
        if (!decomposed) return true
        return (
          disassemble(p.title.toLowerCase()).includes(decomposed) ||
          disassemble(p.summary.toLowerCase()).includes(decomposed) ||
          p.tags.some(t => disassemble(t.name.toLowerCase()).includes(decomposed))
        )
      }) ?? []
    )
  }, [postData, deferredKeyword])

  return (
    <>
      {/* <PostSearchFilter onKeywordChange={onKeywordChange} /> */}
      <PostListView posts={posts} />
    </>
  )
}
