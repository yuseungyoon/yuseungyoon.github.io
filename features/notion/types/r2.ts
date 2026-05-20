import type { TraversableBlock } from './unions'

type Tag = {
  id: string
  name: string
  color: string
}

export type PostIndex = {
  title: string
  slug: string
  id: string
  date: string
  last_edited_time: string
  summary: string
  tags: Tag[]
}

export type PostIndicesResponse = PostIndex[]

export type PostResponse = {
  id: string
  title: string
  slug: string
  content: TraversableBlock[]
  date: string
  last_edited_time: string
  summary: string
  tags: Tag[]
}
