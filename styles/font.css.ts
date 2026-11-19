import { globalFontFace } from '@vanilla-extract/css'

const monaSans = 'Mona Sans'
const hangul = 'SY Hangul'
const geistMono = 'Geist Mono'

const latinRange =
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
const hangulRange = 'U+1100-11FF, U+302E-302F, U+3131-318E, U+3200-321E, U+3260-327E, U+A960-A97F, U+AC00-D7A3, U+D7B0-D7FF, U+FFA0-FFDC'

globalFontFace(monaSans, [
  {
    src: 'url("/fonts/mona-sans-latin.woff2") format("woff2")',
    fontWeight: '200 900',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    unicodeRange: latinRange,
  },
  {
    src: 'url("/fonts/mona-sans-latin-italic.woff2") format("woff2")',
    fontWeight: '200 900',
    fontStyle: 'italic',
    fontDisplay: 'swap',
    unicodeRange: latinRange,
  },
])

// Pretendard Variable v1.3.9 subsets, renamed under the SIL OFL.
// Declare the common syllables and jamo last so the browser tries them first.
globalFontFace(hangul, [
  {
    src: 'url("/fonts/sy-hangul.woff2") format("woff2")',
    fontWeight: '100 900',
    fontDisplay: 'swap',
    unicodeRange: 'U+AC00-D7A3',
  },
  {
    src: 'url("/fonts/sy-hangul-common.woff2") format("woff2")',
    fontWeight: '100 900',
    fontDisplay: 'swap',
    unicodeRange: hangulRange,
  },
])

globalFontFace(geistMono, [
  {
    src: 'url("/fonts/geist-mono.woff2") format("woff2")',
    fontWeight: '100 900',
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    src: 'url("/fonts/geist-mono-italic.woff2") format("woff2")',
    fontWeight: '100 900',
    fontStyle: 'italic',
    fontDisplay: 'swap',
  },
])

export const fontFamily = {
  sans: `"${monaSans}", "${hangul}", sans-serif`,
  mono: `"${geistMono}", monospace`,
}
