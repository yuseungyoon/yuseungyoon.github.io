import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const tableWrapper = style({
  marginInline: layouts.full,
  marginBlock: dp(2),
  overflowX: 'auto',
})

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: dp(3.75),
  lineHeight: 1.5,
})

export const th = style({
  padding: `${dp(2)} ${dp(3)}`,
  borderBottom: `2px solid ${color.notion_gray}`,
  textAlign: 'left',
  fontWeight: 600,
})

export const td = style({
  padding: `${dp(2)} ${dp(3)}`,
  borderBottom: `1px solid ${color.notion_gray}`,
})
