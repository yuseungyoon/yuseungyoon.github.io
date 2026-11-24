import { style } from '@vanilla-extract/css'
import { fontFamily } from 'styles/font.css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const container = style({
  zIndex: 99,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  paddingBottom: 'env(safe-area-inset-bottom)',
  transform: 'translateY(0)',
})

export const frame = style({
  backgroundColor: 'transparent',
  color: color.notion_default,
  display: 'flex',
  maxWidth: layouts.width,
  justifyContent: 'space-between',
  borderTop: 'none',
  height: dp(12),
  width: '100%',
  alignItems: 'center',
})

export const buttonGroup = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
})

export const categoryBtn = style({
  display: 'inline-flex',
  lineHeight: 1,
  fontSize: dp(3.25),
  backgroundColor: 'transparent',
  color: color.text,
  fontWeight: 400,
  fontFamily: fontFamily.mono,
  cursor: 'pointer',
})

export const themeBtn = style({
  backgroundColor: 'transparent',
})
