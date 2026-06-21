import { style, styleVariants } from '@vanilla-extract/css'
import { dp } from 'styles/dp'
import { layouts } from 'styles/vars/layouts.css'

const base = style({
  display: 'grid',
  marginInline: layouts.full,
  padding: 0,
  marginBlock: dp(2),
  gap: dp(4),
})

const responsive = (columns: number, tablet?: number): Parameters<typeof style>[0] => ({
  gridTemplateColumns: `repeat(${columns}, 1fr)`,
  '@media': {
    ...(tablet && {
      '(max-width: 1024px)': {
        gridTemplateColumns: `repeat(${tablet}, 1fr)`,
      },
    }),
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
})

export const columnCount = styleVariants(
  {
    1: responsive(1),
    2: responsive(2),
    3: responsive(3, 2),
    4: responsive(4, 2),
    5: responsive(5, 3),
  },
  variant => [base, style(variant)]
)
