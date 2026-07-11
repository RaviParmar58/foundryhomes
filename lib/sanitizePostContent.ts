import sanitizeHtml from 'sanitize-html'
import { isVercelBlobUrl } from '@/lib/blobStorage'

// Matches the formatting the admin rich-text toolbar can actually produce
// (bold/italic/underline, headings, lists, blockquote, links, inline images)
// - anything else (script, style, event handlers, iframes, ...) is stripped.
const ALLOWED_TAGS = [
  'p', 'br', 'div',
  'h2', 'h3',
  'strong', 'b', 'em', 'i', 'u',
  'ul', 'ol', 'li',
  'blockquote',
  'a',
  'img',
]

// Inline images may only point at files we manage: uploads (Vercel Blob or
// the local-dev /assets/uploads fallback) and bundled site assets. Anything
// else (external hotlinks, data: URIs) is dropped with the tag.
const isAllowedImageSrc = (src: string): boolean =>
  src.startsWith('/assets/') || isVercelBlobUrl(src)

export function sanitizePostContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['https'] },
    exclusiveFilter: (frame) =>
      frame.tag === 'img' && !isAllowedImageSrc(String(frame.attribs?.src || '')),
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' }),
    },
  }).trim()
}
