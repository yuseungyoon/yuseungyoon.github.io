import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { useLocation } from '@tanstack/react-router'
import { Annotations } from './RTAnnotations'
import * as css from './RTLink.css'

export function RichText({ richText }: { richText: RichTextItemResponse }) {
  const p = useLocation({ select: location => location.pathname })
  const href = richText.href

  if (href) {
    const target = href.includes(p) ? '_self' : '_blank'
    return (
      <a href={href} className={css.link} target={target} rel="noreferrer">
        <Annotations richText={richText}>{richText.plain_text}</Annotations>
      </a>
    )
  }

  return <Annotations richText={richText}>{richText.plain_text}</Annotations>
}
