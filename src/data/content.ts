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
  signal: string
  childSkills: ExpertiseChildSkill[]
  workflow: ExpertiseWorkflowStep[]
  tools: string[]
  outputs: string[]
  proof: string[]
}

export interface ExpertiseChildSkill {
  name: string
  detail: string
}

export interface ExpertiseWorkflowStep {
  label: string
  detail: string
}

export const expertise: ExpertiseGroup[] = [
  {
    num: '01',
    kind: 'AI Systems',
    title: 'Agentic AI',
    body:
      'I can design agent systems that plan, retrieve context, use tools, coordinate specialist roles, and produce auditable outputs instead of one-off chatbot replies.',
    signal: 'Best for autonomous workflows, decision support, internal copilots, and systems that need to act across real tools.',
    childSkills: [
      {
        name: 'Agent orchestration',
        detail:
          'Break one large request into planner, executor, reviewer, and reporter roles with clear state handoff.',
      },
      {
        name: 'Tool routing',
        detail:
          'Connect agents to APIs, databases, files, search, calculators, and product actions with permission-aware execution.',
      },
      {
        name: 'Multi-agent debate',
        detail:
          'Use specialist agents to compare evidence, expose tradeoffs, and converge on one practical recommendation.',
      },
      {
        name: 'Memory and state',
        detail:
          'Persist useful context, task progress, decisions, and structured artifacts without polluting future runs.',
      },
      {
        name: 'Guardrails and evaluation',
        detail:
          'Add confidence checks, escalation rules, grounded citations, test prompts, and failure-mode reviews.',
      },
      {
        name: 'Digital twin logic',
        detail:
          'Model a live system such as traffic, operations, cases, or energy flow so decisions can be simulated before action.',
      },
    ],
    workflow: [
      {
        label: 'Input',
        detail: 'User goal, operating constraints, connected tools, policies, project data, and expected output format.',
      },
      {
        label: 'Plan',
        detail: 'Planner decomposes the job, assigns specialist agents, and chooses what data or tools are needed.',
      },
      {
        label: 'Act',
        detail: 'Agents retrieve context, call tools, transform data, generate options, and record intermediate state.',
      },
      {
        label: 'Verify',
        detail: 'Reviewer checks grounding, consistency, edge cases, and whether the output is safe to use.',
      },
      {
        label: 'Deliver',
        detail: 'System returns a decision, workflow result, dashboard update, action plan, or live project output.',
      },
    ],
    tools: ['LLMs', 'LangChain-style orchestration', 'tool calling', 'RAG', 'FastAPI', 'Next.js'],
    outputs: ['Autonomous workflows', 'agent dashboards', 'decision memos', 'tool-using copilots'],
    proof: ['Senate AI', 'City Flow Command'],
  },
  {
    num: '02',
    kind: 'AI Systems',
    title: 'RAG & Retrieval',
    body:
      'I can build retrieval systems that let AI answer from real documents, structured knowledge, and current project data with traceable grounding.',
    signal: 'Best for knowledge bases, legal or finance assistants, document-heavy products, and internal search copilots.',
    childSkills: [
      {
        name: 'Corpus design',
        detail:
          'Structure source documents, metadata, roles, and permissions before embeddings are created.',
      },
      {
        name: 'Chunking strategy',
        detail:
          'Split content by semantic boundaries so retrieved context is useful instead of noisy.',
      },
      {
        name: 'Embedding pipelines',
        detail:
          'Generate, refresh, and version vectors for documents, project records, notes, and domain data.',
      },
      {
        name: 'Vector retrieval',
        detail:
          'Search relevant context using embeddings, metadata filters, reranking, and top-k tuning.',
      },
      {
        name: 'Answer grounding',
        detail:
          'Force responses to cite retrieved evidence and separate known facts from assumptions.',
      },
      {
        name: 'Retrieval evaluation',
        detail:
          'Test recall, precision, hallucination risk, stale data, and missing-document behavior.',
      },
    ],
    workflow: [
      {
        label: 'Collect',
        detail: 'Documents, notes, PDFs, spreadsheets, policies, project records, and domain-specific data are gathered.',
      },
      {
        label: 'Index',
        detail: 'Content is cleaned, chunked, embedded, tagged, and stored with metadata for retrieval.',
      },
      {
        label: 'Retrieve',
        detail: 'The user query searches the vector store and filters the best context for the task.',
      },
      {
        label: 'Reason',
        detail: 'The model answers using only relevant evidence, identifies gaps, and avoids unsupported claims.',
      },
      {
        label: 'Show',
        detail: 'The UI exposes answers, citations, source snippets, confidence, and next actions.',
      },
    ],
    tools: ['Embeddings', 'vector databases', 'LangChain', 'metadata filters', 'reranking', 'Next.js'],
    outputs: ['Knowledge copilots', 'document Q&A', 'retrieval APIs', 'citation-backed answers'],
    proof: ['Senate AI', 'CaseEase'],
  },
  {
    num: '03',
    kind: 'Backend',
    title: 'Full-stack Engineering',
    body:
      'I can take a product from backend logic to frontend experience, keeping data models, APIs, and UI behavior aligned end to end.',
    signal: 'Best for AI products, dashboards, workflow platforms, portfolio systems, and internal tools that need to ship cleanly.',
    childSkills: [
      {
        name: 'API architecture',
        detail:
          'Design service boundaries, request flows, validation, error states, and typed API contracts.',
      },
      {
        name: 'Database modeling',
        detail:
          'Shape Postgres schemas, relational workflows, audit trails, and query patterns for product needs.',
      },
      {
        name: 'Frontend systems',
        detail:
          'Build polished React and Next.js interfaces with responsive layouts and purposeful interactions.',
      },
      {
        name: 'State and workflows',
        detail:
          'Represent forms, queues, approvals, status timelines, and live execution states in the UI.',
      },
      {
        name: 'Integration work',
        detail:
          'Connect third-party APIs, model services, file uploads, auth, and background processing.',
      },
      {
        name: 'Product hardening',
        detail:
          'Handle loading, failure, empty states, accessibility, deployment readiness, and maintainability.',
      },
    ],
    workflow: [
      {
        label: 'Scope',
        detail: 'Define users, core flows, data entities, permissions, success states, and failure states.',
      },
      {
        label: 'Model',
        detail: 'Create schemas, API contracts, service boundaries, and validation rules.',
      },
      {
        label: 'Build',
        detail: 'Implement backend routes, business logic, frontend views, interactions, and integrations.',
      },
      {
        label: 'Test',
        detail: 'Check flows end to end, verify edge cases, inspect UI behavior, and harden errors.',
      },
      {
        label: 'Ship',
        detail: 'Deploy a usable product surface with clear status, analytics-ready events, and maintainable code.',
      },
    ],
    tools: ['Python', 'FastAPI', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL'],
    outputs: ['Production APIs', 'admin dashboards', 'workflow apps', 'customer-facing interfaces'],
    proof: ['CaseEase', 'QuantCore AI', 'Aditya Portfolio'],
  },
  {
    num: '04',
    kind: 'Applied ML',
    title: 'Machine Learning',
    body:
      'I can turn raw time-series, market, sensor, and operations data into measurable predictions, simulations, and decision-support systems.',
    signal: 'Best for forecasting, strategy simulation, anomaly detection, optimization, and analytics-heavy product modules.',
    childSkills: [
      {
        name: 'Time-series analysis',
        detail:
          'Prepare sequential data, calculate rolling signals, detect patterns, and build forecast-ready features.',
      },
      {
        name: 'Backtesting',
        detail:
          'Replay strategies over historical data with cash ledger, positions, metrics, and risk reporting.',
      },
      {
        name: 'Anomaly detection',
        detail:
          'Flag unusual behavior in traffic, energy, markets, and process flows using thresholds or model signals.',
      },
      {
        name: 'Optimization',
        detail:
          'Choose better routes, loads, allocations, or actions using constraints and measurable objectives.',
      },
      {
        name: 'Model evaluation',
        detail:
          'Compare outputs against baselines, error patterns, drawdown, delay, consumption, or business metrics.',
      },
      {
        name: 'Analytics packaging',
        detail:
          'Convert model outputs into charts, dashboards, reports, and API payloads people can actually use.',
      },
    ],
    workflow: [
      {
        label: 'Source',
        detail: 'Market candles, traffic feeds, sensor telemetry, case states, or product events enter the pipeline.',
      },
      {
        label: 'Prepare',
        detail: 'Data is cleaned, aligned, normalized, windowed, and transformed into features.',
      },
      {
        label: 'Model',
        detail: 'Indicators, classifiers, forecasts, rules, or optimizers generate usable signals.',
      },
      {
        label: 'Evaluate',
        detail: 'Signals are tested against baselines using risk, accuracy, delay, savings, or outcome metrics.',
      },
      {
        label: 'Visualize',
        detail: 'Results become charts, simulations, alerts, reports, and product-level recommendations.',
      },
    ],
    tools: ['Pandas', 'NumPy', 'yfinance', 'technical indicators', 'forecasting', 'evaluation metrics'],
    outputs: ['Backtest reports', 'forecast views', 'anomaly alerts', 'optimization dashboards'],
    proof: ['QuantCore AI', 'City Flow Command', 'Reducing Power Consumption'],
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
