import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { StaggerGroup, Reveal, staggerItem } from './Reveal'
import { expertise } from '../data/content'

export function Expertise() {
  return (
    <section id="expertise" className="content-container scroll-mt-24 px-3 py-20 sm:px-5 lg:px-7 lg:py-24">
      <SectionHeading kicker="Expertise" title="The tools and disciplines behind the work." />

      <Reveal delay={0.1} className="mt-10 h-[2px] bg-ink" />

      <StaggerGroup className="grid grid-cols-1 border-t border-l border-ink/14 sm:grid-cols-2">
        {expertise.map((group) => {
          return (
            <motion.div
              key={group.title}
              variants={staggerItem}
              className="border-r border-b border-ink/14 px-7 py-8 transition-colors duration-300 hover:bg-ink/[0.03] sm:px-9 sm:py-10"
            >
              <div className="mb-5 flex items-baseline justify-between">
                <span className="text-[11.5px] tracking-[.1em] text-ink/35">{group.num}</span>
                <span className="text-[11.5px] tracking-[.08em] text-ink/45 uppercase">
                  {group.kind}
                </span>
              </div>
              <h3 className="mb-3 text-[24px] tracking-[-0.02em] sm:text-[28px]">{group.title}</h3>
              <p className="mb-5 min-h-[64px] text-[14.5px] leading-[1.6] text-ink/60 sm:text-[15px]">
                {group.body}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="border border-ink/18 px-[9px] py-[4px] text-[11.5px] text-ink/65"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
