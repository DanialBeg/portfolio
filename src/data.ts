// Site content lives here so it can be edited without touching layout code.
// Optional fields (period, location, summary) only appear once they are filled in.

export interface Role {
  company: string
  shortName?: string
  url: string
  title: string
  period?: string
  location?: string
  summary?: string
}

export interface Project {
  name: string
  url: string
  summary: string
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
  role: 'Machine learning engineer',
}

export const experience: Role[] = [
  {
    company: 'Latham & Watkins',
    url: 'https://www.lw.com',
    title: 'ML Engineer',
  },
  {
    company: 'BAE Systems',
    url: 'https://www.baesystems.com',
    title: 'Software Engineer',
  },
  {
    company: 'Western Digital',
    url: 'https://www.westerndigital.com',
    title: 'Intern',
  },
  {
    company: 'NASA Jet Propulsion Laboratory',
    shortName: 'NASA JPL',
    url: 'https://www.jpl.nasa.gov',
    title: 'Intern',
  },
  {
    company: 'General Atomics',
    url: 'https://www.ga.com',
    title: 'Intern',
  },
]

export const projects: Project[] = [
  {
    name: 'Notes to Anki',
    url: '/notes-to-anki',
    summary: 'Turns study notes into Anki flashcards.',
  },
  {
    name: 'Pomodoro Buddy',
    url: '/pomodoro-buddy-support',
    summary: 'A focus timer built around the Pomodoro Technique.',
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
  { school: 'UC Irvine', degree: 'M.S. Computer Science' },
  { school: 'UC Riverside', degree: 'B.S. Computer Science' },
]

export const email = 'contact@danialbeg.com'

export const links = [
  { label: 'GitHub', href: 'https://github.com/danialbeg' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/danialbeg' },
  { label: 'X', href: 'https://x.com/danialbeg' },
]
