'use client'

import { nextTheme, ThemeContext } from 'features/theme'
import Link from 'next/link'
import Logo from 'app/favicon.svg'
import { useContext } from 'react'
import { MenuBtn } from './MenuButton'
import * as css from './Navigation.css'
import { NavProvider } from './NavigationProvider'
import { CrumpledPaperIcon, GitHubLogoIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'

export function Navigation() {
  return (
    <NavProvider>
      <NavigationContent />
    </NavProvider>
  )
}

function NavigationContent() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={css.container}>
      <div className={css.frame}>
        <div className={css.buttonGroup}>
          <MenuBtn as={Link} href="/" aria-label={`글 리스트 페이지로 이동합니다`}>
            /
          </MenuBtn>
          <MenuBtn as={'a'} href="https://github.com/y7oon" target="_blank" aria-label={`Github`}>
            <GitHubLogoIcon />
          </MenuBtn>
          <MenuBtn as={'a'} href="https://thoughts.yooooon.com" aria-label={`신변잡기 블로그로 이동합니다`}>
            <CrumpledPaperIcon />
          </MenuBtn>
          <MenuBtn as={'a'} href="/feed.xml" aria-label={`RSS 피드로 이동합니다`}>
            RSS
          </MenuBtn>
        </div>
        <div className={css.buttonGroup}>
          <MenuBtn
            type="button"
            className={css.themeBtn}
            onClick={toggleTheme}
            aria-label={`현재 색상 테마는 ${theme}입니다. 버튼을 누르면 ${nextTheme(theme)} 테마로 바뀝니다.`}
          >
            {(() => {
              switch (theme) {
                case 'system':
                  return '👽'
                case 'light':
                  return <SunIcon />
                case 'dark':
                  return <MoonIcon />
              }
            })()}
          </MenuBtn>
        </div>
      </div>
    </div>
  )
}
