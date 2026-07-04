import { style } from '@vanilla-extract/css'

const lineBase = {
  display: 'block',
  width: '18px',
  height: '2px',
  backgroundColor: 'currentColor',
  transition: 'transform 0.15s ease, opacity 0.15s ease',
  transformOrigin: 'center',
} as const

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '21px',
  height: '21px',
  gap: '5px',
})

export const top = style({
  ...lineBase,
  selectors: {
    [`[data-open="true"] &`]: {
      transform: 'translateY(3.5px) rotate(45deg)',
    },
  },
})

export const bottom = style({
  ...lineBase,
  selectors: {
    [`[data-open="true"] &`]: {
      transform: 'translateY(-3.5px) rotate(-45deg)',
    },
  },
})
