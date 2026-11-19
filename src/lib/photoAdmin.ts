import { upload } from '@vercel/blob/client'

// Upload-page helpers, kept apart so the gallery doesn't load the Blob client

interface Resized {
  blob: Blob
  width: number
  height: number
}

// Draws the image onto a canvas at most `maxEdge` px on its long side and
// re-encodes it as JPEG. Re-encoding also drops EXIF data such as GPS.
async function resize(bitmap: ImageBitmap, maxEdge: number, quality: number): Promise<Resized> {
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported')
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, width, height)
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
  if (!blob) throw new Error('Could not encode image')
  return { blob, width, height }
}

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8).padEnd(6, '0')}`

export async function publishPhoto(
  file: File,
  details: { title: string; caption: string },
  password: string,
  onStep: (step: string) => void,
): Promise<void> {
  onStep('Resizing')
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error("This browser can't read that file. Try a JPEG or PNG (HEIC works in Safari).")
  }
  const full = await resize(bitmap, 2400, 0.86)
  const thumb = await resize(bitmap, 900, 0.8)
  bitmap.close()

  const id = newId()
  onStep('Uploading')
  const opts = { access: 'public' as const, handleUploadUrl: '/api/upload', clientPayload: password, contentType: 'image/jpeg' }
  await Promise.all([
    upload(`photos/${id}/full.jpg`, full.blob, opts),
    upload(`photos/${id}/thumb.jpg`, thumb.blob, opts),
  ])

  onStep('Publishing')
  await saveDetails(id, { ...details, width: full.width, height: full.height }, password)
}

export async function saveDetails(
  id: string,
  details: { title?: string; caption?: string; width: number; height: number; createdAt?: string },
  password: string,
): Promise<void> {
  const res = await fetch('/api/photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify({ id, ...details }),
  })
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? 'Could not save details')
}

export async function deletePhoto(id: string, password: string): Promise<void> {
  const res = await fetch(`/api/photos?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { 'x-admin-password': password },
  })
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? 'Could not delete')
}

export async function checkPassword(password: string): Promise<boolean> {
  // An empty save with a malformed id returns 401 for a wrong password and
  // 400 for a right one, without writing anything.
  const res = await fetch('/api/photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
    body: JSON.stringify({ id: 'check' }),
  })
  return res.status !== 401
}
