import { style } from '@vanilla-extract/css'
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
  flexDirection: 'row',
  display: 'flex',
  maxWidth: layouts.width,
  justifyContent: 'space-between',
  borderTop: 'none',
  height: dp(12),
  width: '100%',
  alignItems: 'center',
  paddingInline: layouts.full,
})

export const buttonGroup = style({
  display: 'flex',
  flexDirection: 'row',
  gap: dp(0.5),
})

export const categoryBtn = style({
  display: 'inline-flex',
  lineHeight: 1.2,
  borderRadius: dp(0.5),
  paddingInline: dp(2),
  paddingBlock: dp(1),
  fontSize: dp(3),
  backgroundColor: color.background_opacity95,
  color: color.text,
  fontWeight: 400,
  fontFamily: '"Mona Sans", "Pretendard", sans-serif',
  cursor: 'pointer',
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '&:hover': {
          backgroundColor: color.accent,
          color: color.black,
        },
        '&:active': {
          backgroundColor: color.accent,
          color: color.black,
        },
      },
    },
  },
})

export const themeBtn = style({
  backgroundColor: 'transparent',
})
