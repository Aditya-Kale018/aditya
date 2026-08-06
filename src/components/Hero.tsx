import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
import { identity, focusAreas } from '../data/content'
import { socials } from '../data/socials'
import { SocialIcon } from './SocialIcon'
import portraitPlaceholder from '../assets/aditya.png'
import resumePdf from '../assets/resume.pdf'

const EASE = [0.22, 0.61, 0.36, 1] as const

export function Hero() {
  const portraitRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ['start start', 'end start'],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 40])

  return (
    <section id="hero" className="scroll-mt-24 pt-24 sm:pt-28">
      <div className="content-container grid gap-16 px-3 py-16 sm:px-5 sm:py-20 lg:grid-cols-[1fr_460px] lg:gap-20 lg:px-7 lg:py-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 inline-flex items-center gap-[9px] border border-ink/16 px-[11px] py-[6px] text-[11.5px] tracking-[.04em] text-ink/66 uppercase"
          >
            <span className="block h-1.5 w-1.5 bg-ink" />
            {identity.availability} · {identity.location}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="mb-4 text-[12px] tracking-[.16em] text-ink/45 uppercase"
          >
            {identity.role}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="mb-7 max-w-[11ch] text-[clamp(2.75rem,7.5vw,76px)] leading-[1.02] tracking-[-0.035em] text-ink"
          >
            {identity.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mb-6 max-w-[42ch] text-[17px] leading-[1.55] font-medium text-ink/80 italic sm:text-[18px]"
          >
            {identity.dek}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mb-10 max-w-[52ch] text-[17px] leading-[1.6] text-ink/62 sm:text-[19px]"
          >
            {identity.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mb-11 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-2.5 bg-ink px-[22px] py-3.5 text-[14px] font-extrabold text-bg transition-colors duration-200 hover:bg-ink/85"
            >
              View Projects
              <span className="opacity-60 transition-transform duration-200 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2.5 border border-ink/20 px-[22px] py-3.5 text-[14px] font-extrabold text-ink transition-colors duration-200 hover:bg-ink/5"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="flex gap-2.5"
          >
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                aria-label={s.label}
                className="flex h-[38px] w-[38px] items-center justify-center border border-ink/16 text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
              >
                <SocialIcon icon={s.key} />
              </a>
            ))}
            <a
              href={resumePdf}
              download="Aditya_Kale_Resume.pdf"
              aria-label="Download Resume"
              className="flex h-[38px] w-[38px] items-center justify-center border border-ink/16 text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
            >
              <Download size={16} strokeWidth={1.7} />
            </a>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="m-0"
        >
          <div
            ref={portraitRef}
            className="grayscale-photo relative aspect-[4/5] overflow-hidden border border-ink/14"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
              style={{ y: portraitY }}
              className="absolute inset-0"
            >
              <img
                src={portraitPlaceholder}
                alt={identity.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: '50% 22%' }}
              />
            </motion.div>
          </div>
          <figcaption className="mt-2.5 flex justify-between text-[11px] tracking-[.06em] text-ink/45 uppercase">
            <span>{identity.name}</span>
            <span>Pune, IN</span>
          </figcaption>
        </motion.figure>
      </div>

      <div className="border-t-2 border-ink/14">
        <div className="content-container grid grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              className={`px-3 py-[22px] transition-colors duration-300 hover:bg-ink/[0.03] sm:px-5 lg:px-7 ${
                i < focusAreas.length - 1 ? 'border-r border-ink/10' : ''
              }`}
            >
              <div className="mb-1.5 text-[11px] tracking-[.1em] text-ink/42 uppercase">
                {f.label}
              </div>
              <div className="text-[14px] font-semibold">{f.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
