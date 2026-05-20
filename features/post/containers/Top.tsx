'use client'
import type { PostIndex } from 'features/notion/types'
import { PostInfo } from '../components/PostInfo'
import { PostTitle } from '../components/PostTitle'
import * as css from './Top.css'

export function Top({ meta }: { meta: PostIndex }) {
  const title = meta.title
  return (
    <div className={css.frame}>
      <PostTitle title={title} />
      <PostInfo meta={meta} />
    </div>
  )
}
