import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { breakpoints } from 'styles/vars/breakpoints.css'
import { color } from 'styles/vars/color.css'
import { layouts } from 'styles/vars/layouts.css'

export const bookmarkFrame = style({
  display: 'flex',
  flexDirection: 'column',
  marginBlock: dp(4),
  borderRadius: dp(2.5),
  marginInline: layouts.full,
  wordBreak: 'break-all',
  backgroundSize: '25%',
  backgroundPosition: 'center center',
  '@media': {
    [breakpoints.desktop]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
})

export const bookmarkInner = style({
  display: 'flex',
  width: '100%',
  borderRadius: dp(2.2),
  backgroundColor: color.background_opacity95,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: layouts.full,
  alignItems: 'flex-start',
})

export const bookmarkTitle = style({
  marginBottom: dp(1.5),
  fontSize: dp(4.25),
  fontWeight: 600,
  fontFamily: '"Archivo","Asta Sans", sans-serif',
  color: color.notion_default,
})

export const bookmarkUrl = style({
  lineHeight: 1.35,
  fontSize: dp(3),
  fontWeight: 500,
  fontFamily: '"Google Sans Code", "Asta Sans", sans-serif',
  color: color.notion_gray,
})

export const bookmarkDescription = style({
  fontSize: dp(3.75),
  maxWidth: '20rem',
  color: color.notion_gray,
  margin: 0,
  lineHeight: 1.35,
})

export const bookmarkThumbnailWrapper = style({
  height: 'auto',
  '@media': {
    [breakpoints.desktop]: {
      display: 'flex',
      alignItems: 'stretch',
    },
  },
})
