import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'

export const bold = style({
  fontWeight: 600,
})

export const italic = style({
  fontStyle: 'italic',
})

export const code = style({
  verticalAlign: 'text-top',
  fontSize: dp(3.75),
  padding: `${dp(0.5)} ${dp(1.5)} ${dp(0.75)} ${dp(1.5)}`,
  fontWeight: 400,
  color: color.text,
  marginRight: dp(0.75),
  backgroundColor: color.notion_background_gray,
  fontFamily: 'Google Sans Code, monospace',
  borderRadius: dp(1),
  border: 'none',
})

export const strike = style({
  textDecoration: 'line-through',
  textDecorationThickness: '1px',
})

export const underline = style({
  textDecoration: 'underline',
  textUnderlineOffset: dp(1),
  textDecorationThickness: '1px',
})

export const link = style([
  {
    textDecoration: 'underline',
    textUnderlineOffset: dp(1),
    textDecorationThickness: '1px',
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {},
      },
    },
  },
])
