import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import type { NotionComponentProps } from 'features/notion/types'
import { hasChildren } from 'features/notion/types'
import { ChildrenBlocks } from '../../containers/ChildrenBlocks'
import { getPlainText } from '../richText/getPlainText'
import * as css from './Paragraph.css'
import { RichText } from '../richText/RichText'
import { lazy } from 'react'
const Youtube = lazy(() => import('../_customBlocks/Youtube').then(c => ({ default: c.Youtube })))

const YOUTUBE_REGEX = /<<(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(?:[^\s>]*)?>>/

export function Paragraph({ block }: NotionComponentProps<'paragraph'>) {
  const flattenTxt: string = getPlainText(block.paragraph.rich_text)
  const [_, captured] = flattenTxt.match(YOUTUBE_REGEX) ?? ['', '']
  if (captured.length) return <Youtube videoId={captured} />

  return (
    <div>
      <p className={css.paragraph}>
        {block.paragraph.rich_text.map((txt: RichTextItemResponse, idx: number) => (
          <RichText key={`${txt.type}${idx}`} richText={txt} />
        ))}
      </p>
      {hasChildren(block) && <ChildrenBlocks childrenBlocks={block.paragraph.children} />}
    </div>
  )
}
