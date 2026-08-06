export interface Project {
  num: string
  title: string
  kind: string
  summary: string
  stack: string[]
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'City Flow Command',
    kind: 'Agentic AI · ML · Digital Twin',
    summary:
      'An adaptive traffic system for cities like Pune: it retimes signals live, opens emergency corridors for ambulances and fire, and mirrors the whole network in a digital twin you can run scenarios against.',
    stack: ['Agentic AI', 'Machine Learning', 'Digital Twin', 'Traffic APIs', 'Python'],
  },
  {
    num: '02',
    title: 'QuantCore AI',
    kind: 'Python · Quantitative Backtesting',
    summary:
      'A Python server that pulls equities data from yfinance, runs strategies (RSI, MA crossover) against a given capital and date range, and returns a backtest as both numbers and charts.',
    stack: ['Python', 'FastAPI', 'yfinance', 'Pandas', 'Backtesting'],
  },
  {
    num: '03',
    title: 'Senate AI',
    kind: 'RAG · Multi-Agent Systems',
    summary:
      'A digital cabinet for early-stage startups. Legal, Finance, Marketing, Hiring, Operations and CEO agents each reason over their own retrieval corpus, then converge on one devised plan.',
    stack: ['RAG', 'Multi-Agent', 'LangChain', 'Vector DB', 'Next.js'],
  },
  {
    num: '04',
    title: 'CaseEase',
    kind: 'Full-stack · Civic Platform',
    summary:
      'Digitising case filing in India end to end — from lodging an FIR to the courtroom — with every intermediate stage tracked, timestamped and visible to the person waiting on it.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    num: '05',
    title: 'Reducing Power Consumption',
    kind: 'Hardware · Sensing',
    summary:
      'A hardware build that meters electricity use and regulates it against room brightness, humidity and temperature. Measured 35–40% less consumption in testing.',
    stack: ['Embedded', 'Sensors', 'Automation', 'Python'],
  },
]
