import * as css from './PostTitle.css'

export function PostTitle({ title }: { title: string }) {
  return (
    <h1 className={css.title}>
      <span>{title}</span>
    </h1>
  )
}
