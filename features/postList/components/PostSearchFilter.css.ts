import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const filterFrame = style({
  display: 'flex',
  paddingInline: layouts.full,
  maxWidth: layouts.width,
  marginInline: 'auto',
  paddingTop: dp(8),
  flexDirection: 'column',
  gap: dp(2),
})

export const filterInputFrame = style({
  display: 'flex',
  gap: dp(2),
  alignItems: 'center',
  borderBottom: `1px solid ${color.background_opacity95}`,
  selectors: {
    '&:focus-within': {
      borderBottom: `1px solid ${color.text}`,
    },
  },
})

export const searchInput = style({
  width: '100%',
  border: 'none',
  background: 'transparent',
  color: color.text,
  fontSize: dp(3.5),
  fontFamily: 'Mona Sans, Pretendard',
  paddingBlock: dp(1.5),
  outline: 'none',
})

export const tagList = style({
  marginTop: dp(3),
  display: 'flex',
  flexWrap: 'wrap',
  gap: dp(0.5),
})

export const tagButton = style({
  border: 'none',
  background: 'none',
  padding: `${dp(0.5)} ${dp(1.5)}`,
  borderRadius: dp(0.5),
  cursor: 'pointer',
  color: color.text,
  fontFamily: 'Mona Sans, Pretendard',
  fontSize: dp(3.5),
  backgroundColor: color.background_opacity95,
})

export const tagButtonActive = style({
  color: color.text_invert,
  backgroundColor: color.text,
})
