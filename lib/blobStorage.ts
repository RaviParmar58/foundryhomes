import { del } from '@vercel/blob'
import path from 'path'
import { unlink } from 'fs/promises'

export const isVercelBlobUrl = (val: string): boolean =>
  /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//.test(val)

// Local-dev uploads written by /api/upload when no blob store is configured.
const LOCAL_UPLOAD_PREFIX = '/assets/uploads/'

const isLocalUploadUrl = (val: string): boolean => val.startsWith(LOCAL_UPLOAD_PREFIX)

// Best-effort cleanup: only deletes files we actually manage (Vercel Blob
// uploads, or local-dev files under /assets/uploads), never other static
// /assets paths. Failures are logged, not thrown - losing an orphaned file
// is far less bad than failing the post save/delete.
export async function deleteBlobIfManaged(url: string | null | undefined): Promise<void> {
  if (!url) return

  if (isVercelBlobUrl(url)) {
    try {
      await del(url)
    } catch (err) {
      console.error('Failed to delete blob', url, err)
    }
    return
  }

  if (isLocalUploadUrl(url)) {
    // basename() strips any traversal segments so we can only ever unlink
    // files directly inside public/assets/uploads.
    const filename = path.basename(url)
    const filePath = path.join(process.cwd(), 'public', 'assets', 'uploads', filename)
    try {
      await unlink(filePath)
    } catch {
      // File already gone (or never existed on this machine) - fine.
    }
  }
}
