import { style, styleVariants } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { color } from 'styles/vars/color.css'

export const frame = style({
  display: 'inline-flex',
  width: '100%',
  height: dp(12.6),
  position: 'relative',
  borderRadius: dp(1.2),
  alignItems: 'center',
  marginBottom: dp(4),
})

export const iconFrame = style({
  cursor: 'default',
  width: dp(12.6),
  height: dp(12.6),
  textAlign: 'center',
  paddingBlock: dp(3.6),
  fontSize: dp(5),
  position: 'absolute',
})

const baseInput = style({
  flex: 1,
  position: 'absolute',
  margin: 0,
  height: dp(12.6),
  width: '100%',
  fontSize: dp(4),
  border: '1px solid gray',
  borderRadius: dp(1.2),
  ':disabled': {
    backgroundColor: 'gainsboro',
    cursor: 'not-allowed',
  },
  ':focus': {
    outline: `2px solid ${color.text}`,
    outlineOffset: dp(0.6),
  },
})

export const base = styleVariants({
  default: [baseInput, { padding: `0 ${dp(3.2)}` }],
  withIcon: [baseInput, { padding: `0 ${dp(3.2)} 0 ${dp(11)}` }],
})
