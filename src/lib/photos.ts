export interface Photo {
  id: string
  full: string
  thumb: string
  title?: string
  caption?: string
  width: number
  height: number
  createdAt: string
}

export async function fetchPhotos(fresh = false): Promise<Photo[]> {
  const res = await fetch(fresh ? `/api/photos?t=${Date.now()}` : '/api/photos')
  if (!res.ok) throw new Error('Could not load photos')
  return res.json()
}
