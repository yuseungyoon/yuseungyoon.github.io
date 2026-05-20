'use client'
import { disassemble } from 'es-hangul'
import { useAtomValue } from 'jotai'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDeferredValue, useMemo, useState } from 'react'
import { PostListView } from '../components/PostListView'
import { PostSearchFilter } from '../components/PostSearchFilter'
import { postsAtom } from '../postList.atom'

export function PostListContainer() {
  const postData = useAtomValue(postsAtom)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [keyword, setKeyword] = useState(searchParams.get('q') ?? '')
  const deferredKeyword = useDeferredValue(keyword.trim())
  const [selectedTagId, setSelectedTagId] = useState<string | null>(searchParams.get('t') ?? null)

  const updateSearchParams = (q: string, t: string | null) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (t) params.set('t', t)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

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

  const handleKeywordChange = (value: string) => {
    const lower = value.toLowerCase()
    setKeyword(lower)
    updateSearchParams(lower.trim(), selectedTagId)
  }

  const handleTagSelect = (tagId: string | null) => {
    setSelectedTagId(tagId)
    updateSearchParams(keyword.trim(), tagId)
  }

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
      <PostSearchFilter
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        tags={tags}
        selectedTagId={selectedTagId}
        onTagSelect={handleTagSelect}
      />
      <PostListView posts={posts} />
    </>
  )
}
