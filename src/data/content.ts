export const identity = {
  name: 'Aditya Kale',
  role: 'AI Engineer',
  location: 'Pune, India',
  tagline: 'Building Intelligent Software for the AI Era',
  dek: 'Notes from the space between a model that answers and a system that acts.',
  description:
    'I design and ship AI-native systems, built on LLMs, agentic reasoning, and Retrieval-Augmented Generation — paired with the full-stack product work that puts them in front of people.',
  availability: 'Available for Work',
}

export const about = {
  kicker: 'About',
  heading: 'I build systems that reason, retrieve, and ship.',
  paragraphs: [
    "I'm an AI Engineer based in Pune, India, working at the intersection of agentic systems and production software. My day-to-day is LLMs, Agentic AI, and Retrieval-Augmented Generation — designing systems that don't just generate text, but reason over real data and take action.",
    "I run Aurelis Digital, where I sit across the full stack: architecting the AI layer, designing the interfaces on top of it, and shipping the product end to end. I care about the same things whether I'm tuning a retrieval pipeline or a button state — clarity, correctness, and restraint.",
  ],
}

export const focusAreas = [
  { label: 'Focus', value: 'Agentic AI', detail: 'Autonomous, multi-step systems that reason and act.' },
  { label: 'Systems', value: 'RAG & Retrieval', detail: 'Grounding model output in real, current data.' },
  { label: 'Stack', value: 'Python · FastAPI · Next.js', detail: 'Production services and the interfaces on top of them.' },
  { label: 'Now', value: 'Aurelis Digital', detail: 'Founder, CEO, and Agentic AI Head.' },
]

export interface ExpertiseGroup {
  num: string
  kind: string
  title: string
  body: string
  items: string[]
}

export const expertise: ExpertiseGroup[] = [
  {
    num: '01',
    kind: 'AI Systems',
    title: 'Agentic AI',
    body: 'Multi-agent architectures that plan, retrieve, and act — not single-shot completions.',
    items: ['Agent orchestration', 'Tool Calling', 'Multi-agent coordination', 'Digital twins', 'Workflow Automation'],
  },
  {
    num: '02',
    kind: 'AI Systems',
    title: 'RAG & Retrieval',
    body: 'Grounding LLM output in real, retrievable data so answers stay accurate and current.',
    items: ['Vector Databases', 'LangChain', 'Embedding pipelines', 'Corpus design'],
  },
  {
    num: '03',
    kind: 'Backend',
    title: 'Full-stack Engineering',
    body: 'Services and interfaces built by the same hand, so the seams disappear.',
    items: ['Python · FastAPI', 'Node.js', 'Next.js · TypeScript', 'MySql','Vercel'],
  },
  {
    num: '04',
    kind: 'Applied ML',
    title: 'Machine Learning',
    body: 'Practical ML applied to real constraints — traffic networks, markets, sensor data.',
    items: ['Skicit-Learn', 'XGBoost', 'Model evaluation', 'Data Processing', 'Feature Engineering'],
  },
]

export interface ExperienceEntry {
  period: string
  roles: string[]
  company: string
  summary: string
}

export const experience: ExperienceEntry[] = [
  {
    period: 'Present',
    roles: ['Founder & CEO', 'Frontend Designer', 'Agentic AI & Backend Structure'],
    company: 'Aurelis Digital',
    summary:
      'Running Aurelis end to end — setting direction as founder, designing the interfaces the products ship with, and leading the agentic AI systems underneath them.',
  },
]

export const contact = {
  kicker: 'Contact',
  heading: "Let's build something.",
  body: "Open to new projects and roles in agentic AI, RAG, and full-stack product work.",
}
