import { style } from '@vanilla-extract/css'

export const tocBreakpoint = 'screen and (min-width: 768px)'

export const contentLayout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
})
