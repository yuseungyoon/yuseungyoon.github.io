import { disassemble } from 'es-hangul'
import type { PostIndex } from 'features/notion/types'
import { useDeferredValue, useMemo } from 'react'
import { PostListView } from '../components/PostListView'
import { PostSearchFilter } from '../components/PostSearchFilter'

type Props = {
  postData: PostIndex[]
  keyword: string
  selectedTagId: string | null
  onTagSelect: (tagId: string | null) => void
}

export function PostListContainer({ postData, keyword, selectedTagId, onTagSelect }: Props) {
  const deferredKeyword = useDeferredValue(keyword.trim().toLowerCase())

  const tags = useMemo(() => {
    const countMap = new Map<string, { id: string; name: string; count: number }>()
    for (const post of postData ?? []) {
      for (const t of post.tags) {
        const entry = countMap.get(t.id)
        if (entry) entry.count++
        else countMap.set(t.id, { id: t.id, name: t.name, count: 1 })
      }
    }
    return [...countMap.values()].sort((a, b) => a.name.localeCompare(b.name))
  }, [postData])

  const posts = useMemo(() => {
    const decomposed = deferredKeyword ? disassemble(deferredKeyword) : ''
    return (
      postData?.filter(p => {
        if (selectedTagId && !p.tags.some(t => t.id === selectedTagId)) return false
        if (!decomposed) return true
        return (
          disassemble(p.title.toLowerCase()).includes(decomposed) ||
          disassemble(p.summary.toLowerCase()).includes(decomposed) ||
          p.tags.some(t => disassemble(t.name.toLowerCase()).includes(decomposed))
        )
      }) ?? []
    )
  }, [postData, deferredKeyword, selectedTagId])

  return (
    <>
      <PostSearchFilter tags={tags} selectedTagId={selectedTagId} onTagSelect={onTagSelect} />
      <PostListView posts={posts} />
    </>
  )
}
