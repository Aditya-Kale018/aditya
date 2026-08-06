import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

const EASE = [0.22, 0.61, 0.36, 1] as const

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
  size?: number
}

export function ThemeToggle({ theme, onToggle, size = 15 }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center p-1"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun size={size} strokeWidth={1.7} />
          ) : (
            <Moon size={size} strokeWidth={1.7} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
