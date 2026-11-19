import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { isAdmin } from './_auth.js'

// Issues short-lived tokens so the browser can upload resized photos
// straight to Vercel Blob. Only the admin password unlocks a token, and
// only for photos/<id>/full.jpg or photos/<id>/thumb.jpg.
const PATH_PATTERN = /^photos\/[0-9]{10,16}-[a-z0-9]{4,12}\/(full|thumb)\.jpg$/

export async function POST(request: Request): Promise<Response> {
  const body = (await request.json()) as HandleUploadBody

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!isAdmin(clientPayload)) throw new Error('Wrong password')
        if (!PATH_PATTERN.test(pathname)) throw new Error('Unexpected file path')
        return {
          allowedContentTypes: ['image/jpeg'],
          maximumSizeInBytes: 15 * 1024 * 1024,
          addRandomSuffix: false,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        }
      },
    })
    return Response.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    return Response.json({ error: message }, { status: 400 })
  }
}
