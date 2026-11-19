import type { PostIndex } from 'features/notion/types'
import { Link } from '@tanstack/react-router'
import * as css from './PostListView.css'

interface PostListViewProps {
  posts: PostIndex[]
}

export function PostListView({ posts }: PostListViewProps) {
  return (
    <div className={css.postListFrame}>
      <div className={css.viewLink}>
        {posts.map(p => (
          <PostListView.Row key={p.id} meta={p} />
        ))}
      </div>
    </div>
  )
}

PostListView.Row = ({ meta }: { meta: PostIndex }) => {
  const year = meta.date.slice(0, 4)
  return (
    <li className={css.postLinkFrame}>
      <Link to="/$year/$slug" params={{ year, slug: meta.slug }} className={css.postLinkInner}>
        <span className={css.postLinkDate}>{meta.date.split('-').join('.')}</span>
        <span className={css.postLinkTitle}>{`${meta.title}`}</span>
      </Link>
    </li>
  )
}

PostListView.TitleRow = () => {
  return (
    <div className={css.postTitleRow}>
      <span className={css.postLinkDate}>DATE</span>
      <span className={css.postLinkDate}>TITLE</span>
    </div>
  )
}
