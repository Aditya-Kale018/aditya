import { useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion'
import { useScrolled } from '../hooks/useScrolled'
import { useActiveSection } from '../hooks/useActiveSection'
import { useTheme } from '../hooks/useTheme'
import { identity } from '../data/content'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { id: 'about', label: 'About', condensed: true },
  { id: 'expertise', label: 'Expertise', condensed: false },
  { id: 'focus', label: 'Focus', condensed: false },
  { id: 'experience', label: 'Experience', condensed: false },
  { id: 'projects', label: 'Projects', condensedLabel: 'Work', condensed: true },
  { id: 'contact', label: 'Contact', condensed: true },
]

const EASE = [0.22, 0.61, 0.36, 1] as const
const LAYOUT_TRANSITION = { type: 'spring', stiffness: 300, damping: 32, mass: 0.9 } as const

export function Nav() {
  const scrolled = useScrolled(72)
  const active = useActiveSection(NAV_LINKS.map((l) => l.id))
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const fadeOpacity = useMotionValue(1)

  useEffect(() => {
    const controls = animate(fadeOpacity, [1, 0.85, 1], {
      duration: 0.55,
      times: [0, 0.4, 1],
      ease: EASE,
    })
    return () => controls.stop()
  }, [scrolled, fadeOpacity])

  const handleNavigate = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.div
        layout
        transition={LAYOUT_TRANSITION}
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
        style={{ paddingTop: scrolled ? 16 : 0 }}
      >
        <motion.nav
          layout
          transition={LAYOUT_TRANSITION}
          className={`flex items-center overflow-hidden ${!scrolled ? 'px-3 sm:px-5 lg:px-7' : ''}`}
          style={{
            opacity: fadeOpacity,
            width: scrolled ? 'auto' : '100%',
            gap: scrolled ? 16 : 0,
            justifyContent: scrolled ? 'flex-start' : 'space-between',
            background: scrolled ? 'var(--color-ink)' : 'var(--color-bg)',
            color: scrolled ? 'var(--color-bg)' : 'var(--color-ink)',
            borderBottom: scrolled
              ? '0px solid transparent'
              : '1px solid color-mix(in srgb, var(--color-ink) 12%, transparent)',
            boxShadow: scrolled ? '0 3px 10px rgba(0,0,0,0.16)' : '0 0 0 rgba(0,0,0,0)',
            paddingTop: scrolled ? 9 : 16,
            paddingBottom: scrolled ? 9 : 16,
            paddingLeft: scrolled ? 16 : undefined,
            paddingRight: scrolled ? 10 : undefined,
          }}
        >
          <motion.a
            layout
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('hero')
            }}
            className="font-extrabold whitespace-nowrap"
            style={{ fontSize: scrolled ? 12.5 : 15 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={scrolled ? 'short' : 'full'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="inline-block"
              >
                {scrolled ? 'AK' : identity.name}
              </motion.span>
            </AnimatePresence>
          </motion.a>

          <motion.span
            layout
            className="hidden bg-current md:block"
            style={{
              width: scrolled ? 1 : 0,
              height: scrolled ? 14 : 0,
              opacity: scrolled ? 0.25 : 0,
              flex: 'none',
            }}
            transition={LAYOUT_TRANSITION}
          />

          <motion.div
            layout
            className="hidden items-center md:flex"
            style={{ gap: scrolled ? 14 : 32 }}
            transition={LAYOUT_TRANSITION}
          >
            <AnimatePresence initial={false}>
              {NAV_LINKS.filter((link) => !scrolled || link.condensed).map((link) => (
                <motion.a
                  layout
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigate(link.id)
                  }}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ layout: LAYOUT_TRANSITION, opacity: { duration: 0.35, ease: EASE } }}
                  className="whitespace-nowrap transition-colors duration-200"
                  style={{
                    fontSize: scrolled ? 12 : 13,
                    color:
                      active === link.id
                        ? 'currentColor'
                        : scrolled
                          ? 'color-mix(in srgb, var(--color-bg) 72%, transparent)'
                          : 'color-mix(in srgb, var(--color-ink) 60%, transparent)',
                  }}
                >
                  {scrolled && link.condensedLabel ? link.condensedLabel : link.label}
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div layout transition={LAYOUT_TRANSITION}>
            <ThemeToggle theme={theme} onToggle={toggleTheme} size={scrolled ? 13 : 15} />
          </motion.div>

          <AnimatePresence initial={false}>
            {scrolled && (
              <motion.a
                layout
                key="hire-me"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('contact')
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ layout: LAYOUT_TRANSITION, opacity: { duration: 0.35, ease: EASE } }}
                className="hidden bg-bg px-2.5 py-[5px] text-[11.5px] font-extrabold text-ink transition-colors duration-200 hover:bg-bg/85 md:inline-block"
              >
                Hire me
              </motion.a>
            )}
          </AnimatePresence>

          <motion.button
            layout
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            transition={LAYOUT_TRANSITION}
            className="flex flex-col gap-[5px] p-1 md:hidden"
          >
            <motion.span
              className="block h-[1.5px] w-5 bg-current"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5.5 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
            <motion.span
              className="block h-[1.5px] w-5 bg-current"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5.5 : 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            />
          </motion.button>
        </motion.nav>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ink px-8 pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigate(link.id)
                  }}
                  className="border-b border-bg/12 py-5 text-3xl font-extrabold tracking-tight text-bg"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i, ease: EASE }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
