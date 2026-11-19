import { GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import * as css from './Navigation.css'

const themeOrder = ['system', 'light', 'dark'] as const
const themeStorageKey = 'YooooonBlogTheme'
type Theme = (typeof themeOrder)[number]

export function Navigation() {
  const [preference, setPreference] = useState<Theme>('system')
  useEffect(() => {
    const saved = localStorage.getItem(themeStorageKey)
    const savedTheme = themeOrder.find(theme => theme === saved)
    if (savedTheme) setPreference(savedTheme)
  }, [])

  useEffect(() => {
    const scheme = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      document.body.dataset.theme = preference === 'system' ? (scheme.matches ? 'dark' : 'light') : preference
    }
    apply()
    scheme.addEventListener('change', apply)
    return () => scheme.removeEventListener('change', apply)
  }, [preference])

  const next = themeOrder[(themeOrder.indexOf(preference) + 1) % themeOrder.length]

  return (
    <div className={css.container}>
      <div className={css.frame}>
        <div className={css.buttonGroup}>
          <Link to="/" className={css.categoryBtn} aria-label="글 리스트 페이지로 이동합니다">
            /
          </Link>
          <a className={css.categoryBtn} href="https://github.com/aassaapp" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubLogoIcon />
          </a>
          <a className={css.categoryBtn} href="/feed.xml" aria-label="RSS 피드로 이동합니다">
            RSS
          </a>
        </div>
        <div className={css.buttonGroup}>
          <button
            type="button"
            className={`${css.categoryBtn} ${css.themeBtn}`}
            onClick={() => {
              setPreference(next)
              localStorage.setItem(themeStorageKey, next)
            }}
            aria-label={`현재 색상 테마는 ${preference}입니다. 버튼을 누르면 ${next} 테마로 바뀝니다.`}
          >
            {preference === 'system' ? '👽' : preference === 'light' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}
