import * as css from './PostSearchFilter.css'

interface PostSearchFilterProps {
  onKeywordChange: (k: string) => void
}

export function PostSearchFilter({ onKeywordChange }: PostSearchFilterProps) {
  return (
    <div className={css.filterFrame}>
      <div className={css.tagList}>
        <input type="text" className={css.searchInput} onChange={e => onKeywordChange(e.target.value)} />
      </div>
    </div>
  )
}
