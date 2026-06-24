import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { breakpoints } from 'styles/vars/breakpoints.css'
import { layouts } from 'styles/vars/layouts.css'

export const frame = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingInline: layouts.full,
  paddingTop: dp(20),
  marginBottom: dp(36),
  marginInline: 'auto',
  maxWidth: layouts.width,
  width: '100%',
  backgroundColor: 'transparent',
  '@media': {
    [breakpoints.desktop_wide]: {},
    [breakpoints.desktop]: {},
  },
})

export const iconFrame = style({
  marginBottom: '0.5rem',
})

export const icon = style({
  fontSize: '2.5rem',
})

export const subtitle = style({
  fontSize: dp(3.8),
})
