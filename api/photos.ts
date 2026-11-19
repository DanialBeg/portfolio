import { del, list, put } from '@vercel/blob'
import { ID_PATTERN, isAdmin } from './_auth.js'

// Storage layout in Vercel Blob, one folder per photo:
//   photos/<id>/full.jpg    large version for the lightbox
//   photos/<id>/thumb.jpg   small version for the grid
//   photos/<id>/meta.json   title, caption and pixel sizes
// A photo only appears once its meta.json exists.

interface Meta {
  title?: string
  caption?: string
  width: number
  height: number
  createdAt: string
}

export interface Photo extends Meta {
  id: string
  full: string
  thumb: string
}

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

async function allBlobs() {
  const blobs = []
  let cursor: string | undefined
  do {
    const page = await list({ prefix: 'photos/', limit: 1000, cursor })
    blobs.push(...page.blobs)
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)
  return blobs
}

export async function GET(): Promise<Response> {
  try {
    const folders = new Map<string, { full?: string; thumb?: string; meta?: string }>()
    for (const b of await allBlobs()) {
      const [, id, file] = b.pathname.split('/')
      if (!id || !file) continue
      const entry = folders.get(id) ?? {}
      if (file === 'full.jpg') entry.full = b.url
      if (file === 'thumb.jpg') entry.thumb = b.url
      if (file === 'meta.json') entry.meta = b.url
      folders.set(id, entry)
    }

    const photos = await Promise.all(
      [...folders.entries()]
        .filter(([, f]) => f.full && f.thumb && f.meta)
        .map(async ([id, f]) => {
          const res = await fetch(f.meta!, { cache: 'no-store' })
          if (!res.ok) return null
          const meta = (await res.json()) as Meta
          return { id, full: f.full!, thumb: f.thumb!, ...meta } satisfies Photo
        }),
    )

    const sorted = photos
      .filter((p): p is Photo => p !== null)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return Response.json(sorted, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=300' },
    })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Could not load photos' }, { status: 500 })
  }
}

// Saves (or replaces) a photo's title/caption once its images are uploaded
export async function POST(request: Request): Promise<Response> {
  if (!isAdmin(request.headers.get('x-admin-password'))) {
    return Response.json({ error: 'Wrong password' }, { status: 401 })
  }
  const body = (await request.json()) as Record<string, unknown>
  const id = clean(body.id, 40)
  const width = Number(body.width)
  const height = Number(body.height)
  if (!ID_PATTERN.test(id) || !(width > 0) || !(height > 0)) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  const meta: Meta = {
    title: clean(body.title, 120) || undefined,
    caption: clean(body.caption, 600) || undefined,
    width: Math.round(width),
    height: Math.round(height),
    createdAt: clean(body.createdAt, 40) || new Date().toISOString(),
  }

  await put(`photos/${id}/meta.json`, JSON.stringify(meta), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  })
  return Response.json({ ok: true })
}

// Removes every file in a photo's folder
export async function DELETE(request: Request): Promise<Response> {
  if (!isAdmin(request.headers.get('x-admin-password'))) {
    return Response.json({ error: 'Wrong password' }, { status: 401 })
  }
  const id = new URL(request.url).searchParams.get('id') ?? ''
  if (!ID_PATTERN.test(id)) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }
  const { blobs } = await list({ prefix: `photos/${id}/` })
  if (blobs.length) await del(blobs.map((b) => b.url))
  return Response.json({ ok: true })
}
