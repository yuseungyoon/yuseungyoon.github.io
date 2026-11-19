import { BreadCrumb } from '../components/breadcrumb/Breadcrumb'
import * as Headings from '../components/heading/Headings'
import { Paragraph } from '../components/paragraph/Paragraph'
import { BulletedListItem } from '../components/list/BulletedListItem'
import { Callout } from '../components/callout/Callout'
import { ChildDatabase } from '../components/childrenPage/ChildDatabase'
import { ChildPage } from '../components/childrenPage/ChildPage'
import { Column } from '../components/column/Column'
import { ColumnList } from '../components/column/ColumnList'
import { NumberedListItem } from '../components/list/NumberedListItem'
import { BulletedListWrapper } from '../components/list/GroupedBulletList'
import { NumberedListWrapper } from '../components/list/GroupedNumberedList'
import { NotionImg } from '../components/image/NotionImg'
import { NotionFile } from '../components/file/NotionFile'
import { Quote } from '../components/quote/Quote'
import { Bookmark } from '../components/bookmark/Bookmark'
import { Toggle } from '../components/toggle/Toggle'
import { NotionDivider } from '../components/divider/NotionDivider'
import type { ExtendedBlockTypes, NotionBlockComponent } from 'features/notion/types'
import { Table } from '../components/table/Table'
import { lazy } from 'react'
import { Code } from '../components/code/Code'
const Equation = lazy(() => import('../components/equation/Equation').then(c => ({ default: c.Equation })))

export const blockComponentMap: Partial<{ [K in ExtendedBlockTypes]: NotionBlockComponent<K> }> = {
  bookmark: Bookmark,
  breadcrumb: BreadCrumb,
  bulleted_list_item: BulletedListItem,
  grouped_bulleted_list_item: BulletedListWrapper,
  callout: Callout,
  child_database: ChildDatabase,
  child_page: ChildPage,
  code: Code,
  column: Column,
  column_list: ColumnList,
  divider: NotionDivider,
  // embed: NotionFile,
  equation: Equation,
  file: NotionFile,
  heading_1: Headings.Heading_1,
  heading_2: Headings.Heading_2,
  heading_3: Headings.Heading_3,
  image: NotionImg,
  // link_preview: <></>,
  // link_to_page: <></>,
  numbered_list_item: NumberedListItem,
  grouped_numbered_list_item: NumberedListWrapper,
  paragraph: Paragraph,
  // pdf: <></>,
  quote: Quote,
  // synced_block: <></>,
  table: Table,
  // table_row: <></>,
  // template: <></>,
  // to_do: <></>,
  toggle: Toggle,
  // unsupported: <></>,
  // video: <></>,
}
