import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'

export const hamburgerMenuFrame = style({
  paddingInline: dp(6),
  margin: `${dp(8)} 0 ${dp(4)} 0`,
  lineHeight: 1,
  textAlign: 'right',
})

export const menuList = style({
  listStyleType: 'none',
  marginBottom: dp(48),
})

export const title = style({
  fontWeight: 800,
  fontSize: dp(4.25),
  lineHeight: 1.2,
  fontFamily: '"Archivo","Asta Sans", sans-serif',
  color: color.text,
  marginBottom: dp(4),
})

export const groupTitle = style({
  fontWeight: 600,
  lineHeight: 1.2,
  fontFamily: '"Archivo","Asta Sans", sans-serif',
  color: color.text,
  paddingTop: dp(4),
})

export const articleList = style({
  listStyleType: 'none',
})

export const articleListRow = style([
  {
    marginBlock: dp(4),
    fontFamily: '"Archivo","Asta Sans", sans-serif',
    lineHeight: 1.2,
    color: color.text,
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          textDecoration: 'underline',
          textUnderlineOffset: '0.25rem',
          textDecorationThickness: '1px',
        },
      },
    },
  },
])
