// Site content lives here so it can be edited without touching layout code.
// Optional fields only appear once they are filled in.

export interface Role {
  company: string
  url: string
  title: string
  period?: string
  location?: string
  highlights?: string[]
}

export interface Project {
  name: string
  url?: string
  year?: string
  summary: string
  stack?: string
}

export interface Post {
  title: string
  url: string
  date: string
}

export interface School {
  school: string
  degree: string
  period?: string
}

export const intro = {
  name: 'Danial Beg',
  role: 'ML engineer · Los Angeles',
}

export const experience: Role[] = [
  {
    company: 'Latham & Watkins',
    url: 'https://www.lw.com',
    title: 'Machine Learning Engineer',
    period: '2024–now',
    location: 'Los Angeles',
    highlights: [
      'Lead architect of an M&A document-review platform: 15 tools that turn acquisition agreements, mark-ups and disclosure schedules into structured findings and a Word deliverable, for about $0.18 a review.',
      'Built a legal research platform for U.S. privacy law, with hybrid BM25 and vector retrieval and citation-grounded memo guidance.',
      'Co-led an agentic search assistant over firm data, cutting tool-call latency by 45%, and built the evaluation harness that gates it in CI.',
    ],
  },
  {
    company: 'BAE Systems',
    url: 'https://www.baesystems.com',
    title: 'Software Engineer II',
    period: '2022–2024',
    location: 'San Diego',
    highlights: [
      'Built an on-prem LLM platform for 200+ users in security-sensitive environments, with RAG over internal policy documents.',
      'Set up MLOps and CI/CD pipelines that took deployments from days to hours.',
    ],
  },
  {
    company: 'Western Digital',
    url: 'https://www.westerndigital.com',
    title: 'Software Engineer Intern',
    period: '2021',
    location: 'Milpitas',
    highlights: [
      'Built a manufacturing analytics platform and a tool-fault detector (95% accuracy) for anomaly triage.',
    ],
  },
]

// Shown as a single line under the work list
export const earlier = [
  { name: 'NASA JPL', url: 'https://www.jpl.nasa.gov' },
  { name: 'General Atomics', url: 'https://www.ga.com' },
]

export const projects: Project[] = [
  {
    name: 'Agent Ledger',
    year: '2025–now',
    summary:
      'An open-source reverse proxy between AI agents and LLM APIs that tracks cost, enforces budgets and catches runaway agents, across 15 providers with under 1 ms of overhead.',
    stack: 'Go, PostgreSQL, OpenTelemetry',
  },
  {
    name: 'Car Modifications AI',
    year: '2025',
    summary:
      'Four specialised MCP servers over a RAG pipeline, with routing that only calls the servers a question needs. Cut API costs by about 40%.',
    stack: 'Python, FastAPI, ChromaDB',
  },
  {
    name: 'Notes to Anki',
    url: '/notes-to-anki',
    summary: 'Converts PDF notes into Anki flashcards in two clicks.',
  },
  {
    name: 'Pomodoro Buddy',
    url: 'https://github.com/DanialBeg/pomodoro-buddy',
    summary: 'A Pomodoro study timer that lives in the Mac menu bar.',
  },
  {
    name: 'A-Fib detection',
    url: 'https://github.com/DanialBeg/AFib-Detection-Survey',
    summary: 'Comparing ML models for spotting atrial fibrillation in ECG waveforms.',
  },
]

// Add posts here and a Writing section appears on the home page.
export const posts: Post[] = []

export const education: School[] = [
  { school: 'UC Irvine', degree: 'M.S. Computer Science', period: '2023' },
  { school: 'UC Riverside', degree: 'B.S. Computer Science, magna cum laude', period: '2021' },
]

export const email = 'contact@danialbeg.com'

export const links = [
  { label: 'GitHub', href: 'https://github.com/danialbeg' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/danialbeg' },
  { label: 'X', href: 'https://x.com/danialbeg' },
]
