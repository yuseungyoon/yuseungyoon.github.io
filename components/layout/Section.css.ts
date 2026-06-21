import { style } from '@vanilla-extract/css'
import { layouts } from 'styles/vars/layouts.css'

export const base = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: layouts.width,
  width: '100%',
  flex: 1,
  margin: 'auto',
  overflow: 'hidden',
})
