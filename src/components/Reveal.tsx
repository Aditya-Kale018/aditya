import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.22, 0.61, 0.36, 1] as const

interface RevealProps {
  children?: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'section'
}

export function Reveal({ children, className, delay = 0, y = 24, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Component>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

interface StaggerGroupProps {
  children: ReactNode
  className?: string
}

export function StaggerGroup({ children, className }: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}
