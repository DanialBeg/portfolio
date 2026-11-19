import './App.css'
import ThemeToggle from './components/ThemeToggle'
import { intro, experience, projects, education, links } from './data'

const isExternal = (href: string) => /^https?:/.test(href)
const externalProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

const pad = (n: number) => String(n).padStart(2, '0')

const Arrow = () => (
  <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

function App() {
  const email = links.find((l) => l.href.startsWith('mailto:'))
  const social = links.filter((l) => !l.href.startsWith('mailto:'))

  return (
    <div className="shell">
      <aside className="side">
        <div className="side-inner">
          <div className="side-top">
            <img src="/profile.jpeg" alt="Danial Beg" className="portrait" width={56} height={56} />
            <ThemeToggle />
          </div>

          <h1 className="display">
            Danial
            <br />
            Beg
          </h1>
          <p className="kicker">{intro.role} at Latham &amp; Watkins</p>
          <p className="bio">{intro.blurb}</p>

          <nav className="toc" aria-label="Sections">
            <a href="#work"><span>01</span>Work</a>
            <a href="#projects"><span>02</span>Projects</a>
            <a href="#education"><span>03</span>Education</a>
            <a href="#contact"><span>04</span>Contact</a>
          </nav>

          <ul className="social">
            {social.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...externalProps(l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="content">
        <section id="work" className="part">
          <header className="part-head">
            <h2>Work</h2>
            <span className="count">{pad(experience.length)}</span>
          </header>
          <ol className="entries">
            {experience.map((r, i) => (
              <li key={r.company} className="entry">
                <a className="entry-link" href={r.url} {...externalProps(r.url)}>
                  <span className="entry-index">{pad(i + 1)}</span>
                  <span className="entry-body">
                    <span className="entry-title">
                      {r.company}
                      <Arrow />
                    </span>
                    <span className="entry-sub">
                      {r.title}
                      {r.location ? ` — ${r.location}` : ''}
                    </span>
                    {r.summary && <span className="entry-text">{r.summary}</span>}
                  </span>
                  <span className="entry-meta">
                    {r.period ?? (i === 0 ? <span className="now">Now</span> : '')}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="projects" className="part">
          <header className="part-head">
            <h2>Projects</h2>
            <span className="count">{pad(projects.length)}</span>
          </header>
          <ol className="entries">
            {projects.map((p, i) => (
              <li key={p.name} className="entry">
                <a className="entry-link" href={p.url} {...externalProps(p.url)}>
                  <span className="entry-index">{pad(i + 1)}</span>
                  <span className="entry-body">
                    <span className="entry-title">
                      {p.name}
                      <Arrow />
                    </span>
                    <span className="entry-text">{p.summary}</span>
                  </span>
                  <span className="entry-meta" />
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="education" className="part">
          <header className="part-head">
            <h2>Education</h2>
            <span className="count">{pad(education.length)}</span>
          </header>
          <ol className="entries">
            {education.map((e, i) => (
              <li key={e.school} className="entry">
                <div className="entry-link static">
                  <span className="entry-index">{pad(i + 1)}</span>
                  <span className="entry-body">
                    <span className="entry-title">{e.school}</span>
                    <span className="entry-sub">{e.degree}</span>
                  </span>
                  <span className="entry-meta">{e.period}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="part contact">
          <p className="contact-lead">Have something in mind? Say hello.</p>
          {email && (
            <a className="contact-mail" href={email.href}>
              {email.href.replace('mailto:', '')}
            </a>
          )}
          <footer className="colophon">
            <span>© {new Date().getFullYear()} Danial Beg</span>
            <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              Back to top ↑
            </a>
          </footer>
        </section>
      </main>
    </div>
  )
}

export default App
