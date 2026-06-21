'use client'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import * as css from './PostSearchFilter.css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'

interface PostSearchFilterProps {
  keyword: string
  onKeywordChange: (value: string) => void
  tags: {
    id: string
    name: string
    count: number
  }[]
  selectedTagId: string | null
  onTagSelect: (tagId: string | null) => void
}

export function PostSearchFilter({ keyword, onKeywordChange, tags, selectedTagId, onTagSelect }: PostSearchFilterProps) {
  return (
    <div className={css.filterFrame}>
      <div className={css.filterInputFrame}>
        <MagnifyingGlassIcon color={color.text} width={dp(4.25)} height={dp(4.25)} />
        <input
          type="text"
          className={css.searchInput}
          value={keyword}
          onChange={e => onKeywordChange(e.target.value)}
          placeholder="Search Posts..."
        />
      </div>
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
