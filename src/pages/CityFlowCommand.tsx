import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Pause, Play } from 'lucide-react'
import { ThemeToggle } from '../components/ThemeToggle'
import { useTheme } from '../hooks/useTheme'

const EASE = [0.22, 0.61, 0.36, 1] as const
const STAGE_DURATION = 4200

interface Stage {
  id: string
  label: string
  detail: string
  hotEdges: number[]
  emergency?: boolean
}

const STAGES: Stage[] = [
  {
    id: 'topology',
    label: 'City Network Topology',
    detail:
      'Ingests the directed road graph: junctions, arterial corridors, lane counts and baseline speed limits for the metro area.',
    hotEdges: [],
  },
  {
    id: 'ingestion',
    label: 'Live Traffic Ingestion',
    detail:
      'Streams real-time speed and volume per corridor from traffic APIs, sampled every few seconds per edge.',
    hotEdges: [3, 9],
  },
  {
    id: 'forecast',
    label: 'Congestion Forecasting',
    detail:
      'A time-series model projects corridor congestion roughly fifteen minutes ahead, corridor by corridor.',
    hotEdges: [3, 9, 14],
  },
  {
    id: 'anomaly',
    label: 'Anomaly Detection',
    detail:
      'Flags incidents from sudden speed drops and volume gaps that don’t match the forecast envelope.',
    hotEdges: [14],
  },
  {
    id: 'emergency',
    label: 'Emergency Corridor Routing',
    detail:
      'Opens a priority path for an ambulance or fire unit, holding conflicting signals red along the route.',
    hotEdges: [1, 6, 11, 16],
    emergency: true,
  },
  {
    id: 'signals',
    label: 'Adaptive Signal Retiming',
    detail:
      'Recomputes green-phase durations across the affected junctions to clear the queue without new bottlenecks.',
    hotEdges: [1, 6, 11, 16],
  },
  {
    id: 'twin',
    label: 'Digital Twin Sync',
    detail:
      'Mirrors the live network state into a digital twin operators can run what-if scenarios against.',
    hotEdges: [],
  },
]

const GRID_COLS = 6
const GRID_ROWS = 4
const CELL = 70

function buildGraph() {
  const nodes: { id: number; x: number; y: number }[] = []
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      nodes.push({ id: r * GRID_COLS + c, x: c * CELL + 30, y: r * CELL + 30 })
    }
  }
  const edges: { id: number; a: number; b: number }[] = []
  let eid = 0
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const id = r * GRID_COLS + c
      if (c < GRID_COLS - 1) edges.push({ id: eid++, a: id, b: id + 1 })
      if (r < GRID_ROWS - 1) edges.push({ id: eid++, a: id, b: id + GRID_COLS })
    }
  }
  return { nodes, edges }
}

const GRAPH = buildGraph()

function useLiveMetric(base: number, jitter: number, tickMs = 1400) {
  const [value, setValue] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const next = v + (Math.random() - 0.5) * jitter
        return Math.max(0, Math.round(next))
      })
    }, tickMs)
    return () => clearInterval(id)
  }, [jitter, tickMs])
  return value
}

function TrafficGrid({ stage }: { stage: Stage }) {
  const width = (GRID_COLS - 1) * CELL + 60
  const height = (GRID_ROWS - 1) * CELL + 60
  const hotSet = useMemo(() => new Set(stage.hotEdges), [stage])

  const emergencyPath = useMemo(() => {
    if (!stage.emergency) return null
    const ids = stage.hotEdges
    return ids
      .map((eid) => GRAPH.edges.find((e) => e.id === eid))
      .filter((e): e is (typeof GRAPH.edges)[number] => !!e)
  }, [stage])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-full w-full"
      role="img"
      aria-label={`Traffic network diagram, stage: ${stage.label}`}
    >
      {GRAPH.edges.map((edge) => {
        const a = GRAPH.nodes[edge.a]
        const b = GRAPH.nodes[edge.b]
        const isHot = hotSet.has(edge.id)
        return (
          <motion.line
            key={edge.id}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            strokeLinecap="round"
            initial={false}
            animate={{
              stroke: isHot
                ? stage.emergency
                  ? 'var(--color-ink)'
                  : 'color-mix(in srgb, var(--color-ink) 55%, transparent)'
                : 'color-mix(in srgb, var(--color-ink) 14%, transparent)',
              strokeWidth: isHot ? 3 : 1.5,
            }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        )
      })}
      {GRAPH.nodes.map((node) => (
        <circle key={node.id} cx={node.x} cy={node.y} r={3} fill="var(--color-ink)" opacity={0.35} />
      ))}
      {emergencyPath && (
        <motion.circle
          r={5}
          fill="var(--color-ink)"
          initial={{
            cx: GRAPH.nodes[emergencyPath[0].a].x,
            cy: GRAPH.nodes[emergencyPath[0].a].y,
          }}
          animate={{
            cx: emergencyPath.map((e) => GRAPH.nodes[e.b].x),
            cy: emergencyPath.map((e) => GRAPH.nodes[e.b].y),
          }}
          transition={{ duration: 2.6, ease: 'linear', repeat: Infinity }}
        />
      )}
    </svg>
  )
}

export function CityFlowCommand() {
  const { theme, toggleTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(!reduceMotion)
  const progressRef = useRef<HTMLDivElement>(null)

  const stage = STAGES[index]

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % STAGES.length)
    }, STAGE_DURATION)
    return () => clearInterval(id)
  }, [playing])

  const vehiclesPerMin = useLiveMetric(842, 30)
  const avgDelaySec = useLiveMetric(38, 6, 1800)
  const corridorsOptimized = useLiveMetric(12, 2, 2200)
  const anomalies = stage.id === 'anomaly' || stage.id === 'emergency' ? 1 : 0

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="flex items-center justify-between border-b border-ink/12 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-[13px] font-semibold text-ink/70 transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={15} strokeWidth={1.8} />
          Aditya Kale
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-[11px] tracking-[.12em] text-ink/40 uppercase sm:inline">
            Live System Simulation
          </span>
          <ThemeToggle theme={theme} onToggle={toggleTheme} size={15} />
        </div>
      </header>

      <div className="content-container px-3 py-14 sm:px-5 sm:py-16 lg:px-7 lg:py-20">
        <div className="mb-2 text-[11px] tracking-[.16em] text-ink/45 uppercase">
          Project 01 &middot; Agentic AI &middot; ML &middot; Digital Twin
        </div>
        <h1 className="mb-5 max-w-[16ch] text-[clamp(2.25rem,6vw,58px)] leading-[1.03] tracking-[-0.03em]">
          City Flow Command
        </h1>
        <p className="max-w-[62ch] text-[16px] leading-[1.65] text-ink/62 sm:text-[17px]">
          An adaptive traffic system for cities like Pune: it retimes signals live, opens emergency
          corridors for ambulances and fire, and mirrors the whole network in a digital twin you can run
          scenarios against. The panel below is a live-simulated walkthrough of the pipeline &mdash; not
          real production traffic data.
        </p>
      </div>

      <div className="h-[2px] bg-ink" />

      {/* Live metrics strip */}
      <div className="border-b border-ink/12">
        <div className="content-container grid grid-cols-2 sm:grid-cols-4">
          {[
            { label: 'Vehicles / min', value: vehiclesPerMin },
            { label: 'Avg delay', value: `${avgDelaySec}s` },
            { label: 'Corridors optimized', value: corridorsOptimized },
            { label: 'Active anomalies', value: anomalies },
          ].map((m, i) => (
            <div
              key={m.label}
              className={`px-3 py-4 sm:px-5 lg:px-7 ${i < 3 ? 'border-r border-ink/10' : ''}`}
            >
              <div className="mb-1 text-[10.5px] tracking-[.08em] text-ink/42 uppercase">{m.label}</div>
              <div className="text-[20px] font-semibold tabular-nums">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      <div className="content-container px-3 py-14 sm:px-5 lg:px-7 lg:py-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-[11px] tracking-[.16em] text-ink/45 uppercase">
            Pipeline &middot; Stage {String(index + 1).padStart(2, '0')} / {STAGES.length}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="flex items-center gap-2 border border-ink/16 px-3 py-1.5 text-[11.5px] font-semibold text-ink transition-colors duration-200 hover:bg-ink hover:text-bg"
          >
            {playing ? <Pause size={13} strokeWidth={2} /> : <Play size={13} strokeWidth={2} />}
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>

        <div ref={progressRef} className="mb-8 h-[2px] w-full bg-ink/10">
          <motion.div
            key={playing ? index : `paused-${index}`}
            className="h-full bg-ink"
            initial={{ width: '0%' }}
            animate={{ width: playing ? '100%' : '0%' }}
            transition={{ duration: playing ? STAGE_DURATION / 1000 : 0, ease: 'linear' }}
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
            {STAGES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`shrink-0 border-ink/10 px-3 py-3 text-left transition-colors duration-200 lg:border-b lg:px-0 lg:py-3 ${
                  i === index ? '' : 'hover:bg-ink/[0.03] lg:hover:bg-transparent'
                }`}
              >
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`text-[11px] tracking-[.05em] ${i === index ? 'text-ink' : 'text-ink/35'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`text-[13.5px] leading-tight font-semibold whitespace-nowrap lg:whitespace-normal ${
                      i === index ? 'text-ink' : 'text-ink/45'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div>
            <div className="mb-6 aspect-[3/2] border border-ink/14 p-4 sm:p-6">
              <TrafficGrid stage={stage} />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={stage.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="max-w-[60ch] text-[15px] leading-[1.6] text-ink/62 sm:text-[16px]"
              >
                {stage.detail}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <footer className="content-container flex flex-wrap items-center justify-between gap-3 border-t border-ink/12 px-3 py-6 text-[11.5px] tracking-[.06em] text-ink/40 uppercase sm:px-5 lg:px-7">
        <span>Simulated walkthrough &mdash; not live production data</span>
        <Link to="/" className="transition-colors duration-200 hover:text-ink">
          &larr; Back to portfolio
        </Link>
      </footer>
    </div>
  )
}
