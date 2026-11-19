import './App.css'
import ThemeToggle from './components/ThemeToggle'
import { intro, experience, projects, posts, education, email, links } from './data'

const isExternal = (href: string) => /^https?:/.test(href)
const externalProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

const hasDates = experience.some((r) => r.period)

function App() {
  return (
    <div className="page">
      <header className="top">
        <div className="identity">
          <img src="/profile.jpg" alt="" className="avatar" width={40} height={40} />
          <div>
            <p className="name">{intro.name}</p>
            <p className="muted">{intro.role}</p>
          </div>
        </div>
        <div className="top-right">
          <nav className="nav" aria-label="Sections">
            <a href="#work">Work</a>
            {posts.length > 0 && <a href="#writing">Writing</a>}
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="intro">
          <h1 className="lede">
            I build machine learning tools that lawyers actually use, at{' '}
            <a href="https://www.lw.com" {...externalProps('https://www.lw.com')}>Latham &amp; Watkins</a>.
            Before that I wrote software at BAE Systems, and interned at NASA JPL, Western Digital and
            General Atomics.
          </h1>
          <p className="muted">
            Mostly thinking about where AI fits into real professional workflows, and where it doesn't.
          </p>
        </section>

        <section id="work" className="block" aria-labelledby="work-h">
          <h2 id="work-h" className="label">Work</h2>
          <ul className={`rules ${hasDates ? 'with-dates' : ''}`}>
            {experience.map((r) => (
              <li key={r.company} className="rule-row">
                {hasDates && <span className="date">{r.period}</span>}
                <span>
                  <a href={r.url} {...externalProps(r.url)}>{r.shortName ?? r.company}</a>
                  <span className="muted"> · {r.title}</span>
                  {r.summary && <span className="summary muted">{r.summary}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="block" aria-labelledby="projects-h">
          <h2 id="projects-h" className="label">Projects</h2>
          <ul className="stack">
            {projects.map((p) => (
              <li key={p.name}>
                <a href={p.url} {...externalProps(p.url)}>{p.name}</a>
                <p className="muted">{p.summary}</p>
              </li>
            ))}
          </ul>
        </section>

        {posts.length > 0 && (
          <section id="writing" className="block" aria-labelledby="writing-h">
            <h2 id="writing-h" className="label">Writing</h2>
            <ul className="rules">
              {posts.map((p) => (
                <li key={p.url} className="rule-row spread">
                  <a href={p.url} {...externalProps(p.url)}>{p.title}</a>
                  <span className="date">{p.date}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="block" aria-labelledby="edu-h">
          <h2 id="edu-h" className="label">Education</h2>
          <ul className="plain">
            {education.map((e) => (
              <li key={e.school}>{e.degree}, {e.school}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contact" className="foot">
        <p className="sayhi">
          Say hi at <a href={`mailto:${email}`}>{email}</a>
        </p>
        <ul className="links">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...externalProps(l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  )
}

export default App
