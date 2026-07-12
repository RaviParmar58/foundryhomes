import sanitizeHtml from 'sanitize-html'
import { isManagedImageSrc } from '@/lib/imageSources'

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

export function sanitizePostContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['https'] },
    // Inline images may only point at files we manage; the admin editor
    // imports pasted external images into our storage before save, so
    // anything still external here (or a data: URI) is dropped with the tag.
    exclusiveFilter: (frame) =>
      frame.tag === 'img' && !isManagedImageSrc(String(frame.attribs?.src || '')),
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer nofollow' }),
    },
  }).trim()
}
