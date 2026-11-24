import { style } from '@vanilla-extract/css'
import { dp } from 'styles/dp'

export const ul = style({
  listStyleType: 'disc',
  paddingLeft: dp(4),
  marginBlock: dp(2),
  fontSize: dp(4),
  maxWidth: `calc(100% - ${dp(14)})`,
  selectors: {
    'ul &': {
      marginInline: 0,
    },
  },
})
