import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { about } from '../data/content'

export function About() {
  return (
    <section id="about" className="content-container scroll-mt-24 px-3 py-20 sm:px-5 lg:px-7 lg:py-24">
      <SectionHeading kicker={about.kicker} title={about.heading} />

      <div className="mt-10 h-[2px] bg-ink" />

      <div className="grid gap-0 lg:grid-cols-2">
        {about.paragraphs.map((p, i) => (
          <Reveal
            key={p.slice(0, 12)}
            delay={i * 0.1}
            className={`border-ink/14 px-0 py-8 lg:px-10 lg:py-10 ${
              i === 0 ? 'lg:border-r' : ''
            } ${i > 0 ? 'border-t lg:border-t-0' : ''}`}
          >
            <p className="max-w-[52ch] text-[16px] leading-[1.65] text-ink/62 sm:text-[17px]">{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
