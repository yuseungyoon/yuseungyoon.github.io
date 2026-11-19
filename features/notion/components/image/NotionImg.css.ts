import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { breakpoints } from 'styles/vars/breakpoints.css'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const figureWrapper = style({
  all: 'unset',
  cursor: 'pointer',
  display: 'block',
  margin: 0,
  padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  selectors: {
    '&:active': {
      backgroundColor: 'transparent',
    },
  },
})
export const figureDefault = style({
  margin: 0,
  marginBlock: dp(8),
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginInline: layouts.full,
})
export const imageDialog = style({
  border: 0,
  margin: 0,
  padding: 0,
  maxWidth: 'none',
  maxHeight: 'none',
  background: 'transparent',
  selectors: {
    '&::backdrop': { background: 'rgba(0,0,0,0.8)' },
  },
})

export const figureZoomed = style({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  margin: 0,
  padding: dp(4),
  width: '100vw',
  height: '100dvh',
  justifyContent: 'center',
  alignItems: 'center',
})

export const figcaptionZoomed = style({
  marginTop: dp(2),
  fontSize: dp(3.5),
  color: color.white,
  textAlign: 'center',
})

export const figcaption = style({
  marginTop: dp(2),
  fontSize: dp(3.5),
  color: color.notion_gray,
  textAlign: 'center',
})

export const imgDefault = style({
  borderRadius: dp(1),
  height: 'auto',
  maxWidth: '100%',
  '@media': {
    [breakpoints.desktop]: {
      maxWidth: '100%',
    },
  },
})

export const imgZoomed = style({
  borderRadius: dp(1),
  maxWidth: '90vw',
  maxHeight: '90vh',
  height: 'auto',
})
