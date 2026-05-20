import type {
  BlockObjectResponse,
  BookmarkBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  ImageBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ParagraphBlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client'
type BookmarkMeta = {
  url: string
  title?: string
  description?: string
  image?: string
}

type BaseBlock = Omit<ParagraphBlockObjectResponse, 'type' | 'paragraph'>

export type GroupedBulletedListItemResponse = BaseBlock & {
  type: 'grouped_bulleted_list_item'
  grouped_bulleted_list_item: {
    children: BulletedListItemBlockObjectResponse[]
  }
}

export type GroupedNumberedListItemResponse = BaseBlock & {
  type: 'grouped_numbered_list_item'
  grouped_numbered_list_item: {
    children: NumberedListItemBlockObjectResponse[]
  }
}

export type ExtendedImageBlockObjectResponse = Omit<ImageBlockObjectResponse, 'image'> & {
  blurDataURL?: string
  image: ImageBlockObjectResponse['image'] & { cached_url?: string }
}

export type ExtendedCalloutBlockObjectResponse = CalloutBlockObjectResponse

export type ExtendedBookmarkObjectResponse = BookmarkBlockObjectResponse & {
  bookmarkInfo: BookmarkMeta
}

export type ExtendedTextResponse = RichTextItemResponse & BlockObjectResponse
