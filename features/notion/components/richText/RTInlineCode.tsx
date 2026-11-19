import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { code } from './RTAnnotations.css'

interface CodeProps {
  richText?: RichTextItemResponse
}

export function Code({ richText: _richText, ...props }: CodeProps) {
  return <code className={code} {...props} />
}
