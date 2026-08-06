import { StaggerGroup, Reveal, staggerItem } from './Reveal'
import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { focusAreas } from '../data/content'

export function Focus() {
  return (
    <section id="focus" className="content-container scroll-mt-24 px-3 py-20 sm:px-5 lg:px-7 lg:py-24">
      <SectionHeading
        kicker="Focus"
        title="Where the work concentrates right now."
      />

      <Reveal delay={0.1} className="mt-10 h-[2px] bg-ink" />

      <StaggerGroup className="grid grid-cols-1 border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((f, i) => (
          <motion.div
            key={f.label}
            variants={staggerItem}
            className={`px-1 py-8 transition-colors duration-300 hover:bg-ink/[0.03] sm:px-6 lg:px-7 ${
              i < focusAreas.length - 1 ? 'border-b border-ink/10 sm:border-r sm:border-b-0' : ''
            } ${i % 2 === 0 ? 'sm:border-r' : 'lg:border-r'}`}
          >
            <div className="mb-1.5 text-[11px] tracking-[.1em] text-ink/42 uppercase">
              {f.label}
            </div>
            <div className="mb-3 text-[15px] font-semibold sm:text-[16px]">{f.value}</div>
            <p className="text-[13px] leading-[1.55] text-ink/55">{f.detail}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  )
}
