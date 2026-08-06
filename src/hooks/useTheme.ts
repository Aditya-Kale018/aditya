import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  const attr = document.documentElement.dataset.theme
  return attr === 'dark' ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage unavailable — theme just won't persist
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
