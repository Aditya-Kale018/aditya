import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { contact, identity } from '../data/content'
import { socials, contactEmail } from '../data/socials'
import { SocialIcon } from './SocialIcon'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <div className="content-container px-3 py-20 sm:px-5 lg:px-7 lg:py-24">
        <SectionHeading kicker={contact.kicker} title={contact.heading} />
        <Reveal delay={0.1} className="mt-5 max-w-[52ch]">
          <p className="text-[16px] leading-[1.65] text-ink/62 sm:text-[17px]">{contact.body}</p>
        </Reveal>
      </div>

      <div className="h-[2px] bg-ink" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="bg-ink text-bg"
      >
        <div className="content-container px-3 py-16 sm:px-5 sm:py-20 lg:px-7 lg:py-24">
          <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex items-baseline gap-3 text-[clamp(1.75rem,6vw,56px)] font-extrabold tracking-[-0.03em] break-all"
            >
              <span className="transition-opacity duration-200 group-hover:opacity-70">
                {contactEmail}
              </span>
              <span className="text-[0.5em] opacity-50 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-90">
                ↗
              </span>
            </a>

            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-[38px] w-[38px] items-center justify-center border border-bg/25 text-bg transition-colors duration-200 hover:bg-bg hover:text-ink"
                >
                  <SocialIcon icon={s.key} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-bg/14 pt-6 text-[11.5px] tracking-[.1em] text-bg/45 uppercase">
            <span>{identity.location}</span>
            <span>{identity.availability}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
