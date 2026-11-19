import { style } from '@vanilla-extract/css'
import { fontFamily } from 'styles/font.css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const postListFrame = style({
  paddingInline: layouts.full,
  paddingBottom: dp(40),
  paddingTop: dp(12),
  maxWidth: layouts.width,
  marginInline: 'auto',
})

export const viewLink = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const postLinkFrame = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyleType: 'none',
  borderBottom: `1px solid ${color.text}`,
  color: color.text,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: color.accent,
        color: color.black,
      },
    },
  },
  selectors: {
    '&:active': {
      backgroundColor: color.accent,
      color: color.black,
    },
  },
})

export const postLinkInner = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingBlock: dp(3),
  gap: dp(1),
  border: '1px solid transparent',
})

const postLinkTitleBase = style({
  fontSize: dp(4.5),
  fontFamily: fontFamily.sans,
  width: '100%',
  fontWeight: 600,
  color: 'inherit',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const postLinkTitle = style([
  postLinkTitleBase,
  {
    lineHeight: 1.13,
    display: 'inline-block',
    color: 'inherit',
  },
])

export const postLinkDate = style({
  display: 'block',
  fontSize: dp(3),
  fontFamily: fontFamily.mono,
  fontWeight: 400,
  lineHeight: 1.15,
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
