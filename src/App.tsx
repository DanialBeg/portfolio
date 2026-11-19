import './App.css'
import ThemeToggle from './components/ThemeToggle'
import { intro, experience, projects, education, links } from './data'

const isExternal = (href: string) => /^https?:/.test(href)
const externalProps = (href: string) =>
  isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}

function App() {
  return (
    <div className="page">
      <header className="top">
        <div className="identity">
          <img src="/profile.jpeg" alt="" className="avatar" width={44} height={44} />
          <div>
            <h1 className="name">{intro.name}</h1>
            <p className="role">{intro.role}</p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      <main>
        <p className="blurb">{intro.blurb}</p>

        <section className="block" aria-labelledby="experience">
          <h2 id="experience" className="label">Experience</h2>
          <ol className="list">
            {experience.map((r) => (
              <li key={r.company} className="row">
                <div className="row-main">
                  <p className="row-title">
                    <a href={r.url} {...externalProps(r.url)}>{r.company}</a>
                  </p>
                  <p className="row-sub">{r.title}{r.location ? ` · ${r.location}` : ''}</p>
                  {r.summary && <p className="row-text">{r.summary}</p>}
                </div>
                {r.period && <p className="row-meta">{r.period}</p>}
              </li>
            ))}
          </ol>
        </section>

        <section className="block" aria-labelledby="projects">
          <h2 id="projects" className="label">Projects</h2>
          <ul className="list">
            {projects.map((p) => (
              <li key={p.name} className="row">
                <div className="row-main">
                  <p className="row-title">
                    <a href={p.url} {...externalProps(p.url)}>{p.name}</a>
                  </p>
                  <p className="row-text">{p.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="education">
          <h2 id="education" className="label">Education</h2>
          <ul className="list">
            {education.map((e) => (
              <li key={e.school} className="row">
                <div className="row-main">
                  <p className="row-title">{e.school}</p>
                  <p className="row-sub">{e.degree}</p>
                </div>
                {e.period && <p className="row-meta">{e.period}</p>}
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="elsewhere">
          <h2 id="elsewhere" className="label">Elsewhere</h2>
          <ul className="links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} {...externalProps(l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} Danial Beg</footer>
    </div>
  )
}

export default App
