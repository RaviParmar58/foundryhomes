import { NextRequest } from 'next/server'
import { processAndStoreImage, ImageValidationError, MAX_IMAGE_SIZE } from '@/lib/storeImage'

export const runtime = 'nodejs'

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(request: NextRequest) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return Response.json({ error: 'Unsupported file type. Use JPEG, PNG, WEBP, or GIF.' }, { status: 400 })
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return Response.json({ error: 'File too large (max 5MB).' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const url = await processAndStoreImage(buffer)
    return Response.json({ url }, { status: 201 })
  } catch (err) {
    if (err instanceof ImageValidationError) {
      return Response.json({ error: err.message }, { status: 400 })
    }
    console.error('Failed to upload file', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
