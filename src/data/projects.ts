export interface Project {
  num: string
  title: string
  kind: string
  summary: string
  stack: string[]
  slug: string
  live: LiveProject
}

export interface LiveStage {
  id: string
  label: string
  detail: string
  processIndex?: number
  hotEdges?: number[]
  alert?: boolean
}

export interface LiveMetric {
  label: string
  base: number
  jitter: number
  suffix?: string
  prefix?: string
  tickMs?: number
}

export interface LiveProject {
  domain: string
  subtitle: string
  simulatorLabel: string
  systemMode: string
  note: string
  metrics: LiveMetric[]
  process: LiveProcessStep[]
  stages: LiveStage[]
  telemetry: string[]
}

export interface LiveProcessStep {
  title: string
  detail: string
  items: string[]
}

export const projects: Project[] = [
  {
    num: '01',
    title: 'City Flow Command',
    kind: 'Agentic AI · ML · Digital Twin',
    summary:
      'An adaptive traffic system for cities like Pune: it retimes signals live, opens emergency corridors for ambulances and fire, and mirrors the whole network in a digital twin you can run scenarios against.',
    stack: [
      'Agentic AI',
      'Time-Series Forecasting',
      'Route Optimization',
      'GIS Analytics',
      'Anomaly Detection',
      'Digital Twin',
    ],
    slug: 'city-flow-command',
    live: {
      domain: 'AI / Intelligent Transportation Systems',
      subtitle: 'Adaptive traffic control, anomaly detection, and emergency-priority routing',
      simulatorLabel: 'CityFlow Command Engine',
      systemMode: 'Traffic Digital Twin',
      note:
        'A live-simulated walkthrough of the traffic intelligence pipeline. It mirrors the project architecture without using production traffic feeds.',
      metrics: [
        { label: 'Vehicles / min', base: 842, jitter: 30 },
        { label: 'Avg delay', base: 38, jitter: 6, suffix: 's', tickMs: 1800 },
        { label: 'Corridors optimized', base: 12, jitter: 2, tickMs: 2200 },
        { label: 'Active anomalies', base: 1, jitter: 1, tickMs: 2600 },
      ],
      telemetry: [
        'GIS graph online',
        'Forecast horizon: 15 min',
        'Priority corridor armed',
        'Signal phase optimizer active',
      ],
      process: [
        {
          title: 'Data Sources',
          detail:
            'Live road telemetry enters from signal controllers, camera counters, GPS traces, weather feeds, event calendars, and the city GIS road graph.',
          items: [
            'Signal controller logs',
            'Camera and loop counts',
            'GPS probe speeds',
            'Weather and event feeds',
            'GIS junction graph',
          ],
        },
        {
          title: 'Ingestion Layer',
          detail:
            'A stream normalizer aligns timestamps, maps each reading to a road segment, removes sensor gaps, and builds the current corridor state.',
          items: [
            'Timestamp alignment',
            'Segment mapping',
            'Sensor health checks',
            'Queue-length estimation',
          ],
        },
        {
          title: 'Processing Engine',
          detail:
            'Forecasting, anomaly detection, and edge-weight updates convert raw traffic conditions into a city-wide prediction layer.',
          items: [
            'Congestion forecast',
            'Anomaly classifier',
            'Dynamic edge weights',
            'Travel-time scoring',
          ],
        },
        {
          title: 'Decision Modules',
          detail:
            'Route optimization, signal retiming, and emergency-priority modules coordinate interventions without breaking neighboring corridors.',
          items: [
            'Route optimizer',
            'Signal timing engine',
            'Emergency corridor planner',
            'Conflict resolver',
          ],
        },
        {
          title: 'Output Surface',
          detail:
            'The digital twin shows recommended signal plans, priority paths, corridor health, and operator-ready advisories.',
          items: ['Operator dashboard', 'Signal plan export', 'Route advisories', 'Incident alerts'],
        },
      ],
      stages: [
        {
          id: 'topology',
          label: 'City Network Topology',
          detail:
            'Ingests the road graph: junctions, arterial corridors, lane counts, turn restrictions, and baseline speed limits.',
          hotEdges: [],
        },
        {
          id: 'ingestion',
          label: 'Traffic Data Ingestion',
          detail:
            'Streams speed, density, queue length, weather, and event context into a live corridor state model.',
          hotEdges: [3, 9],
        },
        {
          id: 'forecast',
          label: 'Traffic Intelligence and Inference',
          detail:
            'Predicts congestion severity per corridor and classifies pressure points before queues spill into neighboring junctions.',
          hotEdges: [3, 9, 14],
        },
        {
          id: 'anomaly',
          label: 'Anomaly Detection',
          detail:
            'Flags sudden speed drops, stalled segments, and sensor gaps that do not match the forecast envelope.',
          hotEdges: [14],
          alert: true,
        },
        {
          id: 'routing',
          label: 'Dynamic Route Optimization',
          detail:
            'Recomputes route choices using current edge weights, forecast congestion, and network-wide travel-time impact.',
          hotEdges: [1, 6, 11],
        },
        {
          id: 'emergency',
          label: 'Emergency Priority Routing',
          detail:
            'Clears a priority corridor for ambulances or fire response by coordinating route choice and conflicting signal phases.',
          hotEdges: [1, 6, 11, 16],
          alert: true,
        },
        {
          id: 'flow',
          label: 'Recommended Flow State',
          detail:
            'Publishes the recommended signal timings and route advisories into the operator-facing digital twin.',
          hotEdges: [],
        },
      ],
    },
  },
  {
    num: '02',
    title: 'QuantCore AI',
    kind: 'Python · Quantitative Backtesting',
    summary:
      'A Python server that pulls equities data from yfinance, runs strategies (RSI, MA crossover) against a given capital and date range, and returns a backtest as both numbers and charts.',
    stack: [
      'Quantitative Backtesting',
      'RSI & MA Crossover',
      'Time-Series Analysis',
      'FastAPI',
      'Pandas',
      'yfinance',
    ],
    slug: 'quantcore-ai',
    live: {
      domain: 'Quant Research / Strategy Simulation',
      subtitle: 'Equities ingestion, technical strategy execution, and risk-aware backtest reporting',
      simulatorLabel: 'QuantCore Backtest Runner',
      systemMode: 'Market Replay',
      note:
        'A live-simulated strategy lab showing how the backtest server moves from market data to trade signals and portfolio metrics.',
      metrics: [
        { label: 'Capital simulated', base: 250000, jitter: 3500, prefix: 'Rs. ', tickMs: 2400 },
        { label: 'Signals scanned', base: 418, jitter: 18 },
        { label: 'Sharpe preview', base: 142, jitter: 8, prefix: '0.', tickMs: 1900 },
        { label: 'Drawdown guard', base: 11, jitter: 2, suffix: '%', tickMs: 2100 },
      ],
      telemetry: [
        'OHLCV cache warm',
        'RSI window: 14',
        'MA crossover armed',
        'Risk report streaming',
      ],
      process: [
        {
          title: 'Data Sources',
          detail:
            'The run starts from a ticker universe, date range, strategy parameters, capital settings, and adjusted market data feeds.',
          items: [
            'Ticker universe',
            'OHLCV price history',
            'Adjusted close data',
            'Date range',
            'Starting capital',
          ],
        },
        {
          title: 'Data Preparation',
          detail:
            'Market candles are session-aligned, missing values are handled, corporate-action adjusted prices are selected, and per-ticker frames are cleaned.',
          items: [
            'Session alignment',
            'Missing-value handling',
            'Adjusted price selection',
            'Ticker frame merge',
          ],
        },
        {
          title: 'Indicator Processing',
          detail:
            'Pandas-based feature pipelines compute RSI, moving averages, returns, volatility windows, trend state, and signal-ready columns.',
          items: ['RSI engine', 'Moving averages', 'Return windows', 'Volatility bands', 'Feature columns'],
        },
        {
          title: 'Backtest Modules',
          detail:
            'Signal generation, portfolio execution, position sizing, cash ledger, and risk analysis replay the strategy across the historical window.',
          items: [
            'Strategy signal engine',
            'Execution ledger',
            'Position sizing',
            'Risk analyzer',
            'Drawdown tracker',
          ],
        },
        {
          title: 'Output Surface',
          detail:
            'The interface receives chart-ready payloads: equity curve, trade log, portfolio metrics, risk tables, and strategy comparison output.',
          items: ['Equity curve', 'Trade log', 'Performance cards', 'Risk table', 'Chart payloads'],
        },
      ],
      stages: [
        {
          id: 'universe',
          label: 'Ticker Universe Selection',
          detail:
            'Accepts the equity universe, date range, starting capital, and strategy configuration for the simulation run.',
          hotEdges: [],
        },
        {
          id: 'market-data',
          label: 'Market Data Ingestion',
          detail:
            'Pulls adjusted OHLCV data, aligns trading sessions, and normalizes missing values before indicators run.',
          hotEdges: [2, 8],
        },
        {
          id: 'indicators',
          label: 'Indicator Engine',
          detail:
            'Computes RSI, moving averages, returns, volatility windows, and signal-ready feature columns per ticker.',
          hotEdges: [2, 8, 13],
        },
        {
          id: 'signals',
          label: 'Strategy Signal Generation',
          detail:
            'Converts indicator thresholds into buy, sell, hold, and exit events while enforcing strategy-specific rules.',
          hotEdges: [5, 10, 15],
          alert: true,
        },
        {
          id: 'execution',
          label: 'Portfolio Execution Ledger',
          detail:
            'Simulates fills, cash balance, position sizing, brokerage assumptions, and mark-to-market portfolio value.',
          hotEdges: [10, 15, 20],
        },
        {
          id: 'risk',
          label: 'Risk and Drawdown Analysis',
          detail:
            'Calculates returns, max drawdown, win rate, volatility, exposure, and capital-at-risk snapshots.',
          hotEdges: [12, 17, 22],
          alert: true,
        },
        {
          id: 'report',
          label: 'Backtest Report Output',
          detail:
            'Returns summary numbers, equity curves, trade logs, and chart-ready payloads to the client interface.',
          hotEdges: [],
        },
      ],
    },
  },
  {
    num: '03',
    title: 'Senate AI',
    kind: 'RAG · Multi-Agent Systems',
    summary:
      'A digital cabinet for early-stage startups. Legal, Finance, Marketing, Hiring, Operations and CEO agents each reason over their own retrieval corpus, then converge on one devised plan.',
    stack: [
      'Multi-Agent Orchestration',
      'RAG Pipelines',
      'Vector Retrieval',
      'LangChain',
      'Agent Consensus',
      'Next.js',
    ],
    slug: 'senate-ai',
    live: {
      domain: 'RAG / Multi-Agent Decision Systems',
      subtitle: 'Specialist startup agents reasoning over retrieval corpora and converging on one plan',
      simulatorLabel: 'Senate AI Deliberation Console',
      systemMode: 'Agent Consensus',
      note:
        'A live-simulated cabinet session showing how separate agents retrieve evidence, debate tradeoffs, and consolidate a startup decision.',
      metrics: [
        { label: 'Agents seated', base: 6, jitter: 1, tickMs: 2600 },
        { label: 'Docs retrieved', base: 128, jitter: 12 },
        { label: 'Consensus score', base: 82, jitter: 4, suffix: '%', tickMs: 1900 },
        { label: 'Open risks', base: 5, jitter: 2, tickMs: 2100 },
      ],
      telemetry: [
        'Legal corpus indexed',
        'Finance memo retrieved',
        'CEO arbiter online',
        'Decision draft forming',
      ],
      process: [
        {
          title: 'Data Sources',
          detail:
            'Founder briefs, policy notes, contracts, budgets, pitch docs, hiring plans, and operating history form the knowledge base.',
          items: ['Founder prompt', 'Legal docs', 'Finance sheets', 'Marketing notes', 'Hiring plans'],
        },
        {
          title: 'Retrieval Layer',
          detail:
            'Documents are chunked, embedded, indexed by department, and retrieved against the current startup question.',
          items: ['Chunking', 'Embeddings', 'Vector retrieval', 'Department routing'],
        },
        {
          title: 'Reasoning Process',
          detail:
            'Specialist agents read evidence, build department-specific arguments, cite constraints, and surface conflicts early.',
          items: ['Legal review', 'Finance model', 'GTM reasoning', 'Ops constraints', 'Hiring analysis'],
        },
        {
          title: 'Consensus Modules',
          detail:
            'A debate layer compares recommendations, ranks tradeoffs, resolves contradictions, and lets the CEO agent synthesize a final position.',
          items: ['Agent debate', 'Evidence scoring', 'Conflict resolver', 'CEO synthesis'],
        },
        {
          title: 'Output Surface',
          detail:
            'The user receives a decision memo with recommended action, risks, owners, timeline, unresolved questions, and next steps.',
          items: ['Decision memo', 'Risk register', 'Owner list', 'Milestones', 'Next actions'],
        },
      ],
      stages: [
        {
          id: 'brief',
          label: 'Founder Brief Intake',
          detail:
            'Captures the startup question, constraints, timeline, and preferred output format before agent routing begins.',
          hotEdges: [],
        },
        {
          id: 'retrieval',
          label: 'Department Corpus Retrieval',
          detail:
            'Routes the brief to Legal, Finance, Marketing, Hiring, Operations, and CEO retrieval stores.',
          hotEdges: [1, 7, 13],
        },
        {
          id: 'legal',
          label: 'Legal and Compliance Review',
          detail:
            'Surfaces entity, contract, IP, data, and compliance considerations that could block the plan later.',
          hotEdges: [1, 6, 11],
          alert: true,
        },
        {
          id: 'finance',
          label: 'Finance and Runway Model',
          detail:
            'Models cost, runway, pricing, hiring capacity, and cash-risk scenarios against the proposed move.',
          hotEdges: [3, 9, 14],
        },
        {
          id: 'market',
          label: 'Go-To-Market Strategy',
          detail:
            'Builds positioning, launch channels, ICP hypotheses, and early conversion assumptions.',
          hotEdges: [4, 10, 15],
        },
        {
          id: 'consensus',
          label: 'Agent Debate and Consensus',
          detail:
            'Agents compare evidence, resolve conflicting recommendations, and vote on a ranked action plan.',
          hotEdges: [8, 13, 18],
          alert: true,
        },
        {
          id: 'plan',
          label: 'CEO-Ready Action Plan',
          detail:
            'Outputs one synthesized decision memo with risks, milestones, owners, and next actions.',
          hotEdges: [],
        },
      ],
    },
  },
  {
    num: '04',
    title: 'CaseEase',
    kind: 'Full-stack · Civic Platform',
    summary:
      'Digitising case filing in India end to end — from lodging an FIR to the courtroom — with every intermediate stage tracked, timestamped and visible to the person waiting on it.',
    stack: [
      'Case Lifecycle Tracking',
      'Full-Stack Architecture',
      'PostgreSQL',
      'Next.js',
      'Node.js',
      'TypeScript',
    ],
    slug: 'caseease',
    live: {
      domain: 'Civic Systems / Case Lifecycle Platform',
      subtitle: 'Digitized filing, status tracking, role handoffs, and transparent case progression',
      simulatorLabel: 'CaseEase Workflow Monitor',
      systemMode: 'Civic Case Pipeline',
      note:
        'A live-simulated civic workflow showing how a case moves from initial filing to courtroom visibility.',
      metrics: [
        { label: 'Cases in flow', base: 74, jitter: 7 },
        { label: 'Avg wait reduced', base: 31, jitter: 4, suffix: '%', tickMs: 1900 },
        { label: 'Stage handoffs', base: 12, jitter: 3, tickMs: 1700 },
        { label: 'SLA alerts', base: 3, jitter: 2, tickMs: 2300 },
      ],
      telemetry: [
        'FIR intake validated',
        'Officer queue synced',
        'Court docket linked',
        'Citizen timeline active',
      ],
      process: [
        {
          title: 'Data Sources',
          detail:
            'Cases begin with FIR details, citizen forms, officer notes, attachments, identity records, station jurisdiction, and court metadata.',
          items: ['FIR details', 'Citizen forms', 'Evidence files', 'Officer notes', 'Court metadata'],
        },
        {
          title: 'Validation Layer',
          detail:
            'The system checks required fields, validates jurisdiction, timestamps every submission, and prepares the case for the correct route.',
          items: ['Field validation', 'Jurisdiction check', 'Document readiness', 'Timestamp capture'],
        },
        {
          title: 'Workflow Processing',
          detail:
            'A lifecycle state machine moves the case through investigation, administration, legal review, docket preparation, and citizen updates.',
          items: ['Case state machine', 'Role handoff', 'Dependency tracking', 'SLA monitoring'],
        },
        {
          title: 'Operational Modules',
          detail:
            'Officer queue, clerk review, docket builder, escalation engine, notification sender, and audit logger keep the process accountable.',
          items: [
            'Officer queue',
            'Clerk review',
            'Docket builder',
            'Escalation alerts',
            'Audit logger',
          ],
        },
        {
          title: 'Output Surface',
          detail:
            'Citizens and staff see status timelines, next actions, hearing readiness, notifications, and transparent audit history.',
          items: [
            'Citizen timeline',
            'Staff dashboard',
            'Hearing docket',
            'Notifications',
            'Audit report',
          ],
        },
      ],
      stages: [
        {
          id: 'intake',
          label: 'Digital FIR and Case Intake',
          detail:
            'Collects case details, complainant information, jurisdiction, attachments, and initial status metadata.',
          hotEdges: [],
        },
        {
          id: 'validation',
          label: 'Validation and Jurisdiction Routing',
          detail:
            'Checks required fields, routes the case to the correct station or court path, and timestamps the transition.',
          hotEdges: [3, 8],
        },
        {
          id: 'investigation',
          label: 'Investigation Stage Tracking',
          detail:
            'Tracks evidence collection, officer updates, notices, and pending dependencies in a citizen-visible timeline.',
          hotEdges: [3, 8, 13],
          alert: true,
        },
        {
          id: 'handoff',
          label: 'Administrative Handoff Control',
          detail:
            'Moves the case between police, clerk, legal, and courtroom roles while preserving responsibility history.',
          hotEdges: [7, 12, 17],
        },
        {
          id: 'docket',
          label: 'Court Docket Preparation',
          detail:
            'Packages case records, hearing metadata, evidence links, and document readiness into the docket queue.',
          hotEdges: [10, 15, 20],
        },
        {
          id: 'visibility',
          label: 'Citizen Status Visibility',
          detail:
            'Publishes clear stage updates, expected next actions, and escalation alerts to the person waiting on the case.',
          hotEdges: [11, 16, 21],
          alert: true,
        },
        {
          id: 'audit',
          label: 'Audit Trail and Reporting',
          detail:
            'Maintains immutable timestamps and role history for accountability, reporting, and process improvement.',
          hotEdges: [],
        },
      ],
    },
  },
  {
    num: '05',
    title: 'Reducing Power Consumption',
    kind: 'Hardware · Sensing',
    summary:
      'A hardware build that meters electricity use and regulates it against room brightness, humidity and temperature. Measured 35–40% less consumption in testing.',
    stack: [
      'Embedded Systems',
      'Sensor Fusion',
      'Threshold Automation',
      'Energy Optimization',
      'Python',
    ],
    slug: 'reducing-power-consumption',
    live: {
      domain: 'Embedded Systems / Energy Automation',
      subtitle: 'Sensor fusion, threshold automation, and room-aware electricity control',
      simulatorLabel: 'Power Reduction Control Loop',
      systemMode: 'Hardware Telemetry',
      note:
        'A live-simulated embedded control panel showing how environmental readings drive power optimization decisions.',
      metrics: [
        { label: 'Power saved', base: 38, jitter: 3, suffix: '%', tickMs: 1800 },
        { label: 'Ambient lux', base: 620, jitter: 45 },
        { label: 'Room temp', base: 27, jitter: 2, suffix: 'C', tickMs: 2100 },
        { label: 'Load state', base: 64, jitter: 8, suffix: '%', tickMs: 2300 },
      ],
      telemetry: [
        'LDR channel stable',
        'Humidity threshold armed',
        'Relay logic calibrated',
        'Energy curve improving',
      ],
      process: [
        {
          title: 'Data Sources',
          detail:
            'The controller reads light, temperature, humidity, occupancy or schedule context, relay state, and energy-meter feedback.',
          items: [
            'LDR brightness',
            'Temperature sensor',
            'Humidity sensor',
            'Occupancy schedule',
            'Energy meter',
          ],
        },
        {
          title: 'Signal Conditioning',
          detail:
            'Raw sensor values are smoothed, calibrated, debounced, and converted into a clean room-state model for safe automation.',
          items: ['Noise smoothing', 'Calibration', 'Debounce logic', 'Room-state model'],
        },
        {
          title: 'Decision Processing',
          detail:
            'Threshold rules and sensor fusion compare comfort needs against consumption targets before a load decision is produced.',
          items: ['Threshold engine', 'Sensor fusion', 'Comfort scoring', 'Consumption target'],
        },
        {
          title: 'Control Modules',
          detail:
            'Relay switching, dimming logic, load protection, and override handling apply decisions safely to the physical room.',
          items: ['Relay driver', 'Dimmer control', 'Load protection', 'Manual override'],
        },
        {
          title: 'Output Surface',
          detail:
            'The dashboard shows live room conditions, control actions, estimated energy saved, and recommended threshold tuning.',
          items: ['Live telemetry', 'Control log', 'Savings estimate', 'Trend chart', 'Threshold advice'],
        },
      ],
      stages: [
        {
          id: 'sensing',
          label: 'Ambient Sensor Capture',
          detail:
            'Reads brightness, humidity, and temperature streams from room sensors before power decisions are made.',
          hotEdges: [],
        },
        {
          id: 'conditioning',
          label: 'Signal Conditioning',
          detail:
            'Smooths noisy sensor readings and normalizes the room state into a control-friendly telemetry model.',
          hotEdges: [2, 7],
        },
        {
          id: 'thresholds',
          label: 'Threshold Rule Engine',
          detail:
            'Compares room conditions against configured brightness, humidity, and temperature thresholds.',
          hotEdges: [2, 7, 12],
          alert: true,
        },
        {
          id: 'load',
          label: 'Load Regulation Decision',
          detail:
            'Decides whether to dim, switch, or hold electrical loads based on comfort and consumption constraints.',
          hotEdges: [6, 11, 16],
        },
        {
          id: 'actuation',
          label: 'Actuator and Relay Control',
          detail:
            'Applies safe switching instructions through the control hardware while preserving isolation boundaries.',
          hotEdges: [11, 16, 21],
          alert: true,
        },
        {
          id: 'measurement',
          label: 'Energy Delta Measurement',
          detail:
            'Compares baseline and optimized power draw to estimate the measured reduction in consumption.',
          hotEdges: [13, 18, 23],
        },
        {
          id: 'reporting',
          label: 'Optimization Report',
          detail:
            'Summarizes consumption saved, room-condition trends, and the next recommended threshold adjustment.',
          hotEdges: [],
        },
      ],
    },
  },
]
