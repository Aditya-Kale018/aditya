import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Activity, RadioTower } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { identity } from '../data/content'
import { projects, type LiveMetric, type LiveProcessStep } from '../data/projects'
import { useTheme } from '../hooks/useTheme'

const EASE = [0.22, 0.61, 0.36, 1] as const
const HOME_NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#expertise', label: 'Expertise' },
  { href: '/#focus', label: 'Focus' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
]

function useLiveMetric(metric: LiveMetric) {
  const [value, setValue] = useState(metric.base)

  useEffect(() => {
    setValue(metric.base)
    const id = setInterval(() => {
      setValue((current) => {
        const next = current + (Math.random() - 0.5) * metric.jitter
        return Math.max(0, Math.round(next))
      })
    }, metric.tickMs ?? 1400)

    return () => clearInterval(id)
  }, [metric])

  return value
}

function formatMetric(value: number, metric: LiveMetric) {
  if (metric.prefix === '0.') {
    return `${metric.prefix}${String(value).padStart(3, '0')}${metric.suffix ?? ''}`
  }

  return `${metric.prefix ?? ''}${value.toLocaleString('en-IN')}${metric.suffix ?? ''}`
}

function MetricCell({ metric, index }: { metric: LiveMetric; index: number }) {
  const value = useLiveMetric(metric)

  return (
    <div className={`px-3 py-4 sm:px-5 lg:px-7 ${index < 3 ? 'border-r border-ink/10' : ''}`}>
      <div className="mb-1 text-[10.5px] text-ink/42 uppercase">{metric.label}</div>
      <div className="text-[20px] font-semibold tabular-nums">{formatMetric(value, metric)}</div>
    </div>
  )
}

function ProcessMap({
  activeIndex,
  onSelect,
  process,
}: {
  activeIndex: number
  onSelect: (index: number) => void
  process: LiveProcessStep[]
}) {
  return (
    <div className="group relative border border-ink/14 bg-ink/[0.025] p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/36 hover:shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:p-5">
      <div className="absolute top-8 bottom-8 left-8 w-px bg-gradient-to-b from-ink via-ink/24 to-ink/8" />
      <div className="relative grid gap-3">
        {process.map((step, processIndex) => {
          const isActive = processIndex === activeIndex

          return (
            <button
              key={step.title}
              type="button"
              onClick={() => onSelect(processIndex)}
              className={`relative grid min-h-[92px] gap-1.5 border px-4 py-3 pl-12 text-left transition-all duration-300 ${
                isActive
                  ? 'translate-x-1.5 border-ink bg-ink text-bg'
                  : 'border-ink/14 bg-bg/[0.88] text-ink hover:translate-x-1.5 hover:border-ink hover:bg-ink hover:text-bg group-hover:border-ink/28'
              }`}
            >
              <span
                className={`absolute top-4 left-3 h-4 w-4 rounded-full border-2 transition-transform duration-300 ${
                  isActive ? 'scale-110 border-bg bg-bg' : 'border-current bg-bg'
                }`}
              />
              <span
                className={`text-[10px] font-semibold tracking-[0.14em] uppercase ${
                  isActive ? 'text-bg/62' : 'text-ink/42'
                }`}
              >
                {String(processIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[16px] leading-tight font-semibold">{step.title}</span>
              <span
                className={`text-[12px] leading-[1.45] ${
                  isActive ? 'text-bg/72' : 'text-ink/52'
                }`}
              >
                {step.detail}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function LiveProject() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  const activeProject = project ?? projects[0]
  const { theme, toggleTheme } = useTheme()
  const [index, setIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollerRef = useRef<HTMLElement | null>(null)
  const stageRefs = useRef<Array<HTMLDivElement | null>>([])

  const stages = activeProject.live.stages
  const process = activeProject.live.process
  const stage = stages[index]
  const activeProcessIndex =
    stage.processIndex ?? Math.min(process.length - 1, Math.floor((index * process.length) / stages.length))
  const activeProcess = process[activeProcessIndex]

  useEffect(() => {
    setIndex(0)
    setScrollProgress(0)
    stageRefs.current = []
  }, [activeProject.slug])

  useEffect(() => {
    let frame = 0

    const updateFromScroll = () => {
      const scroller = scrollerRef.current
      if (!scroller) return

      const viewportMarker = window.innerHeight * 0.48
      const nearest = stageRefs.current.reduce(
        (best, element, stageIndex) => {
          if (!element) return best
          const rect = element.getBoundingClientRect()
          const distance = Math.abs(rect.top + rect.height * 0.36 - viewportMarker)
          return distance < best.distance ? { distance, stageIndex } : best
        },
        { distance: Number.POSITIVE_INFINITY, stageIndex: 0 },
      )

      setIndex(nearest.stageIndex)

      const rect = scroller.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const rawProgress = travel > 0 ? (window.innerHeight * 0.45 - rect.top) / travel : 0
      setScrollProgress(Math.min(1, Math.max(0, rawProgress)))
    }

    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateFromScroll)
    }

    updateFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [stages.length])

  const scrollToStage = (stageIndex: number) => {
    stageRefs.current[stageIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const scrollToProcess = (processIndex: number) => {
    const explicitStageIndex = stages.findIndex((item) => item.processIndex === processIndex)
    const fallbackStageIndex = Math.min(
      stages.length - 1,
      Math.max(0, Math.ceil(((processIndex + 0.5) * stages.length) / process.length) - 1),
    )

    scrollToStage(explicitStageIndex >= 0 ? explicitStageIndex : fallbackStageIndex)
  }

  if (!project) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/12 bg-bg/95 px-3 py-4 backdrop-blur sm:px-5 lg:px-7">
        <nav className="content-container flex items-center justify-between gap-5">
          <Link
            to="/"
            className="font-extrabold whitespace-nowrap text-ink transition-colors duration-200 hover:text-ink/70"
          >
            {identity.name}
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {HOME_NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] whitespace-nowrap text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-[11px] text-ink/40 uppercase sm:flex">
              <RadioTower size={13} strokeWidth={1.8} />
              Live Run
            </span>
            <ThemeToggle theme={theme} onToggle={toggleTheme} size={15} />
            <a
              href="/#contact"
              className="hidden bg-ink px-2.5 py-[5px] text-[11.5px] font-extrabold text-bg transition-colors duration-200 hover:bg-ink/85 md:inline-block"
            >
              Hire me
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="content-container px-3 py-14 sm:px-5 sm:py-16 lg:px-7 lg:py-20">
          <div className="mb-2 text-[11px] text-ink/45 uppercase">
            Project {project.num} / {project.live.domain}
          </div>
          <h1 className="mb-5 max-w-[18ch] text-[clamp(2.25rem,6vw,58px)] leading-[1.03]">
            {project.title}
          </h1>
          <p className="mb-4 max-w-[62ch] text-[16px] leading-[1.65] text-ink/64 sm:text-[17px]">
            {project.live.subtitle}
          </p>
          <p className="max-w-[68ch] text-[14px] leading-[1.65] text-ink/48 sm:text-[15px]">
            {project.live.note}
          </p>
        </section>

        <div className="h-[2px] bg-ink" />

        <section className="border-b border-ink/12">
          <div className="content-container grid grid-cols-2 sm:grid-cols-4">
            {project.live.metrics.map((metric, metricIndex) => (
              <MetricCell key={metric.label} metric={metric} index={metricIndex} />
            ))}
          </div>
        </section>

        <section ref={scrollerRef} className="content-container px-3 py-14 sm:px-5 lg:px-7 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="mb-1 text-[11px] text-ink/45 uppercase">
                {project.live.simulatorLabel}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-ink/58">
                <Activity size={15} strokeWidth={1.8} />
                {project.live.systemMode} / Stage {String(index + 1).padStart(2, '0')} of{' '}
                {stages.length}
              </div>
            </div>
            <span className="border border-ink/16 px-3 py-1.5 text-[11.5px] font-semibold text-ink/62">
              Scroll Driven
            </span>
          </div>

          <div className="mb-8 h-[2px] w-full bg-ink/10">
            <motion.div
              className="h-full bg-ink"
              initial={false}
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.18, ease: 'linear' }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.86fr)]">
            <div className="space-y-8">
              {stages.map((item, stageIndex) => {
                const isActive = stageIndex === index

                return (
                  <div
                    key={item.id}
                    ref={(node) => {
                      stageRefs.current[stageIndex] = node
                    }}
                    className={`min-h-[56vh] border-l-2 px-5 py-8 transition-colors duration-300 sm:px-7 lg:min-h-[68vh] ${
                      isActive ? 'border-ink bg-ink/[0.035]' : 'border-ink/12'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToStage(stageIndex)}
                      className="mb-5 text-left"
                    >
                      <span
                        className={`mb-2 block text-[11px] uppercase ${
                          isActive ? 'text-ink' : 'text-ink/38'
                        }`}
                      >
                        Stage {String(stageIndex + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`block text-[clamp(1.7rem,4vw,42px)] leading-[1.04] font-semibold ${
                          isActive ? 'text-ink' : 'text-ink/48'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                    <p className="max-w-[62ch] text-[15px] leading-[1.68] text-ink/62 sm:text-[17px]">
                      {item.detail}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-1.5">
                      {project.stack.map((tag) => (
                        <span
                          key={`${item.id}-${tag}`}
                          className={`border px-2.5 py-1 text-[11.5px] transition-colors duration-300 ${
                            isActive
                              ? 'border-ink/24 text-ink/70'
                              : 'border-ink/12 text-ink/36'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <div className="mb-4 flex gap-1.5 overflow-x-auto pb-2">
                {stages.map((item, stageIndex) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToStage(stageIndex)}
                    aria-label={`Scroll to ${item.label}`}
                    className={`h-8 min-w-8 border text-[11px] font-semibold transition-colors duration-200 ${
                      stageIndex === index
                        ? 'border-ink bg-ink text-bg'
                        : 'border-ink/16 text-ink/45 hover:border-ink/42 hover:text-ink'
                    }`}
                  >
                    {String(stageIndex + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <div className="mb-6 grid gap-4">
                <ProcessMap
                  activeIndex={activeProcessIndex}
                  process={process}
                  onSelect={scrollToProcess}
                />
                <div className="border border-ink/14 p-4">
                  <div className="mb-4 text-[11px] text-ink/45 uppercase">Telemetry</div>
                  <div className="space-y-3">
                    {project.live.telemetry.map((item, telemetryIndex) => (
                      <motion.div
                        key={item}
                        className="flex items-center justify-between gap-4 border-b border-ink/10 pb-2 text-[12.5px]"
                        initial={false}
                        animate={{
                          opacity: telemetryIndex <= index % project.live.telemetry.length ? 1 : 0.42,
                        }}
                        transition={{ duration: 0.35, ease: EASE }}
                      >
                        <span className="text-ink/62">{item}</span>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${project.slug}-${activeProcess.title}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <div className="mb-2 text-[11px] text-ink/45 uppercase">
                    Process Layer {String(activeProcessIndex + 1).padStart(2, '0')} / Stage{' '}
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className="mb-3 text-[22px] leading-tight font-semibold sm:text-[26px]">
                    {activeProcess.title}
                  </h2>
                  <p className="max-w-[64ch] text-[15px] leading-[1.6] text-ink/62 sm:text-[16px]">
                    {activeProcess.detail}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeProcess.items.map((item) => (
                      <span
                        key={item}
                        className="border border-ink/14 px-2.5 py-1 text-[11.5px] text-ink/58"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <footer className="content-container flex flex-wrap items-center justify-between gap-3 border-t border-ink/12 px-3 py-6 text-[11.5px] text-ink/40 uppercase sm:px-5 lg:px-7">
        <span>Simulated walkthrough / not live production data</span>
        <Link to="/" className="transition-colors duration-200 hover:text-ink">
          Back to portfolio
        </Link>
      </footer>
    </div>
  )
}
