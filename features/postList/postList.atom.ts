import dayjs from 'dayjs'
import type { PostIndex } from 'features/notion/types'
import { atom } from 'jotai'

export const postsAtom = atom<PostIndex[]>([])
export const postGroupByYearAtom = atom<Record<string, PostIndex[]>>(get =>
  get(postsAtom).reduce(
    (prev, post) => {
      const year = dayjs(post.date).year()
      if (!prev[year]) prev[year] = []
      prev[year].push(post)
      return prev
    },
    {} as Record<number, PostIndex[]>
  )
)
export const yearsAtom = atom<number[]>(get => Object.keys(get(postGroupByYearAtom)).map(Number).reverse())
