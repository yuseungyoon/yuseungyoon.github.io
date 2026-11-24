import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { breakpoints } from 'styles/vars/breakpoints.css'
import { layouts } from 'styles/vars/layouts.css'

export const frame = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: dp(24),
  marginBottom: dp(24),
  marginInline: 'auto',
  maxWidth: layouts.width,
  width: '100%',
  backgroundColor: 'transparent',
})

export const subtitle = style({
  fontSize: dp(3.8),
})
