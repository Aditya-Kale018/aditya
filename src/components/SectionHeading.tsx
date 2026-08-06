import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  kicker: string
  title?: ReactNode
  trailing?: ReactNode
  className?: string
}

export function SectionHeading({ kicker, title, trailing, className }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="m-0 text-[13px] tracking-[.16em] text-ink/45 uppercase sm:text-[14px]">
          {kicker}
        </h2>
        {trailing && <span className="text-[12px] text-ink/40">{trailing}</span>}
      </div>
      {title && (
        <p className="mt-2 max-w-[26ch] text-[24px] leading-[1.2] font-extrabold tracking-[-0.02em] sm:text-[26px]">
          {title}
        </p>
      )}
    </Reveal>
  )
}
