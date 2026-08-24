import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, StaggerGroup, staggerItem } from './Reveal'
import { projects } from '../data/projects'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Projects() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section id="projects" className="scroll-mt-24 py-20 lg:py-24">
      <div className="content-container px-3 sm:px-5 lg:px-7">
        <Reveal>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="m-0 text-[13px] tracking-[.16em] text-ink/45 uppercase sm:text-[14px]">
              Selected Projects
            </h2>
            <span className="text-[12px] text-ink/40">
              {String(projects.length).padStart(2, '0')} projects
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="content-container px-3 sm:px-5 lg:px-7">
        <div className="h-[2px] bg-ink" />
      </Reveal>

      <StaggerGroup className="content-container px-3 sm:px-5 lg:px-7">
        {projects.map((p, i) => {
          const isActive = active === i
          return (
            <motion.div
              key={p.num}
              variants={staggerItem}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
              className="cursor-pointer border-b border-ink/14 transition-colors duration-300 hover:bg-ink/[0.03]"
            >
              <div className="grid grid-cols-[32px_1fr_28px] items-center gap-4 py-5 sm:grid-cols-[56px_1fr_200px_36px] sm:gap-6 sm:py-6 lg:grid-cols-[64px_1fr_260px_40px]">
                <span className="text-[11px] tracking-[.1em] text-ink/35 sm:text-[12px]">
                  {p.num}
                </span>
                <span className="text-[22px] font-extrabold tracking-[-0.025em] sm:text-[28px] lg:text-[34px]">
                  {p.title}
                </span>
                <span className="hidden text-[12.5px] tracking-[.06em] text-ink/45 uppercase sm:block">
                  {p.kind}
                </span>
                <a
                  href={`/projects/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Open live run for ${p.title} in a new tab`}
                  className="justify-self-end text-[18px] text-ink/35 transition-colors duration-200 hover:text-ink sm:text-[20px]"
                >
                  ↗
                </a>
              </div>

              <div
                className="overflow-hidden transition-[grid-template-rows] duration-[380ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                style={{
                  display: 'grid',
                  gridTemplateRows: isActive ? '1fr' : '0fr',
                }}
              >
                <div className="min-h-0">
                  <div className="grid grid-cols-1 gap-4 pb-6 sm:grid-cols-[56px_1fr_236px] sm:gap-6 lg:grid-cols-[64px_1fr_300px]">
                    <span className="hidden sm:block" />
                    <motion.p
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -6 }}
                      transition={{ duration: 0.3, delay: isActive ? 0.08 : 0, ease: EASE }}
                      className="m-0 max-w-[60ch] text-[15px] leading-[1.6] text-ink/62 sm:text-[16px]"
                    >
                      {p.summary}
                    </motion.p>
                    <div className="flex flex-wrap content-start gap-1.5">
                      {p.stack.map((s, si) => (
                        <motion.span
                          key={s}
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : -6,
                          }}
                          transition={{
                            duration: 0.28,
                            delay: isActive ? 0.1 + si * 0.03 : 0,
                            ease: EASE,
                          }}
                          className="border border-ink/18 px-[9px] py-[4px] text-[11.5px] text-ink/65"
                        >
                          {s}
                        </motion.span>
                      ))}
                      <motion.a
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -6 }}
                        transition={{
                          duration: 0.28,
                          delay: isActive ? 0.1 + p.stack.length * 0.03 : 0,
                          ease: EASE,
                        }}
                        className="mt-1 flex w-full items-center gap-1.5 bg-ink px-[9px] py-[6px] text-[11.5px] font-semibold text-bg transition-colors duration-200 hover:bg-ink/85"
                      >
                        View Live Run
                        <span className="opacity-70">↗</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
