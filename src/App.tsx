import './App.css'
import ThemeToggle from './components/ThemeToggle'
import { intro, experience, earlier, projects, posts, education, email, links } from './data'

const isExternal = (href: string) => /^https?:/.test(href)
const externalProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

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
            <a href="#projects">Projects</a>
            {posts.length > 0 && <a href="#writing">Writing</a>}
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <section className="intro">
          <h1 className="lede">
            I build machine learning systems that lawyers actually use, at{' '}
            <a href="https://www.lw.com" {...externalProps('https://www.lw.com')}>Latham &amp; Watkins</a>.
            Before that I built on-prem LLM tooling at BAE Systems, and interned at Western Digital,
            NASA JPL and General Atomics.
          </h1>
          <p className="muted">
            Mostly thinking about where AI fits into real professional workflows, how to keep it
            honest and cheap, and where it doesn't belong at all.
          </p>
        </section>

        <section id="work" className="block" aria-labelledby="work-h">
          <h2 id="work-h" className="label">Work</h2>
          <ul className="rules">
            {experience.map((r) => (
              <li key={r.company} className="rule-row dated">
                <span className="date">{r.period}</span>
                <div className="role">
                  <p>
                    <a href={r.url} {...externalProps(r.url)}>{r.company}</a>
                    <span className="muted"> · {r.title}</span>
                  </p>
                  {r.highlights && (
                    <ul className="highlights">
                      {r.highlights.map((h) => <li key={h}>{h}</li>)}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="earlier muted">
            Earlier: internships at{' '}
            {earlier.map((e, i) => (
              <span key={e.name}>
                {i > 0 && ' and '}
                <a href={e.url} {...externalProps(e.url)}>{e.name}</a>
              </span>
            ))}
            .
          </p>
        </section>

        <section id="projects" className="block" aria-labelledby="projects-h">
          <h2 id="projects-h" className="label">Projects</h2>
          <ul className="stack">
            {projects.map((p) => (
              <li key={p.name}>
                <p className="project-head">
                  {p.url ? <a href={p.url} {...externalProps(p.url)}>{p.name}</a> : <span>{p.name}</span>}
                  {p.year && <span className="date">{p.year}</span>}
                </p>
                <p className="muted">{p.summary}</p>
                {p.stack && <p className="stack-line">{p.stack}</p>}
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
              <li key={e.school} className="spread">
                <span>{e.degree}, {e.school}</span>
                {e.period && <span className="date">{e.period}</span>}
              </li>
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
