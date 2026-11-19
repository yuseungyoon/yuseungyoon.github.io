import { style } from '@vanilla-extract/css'
import { fontFamily } from 'styles/font.css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'

export const postInfoFrame = style({
  marginTop: dp(1.5),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'flex-end',
  gap: dp(2),
})

export const postInfoText = style({
  fontSize: dp(3.75),
  lineHeight: 1.3,
  fontFamily: fontFamily.sans,
  fontWeight: 400,
  color: color.notion_gray,
})
