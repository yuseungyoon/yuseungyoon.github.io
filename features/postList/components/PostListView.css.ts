import { style } from '@vanilla-extract/css'
import { fontFamily } from 'styles/font.css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const postListFrame = style({
  paddingBottom: dp(40),
  paddingTop: dp(24),
  maxWidth: layouts.width,
})

export const viewLink = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
})

export const postLinkFrame = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyleType: 'none',
  color: color.text,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: color.text,
        color: color.background,
      },
    },
  },
  selectors: {
    '&:active': {
      backgroundColor: color.text,
      color: color.background,
    },
  },
})

export const postLinkInner = style({
  display: 'flex',
  width: '100%',
  margin: '0 auto',
  maxWidth: layouts.width,
  justifyContent: 'center',
  alignItems: 'center',
  paddingBlock: dp(0.5),
  gap: dp(1),
  border: '1px solid transparent',
})

const postLinkTitleBase = style({
  fontSize: dp(3.4),
  fontFamily: fontFamily.list,
  width: '100%',
  fontWeight: 450,
  color: 'inherit',
  wordSpacing: dp(-1),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const postLinkTitle = style([
  postLinkTitleBase,
  {
    lineHeight: 1,
    display: 'inline-block',
    color: 'inherit',
  },
])

export const postLinkDate = style({
  fontSize: dp(3.2),
  fontFamily: fontFamily.mono,
  fontWeight: 400,
  lineHeight: 1,
  color: 'inherit',
})

export const postTitleRow = style({
  paddingBlock: dp(1),
  display: 'flex',
  color: color.text,
  borderBottom: `2px solid ${color.text}`,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  gap: dp(14.25),
})
