import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { StaggerGroup, Reveal, staggerItem } from './Reveal'
import { expertise } from '../data/content'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Expertise() {
  const [active, setActive] = useState(0)
  const selected = expertise[active]

  return (
    <section id="expertise" className="content-container scroll-mt-24 px-3 py-20 sm:px-5 lg:px-7 lg:py-24">
      <SectionHeading
        kicker="Expertise"
        title="A working map of what I can build."
        trailing="Click a capability to open its child skills, workflow, tools, and proof projects."
      />

      <Reveal delay={0.1} className="mt-10 h-[2px] bg-ink" />

      <div className="mt-10 grid gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)]">
        <StaggerGroup className="grid auto-rows-fr gap-3">
          {expertise.map((group, groupIndex) => {
            const isActive = groupIndex === active

            return (
              <motion.button
                key={group.title}
                type="button"
                variants={staggerItem}
                onClick={() => setActive(groupIndex)}
                className={`group grid border p-5 text-left transition-all duration-300 sm:p-6 ${
                  isActive
                    ? 'min-h-[260px] border-ink bg-ink text-bg shadow-[0_22px_70px_rgba(0,0,0,0.14)]'
                    : 'min-h-[132px] border-ink/14 text-ink hover:-translate-y-1 hover:border-ink/38 hover:bg-ink/[0.03]'
                }`}
                aria-expanded={isActive}
              >
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span
                    className={`text-[11.5px] tracking-[.1em] ${
                      isActive ? 'text-bg/55' : 'text-ink/35'
                    }`}
                  >
                    {group.num}
                  </span>
                  <span
                    className={`text-[11.5px] tracking-[.08em] uppercase ${
                      isActive ? 'text-bg/55' : 'text-ink/45'
                    }`}
                  >
                    {group.kind}
                  </span>
                </div>

                <div className="grid gap-3">
                  <h3 className="text-[26px] leading-[1.02] tracking-[-0.03em] sm:text-[34px]">
                    {group.title}
                  </h3>
                  <p
                    className={`max-w-[58ch] text-[14.5px] leading-[1.6] transition-colors duration-300 sm:text-[15px] ${
                      isActive ? 'text-bg/72' : 'line-clamp-2 text-ink/58'
                    }`}
                  >
                    {isActive ? group.body : group.signal}
                  </p>
                </div>

                <div
                  className={`mt-5 grid gap-2 overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0">
                    <div className="flex flex-wrap gap-1.5">
                      {group.childSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill.name}
                          className="border border-bg/22 px-2.5 py-1 text-[11.5px] text-bg/72"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </StaggerGroup>

        <Reveal delay={0.12}>
          <motion.div
            key={selected.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="border border-ink/14 bg-ink/[0.025]"
          >
            <div className="border-b border-ink/14 p-5 sm:p-7">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] tracking-[.14em] text-ink/45 uppercase">
                  Capability Simulation
                </span>
                <span className="border border-ink/16 px-2.5 py-1 text-[11px] text-ink/52">
                  {selected.kind}
                </span>
              </div>
              <h3 className="mb-3 text-[clamp(2rem,5vw,56px)] leading-[0.96] tracking-[-0.04em]">
                {selected.title}
              </h3>
              <p className="max-w-[66ch] text-[15px] leading-[1.65] text-ink/62 sm:text-[16px]">
                {selected.body}
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1fr_0.82fr]">
              <div className="border-b border-ink/14 p-5 sm:p-7 lg:border-r lg:border-b-0">
                <div className="mb-5 text-[11px] tracking-[.14em] text-ink/45 uppercase">
                  Child Skills
                </div>
                <div className="grid gap-3">
                  {selected.childSkills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.28, delay: skillIndex * 0.035, ease: EASE }}
                      className="border border-ink/12 bg-bg/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-ink/36 hover:bg-bg"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className="text-[10.5px] font-semibold tracking-[.12em] text-ink/36">
                          {String(skillIndex + 1).padStart(2, '0')}
                        </span>
                        <h4 className="m-0 text-[16px] leading-tight">{skill.name}</h4>
                      </div>
                      <p className="m-0 text-[13.5px] leading-[1.55] text-ink/58">{skill.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid content-start gap-5 p-5 sm:p-7">
                <div>
                  <div className="mb-4 text-[11px] tracking-[.14em] text-ink/45 uppercase">
                    How I Use It
                  </div>
                  <div className="relative grid gap-3">
                    <div className="absolute top-5 bottom-5 left-[13px] w-px bg-gradient-to-b from-ink/70 to-ink/8" />
                    {selected.workflow.map((step, stepIndex) => (
                      <div key={step.label} className="relative grid gap-1.5 pl-9">
                        <span className="absolute top-1 left-0 grid h-7 w-7 place-items-center border border-ink/16 bg-bg text-[10px] font-semibold">
                          {stepIndex + 1}
                        </span>
                        <h4 className="m-0 text-[15px]">{step.label}</h4>
                        <p className="m-0 text-[13px] leading-[1.52] text-ink/56">{step.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 border-t border-ink/12 pt-5">
                  <div>
                    <div className="mb-2 text-[11px] tracking-[.12em] text-ink/38 uppercase">
                      Tools
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.tools.map((tool) => (
                        <span
                          key={tool}
                          className="border border-ink/16 px-2.5 py-1 text-[11.5px] text-ink/62"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-[11px] tracking-[.12em] text-ink/38 uppercase">
                      Outputs
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.outputs.map((output) => (
                        <span key={output} className="bg-ink px-2.5 py-1 text-[11.5px] text-bg">
                          {output}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-[11px] tracking-[.12em] text-ink/38 uppercase">
                      Proof Projects
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.proof.map((project) => (
                        <span
                          key={project}
                          className="border border-ink/16 px-2.5 py-1 text-[11.5px] text-ink/62"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
