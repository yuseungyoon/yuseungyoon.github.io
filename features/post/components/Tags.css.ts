import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const tagsFrame = style({
  display: 'flex',
  gap: dp(1),
  marginBlock: layouts.full,
})

export const tag = style({
  display: 'inline-block',
  fontSize: dp(3.5),
  fontFamily: '"Archivo","Asta Sans", sans-serif',
  fontWeight: 500,
  lineHeight: 1.2,
  backgroundColor: color.background_opacity95,
  paddingBlock: dp(1),
  paddingInline: dp(2),
  borderRadius: dp(3),
  color: color.text,
})
