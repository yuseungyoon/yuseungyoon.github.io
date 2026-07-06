import { style } from '@vanilla-extract/css'
import { tocBreakpoint } from 'app/(routes)/[year]/[slug]/page.css'
import { dp } from 'styles/dp'
import { layouts } from 'styles/vars/layouts.css'

export const aside = style({
  paddingInline: layouts.full,
  order: -1,
  marginBottom: dp(6),

  '@media': {
    [tocBreakpoint]: {
      position: 'sticky',
      top: dp(6),
      alignSelf: 'flex-start',
      width: '18rem',
      flexShrink: 0,
      paddingInline: 0,
      marginLeft: dp(6),
      order: 0,
      marginBottom: 0,
    },
  },
})

export const frame = style({})

export const title = style({
  fontFamily: '"Archivo","Asta Sans", sans-serif',
  fontSize: dp(4.5),
  lineHeight: 1.3,
  marginBlockStart: dp(8),
  marginBlockEnd: dp(2),
})

export const tocFrame = style({
  display: 'flex',
  flexDirection: 'column',
})
