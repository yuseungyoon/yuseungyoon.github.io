'use client'
import { useIsomorphicLayoutEffect, useMediaQuery } from '@fische/react'
import { createContext, type Dispatch, type ReactNode, type SetStateAction, useCallback, useMemo, useState } from 'react'

const theme = ['system', 'light', 'dark'] as const
type Theme = (typeof theme)[number]

const localStorageKey = `YooooonBlogTheme`

export function nextTheme(current: Theme) {
  const i = theme.indexOf(current)
  return theme[(i + 1) % theme.length]
}

export type ThemeContext = {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
  toggleTheme: () => void
  appliedTheme: Exclude<Theme, 'system'>
}

const initialThemeContextValue: ThemeContext = {
  theme: 'system',
  setTheme: () => {},
  toggleTheme: () => {},
  appliedTheme: 'light',
}

export const ThemeContext = createContext<ThemeContext>(initialThemeContextValue)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [prefersDark] = useMediaQuery('(prefers-color-scheme: dark)')

  const [theme, setTheme] = useState<Theme>('system')

  useIsomorphicLayoutEffect(() => {
    const saved = localStorage.getItem(localStorageKey) as Theme | null
    if (saved) setTheme(saved)
  }, [])
  const appliedTheme: Exclude<Theme, 'system'> = theme !== 'system' ? theme : prefersDark ? 'dark' : 'light'

  // system preference 변경 시 theme이 'system'이면 동기화
  useIsomorphicLayoutEffect(() => {
    if (theme === 'system') setTheme(appliedTheme)
  }, [prefersDark])

  // theme, storage 동기화
  useIsomorphicLayoutEffect(() => {
    document.body.dataset.theme = appliedTheme
    localStorage.setItem(localStorageKey, theme)
  }, [theme])

  const toggleTheme = useCallback(() => setTheme(prev => nextTheme(prev)), [])

  const value = useMemo(() => ({ theme, appliedTheme, setTheme, toggleTheme }), [theme, appliedTheme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
