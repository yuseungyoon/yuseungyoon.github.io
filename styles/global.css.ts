import { globalStyle } from '@vanilla-extract/css'
import { color } from './vars/color.css'

globalStyle('*, *:before, *:after', {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
})

globalStyle('html', {
  fontSize: '100%',
  margin: 0,
  padding: 0,
})

globalStyle('body', {
  fontFamily: '"Mona Sans", "Pretendard"',
  height: 'auto',
  backgroundColor: color.background,
  margin: '0',
  padding: 0,
  lineHeight: 1,
  textSizeAdjust: '100%',
  WebkitTextSizeAdjust: '100%',
  MozTextSizeAdjust: '100%',
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
})

globalStyle('main', {
  padding: 0,
  margin: '0 auto',
})

globalStyle('article, section, nav, p, h1, h2, h3, h4, h5, h6', {
  margin: 0,
  padding: 0,
  color: color.text,
})

globalStyle('body[data-theme], body[data-theme] nav, body[data-theme] section', {
  transition: 'background-color .2s cubic-bezier(.4, 0, .4, 1), color .2s cubic-bezier(.4, 0, .4, 1)',
})

globalStyle('a', {
  fontSize: 'inherit',
  textDecoration: 'none',
  color: 'inherit',
  outline: 0,
  backgroundColor: 'transparent',
  border: 'none',
})

globalStyle('ul, ol', {
  display: 'block',
  width: '100%',
  padding: 0,
  margin: 0,
})

globalStyle('pre', {
  overflow: 'auto',
})

globalStyle('code, pre, pre span', {
  fontFeatureSettings: 'normal',
  MozTabSize: 2,
  tabSize: 2,
})

globalStyle('hr', {
  display: 'block',
  height: '1px',
  border: 0,
  margin: 0,
  padding: 0,
})

globalStyle('img, video, canvas, svg', {
  verticalAlign: 'middle',
})

globalStyle('::selection, ::-moz-selection', {
  backgroundColor: 'transparent',
})

globalStyle('p, span, code, ul li, ol li, li', {
  fontSize: '100%',
})

globalStyle('span>code', {
  wordBreak: 'break-all',
})

//global UL, OL Styling b/c of nested selector issue of vanilla extract

globalStyle('article ul', {
  listStyleType: 'disc',
})

globalStyle('article ul ul', {
  listStyleType: 'circle',
})

globalStyle('article ul ul ul', {
  listStyleType: 'square',
})

globalStyle('article ol', {
  listStyleType: 'decimal',
})

globalStyle('article ol ol', {
  listStyleType: 'lower-alpha',
})

globalStyle('article ol ol ol', {
  listStyleType: 'lower-roman',
})
