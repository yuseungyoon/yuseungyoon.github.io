'use client'
import * as css from './PostSearchFilter.css'

interface PostSearchFilterProps {
  tags: {
    id: string
    name: string
    count: number
  }[]
  selectedTagId: string | null
  onTagSelect: (tagId: string | null) => void
}

export function PostSearchFilter({ tags, selectedTagId, onTagSelect }: PostSearchFilterProps) {
  return (
    <div className={css.filterFrame}>
      <div className={css.tagList}>
        <button type="button" className={`${css.tagButton} ${!selectedTagId ? css.tagButtonActive : ''}`} onClick={() => onTagSelect(null)}>
          전체
        </button>
        {tags.map(tag => (
          <button
            key={tag.id}
            type="button"
            className={`${css.tagButton} ${selectedTagId === tag.id ? css.tagButtonActive : ''}`}
            onClick={() => onTagSelect(tag.id)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  )
}
