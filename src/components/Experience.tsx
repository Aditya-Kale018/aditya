import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { StaggerGroup, Reveal, staggerItem } from './Reveal'
import { experience } from '../data/content'

export function Experience() {
  return (
    <section id="experience" className="content-container scroll-mt-24 px-3 py-20 sm:px-5 lg:px-7 lg:py-24">
      <SectionHeading kicker="Experience" title="What I've been doing, and where." />

      <Reveal delay={0.1} className="mt-10 h-[2px] bg-ink" />

      <StaggerGroup>
        {experience.map((entry) => (
          <motion.div
            key={entry.company + entry.period}
            variants={staggerItem}
            className="grid grid-cols-1 gap-6 border-b border-ink/14 py-9 transition-colors duration-300 hover:bg-ink/[0.03] sm:grid-cols-[120px_1fr] sm:gap-8 lg:grid-cols-[160px_1fr]"
          >
            <div className="text-[12.5px] tracking-[.08em] text-ink/45 uppercase">
              {entry.period}
            </div>
            <div>
              <h3 className="mb-2 text-[22px] tracking-[-0.02em] sm:text-[26px]">
                {entry.company}
              </h3>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {entry.roles.map((role) => (
                  <span
                    key={role}
                    className="border border-ink/18 px-[9px] py-[4px] text-[11.5px] text-ink/65"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <p className="max-w-[60ch] text-[15px] leading-[1.6] text-ink/62">{entry.summary}</p>
            </div>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  )
}
