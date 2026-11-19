import { style } from '@vanilla-extract/css'
import { fontFamily } from 'styles/font.css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'

export const title = style({
  fontSize: dp(6),
  marginBottom: dp(4),
  color: color.text,
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: 600,
  fontFamily: fontFamily.sans,
  lineHeight: 1.15,
  wordBreak: 'break-all',
})
