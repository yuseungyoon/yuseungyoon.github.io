import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const paragraph = style({
  marginBlock: dp(2),
  lineHeight: 1.65,
  fontSize: dp(4),
  color: color.text,
  marginInline: layouts.full,
  wordBreak: 'break-word',
})
