// Site content lives here so it can be edited without touching layout code.
// `period` is shown on the right of each entry; leave it empty to hide it.

export interface Role {
  company: string
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

export interface School {
  school: string
  degree: string
  period?: string
}

export const intro = {
  name: 'Danial Beg',
  role: 'Machine learning engineer',
  blurb:
    'I build full-stack machine learning applications for the legal world at Latham & Watkins. Most of what I think about is how AI actually fits into the day-to-day work of professionals.',
}

export const experience: Role[] = [
  {
    company: 'Latham & Watkins',
    url: 'https://www.lw.com',
    title: 'Machine Learning Engineer',
    summary: 'Full-stack ML applications for legal workflows.',
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
    summary: 'A focus timer app built around the Pomodoro Technique.',
  },
  {
    name: 'A-Fib Detection',
    url: 'https://github.com/DanialBeg/AFib-Detection-Survey',
    summary: 'A study comparing ML models for detecting atrial fibrillation from ECG waveforms.',
  },
]

export const education: School[] = [
  { school: 'University of California, Irvine', degree: 'M.S. Computer Science' },
  { school: 'University of California, Riverside', degree: 'B.S. Computer Science' },
]

export const links = [
  { label: 'Email', href: 'mailto:contact@danialbeg.com' },
  { label: 'GitHub', href: 'https://github.com/danialbeg' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/danialbeg' },
  { label: 'X', href: 'https://x.com/danialbeg' },
]
