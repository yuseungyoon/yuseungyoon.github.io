import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { breakpoints } from 'styles/vars/breakpoints.css'
import { color } from 'styles/vars/color.css'

export const title = style({
  fontSize: dp(12),
  marginBottom: dp(4),
  color: color.text,
  textAlign: 'left',
  verticalAlign: 'middle',
  fontWeight: 700,
  fontFamily: '"Mona Sans", "Pretendard", monospace',
  lineHeight: 1.15,
  wordBreak: 'break-all',
  '@media': {
    [breakpoints.desktop]: {
      fontSize: dp(18),
      wordBreak: 'break-word',
    },
  },
})
