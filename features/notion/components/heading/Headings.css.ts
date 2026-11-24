import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'

const headingBase = {
  fontSize: dp(4.5),
  lineHeight: 1.3,
  marginBlockStart: dp(8),
  marginBlockEnd: dp(2),
} as const

export const h1 = style({
  ...headingBase,
  fontWeight: '800',
})

export const h2 = style({
  ...headingBase,
  fontWeight: '600',
})

export const h3 = style({
  ...headingBase,
  fontWeight: '500',
})
