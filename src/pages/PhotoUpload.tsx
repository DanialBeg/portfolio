import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import './Photos.css'
import { fetchPhotos, type Photo } from '../lib/photos'
import { checkPassword, deletePhoto, publishPhoto } from '../lib/photoAdmin'

const KEY = 'photo-admin-password'

interface Pending {
  key: string
  file: File
  preview: string
  title: string
  caption: string
  status: string
  error?: string
  done?: boolean
}

const readSaved = () => {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

function PhotoUpload() {
  const [password, setPassword] = useState(readSaved)
  const [unlocked, setUnlocked] = useState(false)
  const [checking, setChecking] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [pending, setPending] = useState<Pending[]>([])
  const [busy, setBusy] = useState(false)
  const [existing, setExisting] = useState<Photo[]>([])

  useEffect(() => {
    document.title = 'Upload photos'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex'
    document.head.appendChild(meta)
    return () => {
      meta.remove()
      document.title = 'Danial Beg'
    }
  }, [])

  const refresh = () => fetchPhotos(true).then(setExisting).catch(() => {})

  const unlock = async (pw: string) => {
    setChecking(true)
    setLoginError('')
    try {
      if (await checkPassword(pw)) {
        try { localStorage.setItem(KEY, pw) } catch { /* private mode */ }
        setUnlocked(true)
        refresh()
      } else {
        setLoginError('That password is wrong.')
      }
    } catch {
      setLoginError("Couldn't reach the server.")
    } finally {
      setChecking(false)
    }
  }

  // Try a saved password once on load
  useEffect(() => {
    const saved = readSaved()
    if (saved) unlock(saved)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const next = [...files]
      .filter((f) => f.type.startsWith('image/') || /\.(heic|heif)$/i.test(f.name))
      .map((file) => ({
        key: `${file.name}-${file.size}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        title: '',
        caption: '',
        status: 'Ready',
      }))
    setPending((p) => [...p, ...next])
  }

  const update = (key: string, patch: Partial<Pending>) =>
    setPending((list) => list.map((p) => (p.key === key ? { ...p, ...patch } : p)))

  const remove = (key: string) =>
    setPending((list) => {
      const item = list.find((p) => p.key === key)
      if (item) URL.revokeObjectURL(item.preview)
      return list.filter((p) => p.key !== key)
    })

  const publishAll = async () => {
    setBusy(true)
    for (const item of pending.filter((p) => !p.done)) {
      try {
        update(item.key, { error: undefined })
        await publishPhoto(item.file, { title: item.title, caption: item.caption }, password, (s) =>
          update(item.key, { status: s }),
        )
        update(item.key, { status: 'Live', done: true })
      } catch (err) {
        update(item.key, { status: 'Failed', error: err instanceof Error ? err.message : 'Upload failed' })
      }
    }
    setBusy(false)
    refresh()
    setPending((list) => list.filter((p) => !p.done))
  }

  const removeExisting = async (photo: Photo) => {
    if (!window.confirm(`Delete ${photo.title || 'this photo'} from the site?`)) return
    try {
      await deletePhoto(photo.id, password)
      setExisting((list) => list.filter((p) => p.id !== photo.id))
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Could not delete')
    }
  }

  const signOut = () => {
    try { localStorage.removeItem(KEY) } catch { /* ignore */ }
    setPassword('')
    setUnlocked(false)
  }

  if (!unlocked) {
    return (
      <div className="gallery-page admin narrow">
        <h1 className="lede">Upload photos</h1>
        <form
          className="login"
          onSubmit={(e) => {
            e.preventDefault()
            unlock(password)
          }}
        >
          <label htmlFor="pw">Password</label>
          <input
            id="pw"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn" disabled={!password || checking}>
            {checking ? 'Checking…' : 'Unlock'}
          </button>
          {loginError && <p className="form-error">{loginError}</p>}
        </form>
      </div>
    )
  }

  const toPublish = pending.filter((p) => !p.done).length

  return (
    <div className="gallery-page admin">
      <header className="top gallery-top">
        <Link to="/photos" className="back">View gallery →</Link>
        <button type="button" className="link-btn" onClick={signOut}>Sign out</button>
      </header>

      <h1 className="lede">Upload photos</h1>

      <label className="dropzone">
        <input type="file" accept="image/*" multiple onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
        <span className="dropzone-title">Choose photos</span>
        <span className="muted">They're resized and stripped of location data before upload.</span>
      </label>

      {pending.length > 0 && (
        <>
          <ul className="pending">
            {pending.map((p) => (
              <li key={p.key} className="pending-row">
                <img src={p.preview} alt="" />
                <div className="pending-fields">
                  <input
                    aria-label="Title"
                    placeholder="Title (optional)"
                    value={p.title}
                    disabled={busy}
                    onChange={(e) => update(p.key, { title: e.target.value })}
                  />
                  <textarea
                    aria-label="Caption"
                    placeholder="Caption, place, camera… (optional)"
                    rows={2}
                    value={p.caption}
                    disabled={busy}
                    onChange={(e) => update(p.key, { caption: e.target.value })}
                  />
                  <p className={`pending-status ${p.error ? 'form-error' : 'muted'}`}>
                    {p.error ? `${p.status}: ${p.error}` : p.status}
                  </p>
                </div>
                <button type="button" className="link-btn" disabled={busy} onClick={() => remove(p.key)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn publish" disabled={busy || toPublish === 0} onClick={publishAll}>
            {busy ? 'Publishing…' : `Publish ${toPublish} photo${toPublish === 1 ? '' : 's'}`}
          </button>
        </>
      )}

      <section className="block existing">
        <h2 className="label">On the site ({existing.length})</h2>
        {existing.length === 0 ? (
          <p className="muted">Nothing published yet.</p>
        ) : (
          <ul className="existing-grid">
            {existing.map((p) => (
              <li key={p.id}>
                <img src={p.thumb} alt={p.title || ''} loading="lazy" />
                <span className="existing-title">{p.title || 'Untitled'}</span>
                <button type="button" className="link-btn danger" onClick={() => removeExisting(p)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default PhotoUpload
