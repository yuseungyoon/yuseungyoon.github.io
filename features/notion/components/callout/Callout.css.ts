import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const calloutFrame = style({
  display: 'flex',
  gap: dp(3),
  backgroundColor: color.notion_background_gray,
  borderRadius: dp(1),
  padding: dp(4),
  marginBlock: dp(4),
  marginInline: layouts.full,
  lineHeight: 1.65,
  fontSize: dp(4),
  wordBreak: 'break-word',
})

export const icon = style({
  flexShrink: 0,
  fontSize: dp(4),
  lineHeight: 1.65,
})

export const content = style({
  minWidth: 0,
})
