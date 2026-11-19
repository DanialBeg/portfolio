import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './Photos.css'
import ThemeToggle from '../components/ThemeToggle'
import { fetchPhotos, type Photo } from '../lib/photos'

function Photos() {
  const [photos, setPhotos] = useState<Photo[] | null>(null)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Photographs · Danial Beg'
    fetchPhotos()
      .then(setPhotos)
      .catch(() => setError(true))
    return () => {
      document.title = 'Danial Beg'
    }
  }, [])

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null || !photos ? i : (i + dir + photos.length) % photos.length)),
    [photos],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const current = open !== null && photos ? photos[open] : null

  return (
    <div className="gallery-page">
      <header className="top gallery-top">
        <Link to="/" className="back">← Danial Beg</Link>
        <ThemeToggle />
      </header>

      <div className="gallery-intro">
        <h1 className="lede">Photographs</h1>
        <p className="muted">Pictures I've taken and like enough to share.</p>
      </div>

      {error && <p className="muted gallery-state">Photos couldn't load right now. Try again in a moment.</p>}
      {!error && photos === null && <p className="muted gallery-state">Loading…</p>}
      {photos && photos.length === 0 && <p className="muted gallery-state">Nothing here yet.</p>}

      {photos && photos.length > 0 && (
        <ul className="grid">
          {photos.map((p, i) => (
            <li key={p.id}>
              <button type="button" className="tile" onClick={() => setOpen(i)} aria-label={`Open ${p.title || 'photo'}`}>
                <img
                  src={p.thumb}
                  alt={p.title || ''}
                  width={p.width}
                  height={p.height}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </button>
              {p.title && <p className="tile-title">{p.title}</p>}
            </li>
          ))}
        </ul>
      )}

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.title || 'Photo'} onClick={close}>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={current.full} alt={current.title || ''} width={current.width} height={current.height} />
            {(current.title || current.caption) && (
              <figcaption>
                {current.title && <span className="lb-title">{current.title}</span>}
                {current.caption && <span className="lb-caption">{current.caption}</span>}
              </figcaption>
            )}
          </figure>
          <div className="lightbox-controls" onClick={(e) => e.stopPropagation()}>
            {photos && photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo">←</button>
                <span className="lb-count">{(open ?? 0) + 1} / {photos.length}</span>
                <button type="button" onClick={() => step(1)} aria-label="Next photo">→</button>
              </>
            )}
            <button type="button" onClick={close} aria-label="Close">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Photos
