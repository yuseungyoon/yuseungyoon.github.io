import type { PostIndex } from 'features/notion/types'
import * as css from './Tags.css'

type Tag = PostIndex['tags'][number]
export function Tags({ tags }: { tags: Tag[] }) {
  return (
    <div className={css.tagsFrame}>
      {tags.map(t => (
        <Tag key={t.id} tag={t} />
      ))}
    </div>
  )
}

function Tag({ tag }: { tag: Tag }) {
  return <span className={css.tag}>{tag.name}</span>
}
