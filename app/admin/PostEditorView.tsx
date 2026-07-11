'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import type { EditorView } from '@tiptap/pm/view'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import ImageExtension from '@tiptap/extension-image'
import type { PostFormState } from '@/types/blog'
import { slugify } from '@/lib/slugify'
import { todayISODate } from '@/lib/format'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { ImageUpload } from './ImageUpload'

const INLINE_IMAGE_MIME = /^image\/(jpeg|png|webp|gif)$/

async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || 'Image upload failed')
  return data.url as string
}

function Toolbar({
  editor,
  onInsertImage,
  imageUploading,
}: {
  editor: Editor | null
  onInsertImage: () => void
  imageUploading: boolean
}) {
  if (!editor) return null

  const insertLink = () => {
    const previousUrl = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Enter URL:', previousUrl || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  const btn = (
    label: string,
    onClick: () => void,
    isActive: boolean,
    content: React.ReactNode
  ) => (
    <button
      className={`admin-toolbar__btn${isActive ? ' is-active' : ''}`}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={label}
      type="button"
      aria-pressed={isActive}
    >
      {content}
    </button>
  )

  return (
    <div className="admin-toolbar" role="toolbar" aria-label="Text formatting">
      {btn('Bold (Ctrl+B)', () => editor.chain().focus().toggleBold().run(), editor.isActive('bold'), <strong>B</strong>)}
      {btn('Italic (Ctrl+I)', () => editor.chain().focus().toggleItalic().run(), editor.isActive('italic'), <em>I</em>)}
      {btn('Underline', () => editor.chain().focus().toggleUnderline().run(), editor.isActive('underline'), <span style={{ textDecoration: 'underline' }}>U</span>)}
      <div className="admin-toolbar__sep" />
      {btn('Heading 2', () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive('heading', { level: 2 }), 'H2')}
      {btn('Heading 3', () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive('heading', { level: 3 }), 'H3')}
      {btn('Paragraph', () => editor.chain().focus().setParagraph().run(), editor.isActive('paragraph'), '¶')}
      <div className="admin-toolbar__sep" />
      {btn(
        'Bullet list',
        () => editor.chain().focus().toggleBulletList().run(),
        editor.isActive('bulletList'),
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
      )}
      {btn(
        'Numbered list',
        () => editor.chain().focus().toggleOrderedList().run(),
        editor.isActive('orderedList'),
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
      )}
      {btn(
        'Blockquote',
        () => editor.chain().focus().toggleBlockquote().run(),
        editor.isActive('blockquote'),
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
      )}
      <div className="admin-toolbar__sep" />
      {btn(
        'Insert link',
        insertLink,
        editor.isActive('link'),
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      )}
      <button
        className="admin-toolbar__btn"
        onMouseDown={(e) => { e.preventDefault(); onInsertImage() }}
        title="Insert image (or paste / drag one into the text)"
        type="button"
        disabled={imageUploading}
      >
        {imageUploading ? (
          <span aria-label="Uploading image">…</span>
        ) : (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/><polyline points="21 15 16 10 5 21"/></svg>
        )}
      </button>
      {btn(
        'Clear formatting',
        () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
        false,
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2l6 6"/><path d="M2 6l6 6"/><line x1="15" y1="5" x2="5" y2="19"/><line x1="19" y1="12" x2="19" y2="19"/><line x1="16" y1="19" x2="22" y2="19"/></svg>
      )}
    </div>
  )
}

type FieldName = 'title' | 'slug' | 'excerpt' | 'content' | 'featuredImage'
type FieldErrors = Partial<Record<FieldName, string>>

const FIELD_ORDER: FieldName[] = ['title', 'slug', 'excerpt', 'content', 'featuredImage']

function validatePostForm(form: PostFormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.title.trim()) errors.title = 'Title is required.'
  if (!form.slug.trim()) errors.slug = 'URL slug is required.'
  if (!form.excerpt.trim()) errors.excerpt = 'Excerpt is required.'

  const plainTextContent = form.content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  if (!plainTextContent) errors.content = 'Post content is required.'

  if (!form.featuredImage) errors.featuredImage = 'Featured image is required.'

  return errors
}

export function PostEditorView({
  post,
  isNew,
  onSave,
  onCancel,
}: {
  post: PostFormState
  isNew: boolean
  onSave: (p: PostFormState) => void | Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState<PostFormState>(post)
  const [tagInput, setTagInput] = useState('')
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [slugLocked, setSlugLocked] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [shakeToken, setShakeToken] = useState(0)
  const [imageUploading, setImageUploading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const titleRef = useRef<HTMLInputElement>(null)
  const slugRef = useRef<HTMLInputElement>(null)
  const excerptRef = useRef<HTMLTextAreaElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const contentImageInputRef = useRef<HTMLInputElement>(null)

  /* ── Inline content images ──
     One pipeline for toolbar uploads, clipboard pastes, and drag-drops:
     upload via /api/upload, then insert the image node at the given
     document position (defaulting to the caret) by dispatching directly
     on the ProseMirror view, so placement is exact and multiple images
     land in order. */
  const insertImagesIntoEditor = useCallback(
    async (view: EditorView, files: File[], posHint?: number) => {
      const images = files.filter((f) => INLINE_IMAGE_MIME.test(f.type))
      if (images.length === 0) return false
      setImageError(null)
      setImageUploading(true)
      try {
        let pos = posHint ?? view.state.selection.from
        for (const file of images) {
          const url = await uploadImageFile(file)
          const imageNode = view.state.schema.nodes.image?.create({ src: url, alt: '' })
          if (!imageNode) continue
          const insertPos = Math.min(pos, view.state.doc.content.size)
          view.dispatch(view.state.tr.insert(insertPos, imageNode))
          pos = insertPos + imageNode.nodeSize
        }
      } catch (e) {
        setImageError(e instanceof Error ? e.message : 'Image upload failed')
      } finally {
        setImageUploading(false)
      }
      return true
    },
    []
  )

  const handleEditorPaste = useCallback(
    (view: EditorView, event: ClipboardEvent) => {
      const files = Array.from(event.clipboardData?.files ?? [])
      if (!files.some((f) => INLINE_IMAGE_MIME.test(f.type))) return false
      event.preventDefault()
      void insertImagesIntoEditor(view, files)
      return true
    },
    [insertImagesIntoEditor]
  )

  const handleEditorDrop = useCallback(
    (view: EditorView, event: DragEvent, _slice: unknown, moved: boolean) => {
      if (moved) return false
      const files = Array.from(event.dataTransfer?.files ?? [])
      if (!files.some((f) => INLINE_IMAGE_MIME.test(f.type))) return false
      event.preventDefault()
      const coords = view.posAtCoords({ left: event.clientX, top: event.clientY })
      void insertImagesIntoEditor(view, files, coords?.pos)
      return true
    },
    [insertImagesIntoEditor]
  )

  const set = <K extends keyof PostFormState>(key: K, value: PostFormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const clearError = (field: FieldName) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })

    const el: HTMLElement | null =
      field === 'title' ? titleRef.current :
      field === 'slug' ? slugRef.current :
      field === 'excerpt' ? excerptRef.current :
      field === 'content' ? ((editor?.view.dom as HTMLElement | undefined) ?? null) :
      field === 'featuredImage' ? imageWrapRef.current :
      null
    el?.classList.remove('admin-field-shake')
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your post…' }),
      ImageExtension.configure({ inline: false, allowBase64: false }),
    ],
    content: form.content || '',
    editorProps: {
      attributes: { class: 'admin-editor-content' },
      handlePaste: handleEditorPaste,
      handleDrop: handleEditorDrop,
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      set('content', html)
      if (html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()) clearError('content')
    },
  })

  // Reflect the content validation state onto the live editor's DOM node -
  // Tiptap owns that element, so we go through setOptions rather than JSX.
  useEffect(() => {
    if (!editor) return
    editor.setOptions({
      editorProps: {
        attributes: {
          class: `admin-editor-content${errors.content ? ' admin-field-error' : ''}`,
        },
        // setOptions replaces editorProps wholesale, so the paste/drop
        // image handlers must be re-supplied here or they'd be lost the
        // first time the content error class toggles.
        handlePaste: handleEditorPaste,
        handleDrop: handleEditorDrop,
      },
    })
  }, [editor, errors.content, handleEditorPaste, handleEditorDrop])

  // Re-trigger the shake animation on every failed submit, even if the same
  // fields are still invalid (class toggling alone wouldn't restart a CSS
  // animation that's already applied, so we force a reflow in between).
  useEffect(() => {
    if (shakeToken === 0) return
    const targets: Partial<Record<FieldName, HTMLElement | null>> = {
      title: titleRef.current,
      slug: slugRef.current,
      excerpt: excerptRef.current,
      content: (editor?.view.dom as HTMLElement | undefined) ?? null,
      featuredImage: imageWrapRef.current,
    }
    FIELD_ORDER.forEach((field) => {
      const el = targets[field]
      if (!el || !errors[field]) return
      el.classList.remove('admin-field-shake')
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetWidth
      el.classList.add('admin-field-shake')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shakeToken])

  /* Auto-slug from title when not locked */
  const handleTitle = (title: string) => {
    set('title', title)
    if (title.trim()) clearError('title')
    if (!slugLocked) {
      const nextSlug = slugify(title)
      set('slug', nextSlug)
      if (nextSlug.trim()) clearError('slug')
    }
  }

  /* Tags */
  const addTag = () => {
    const t = tagInput.trim().toLowerCase()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    setTagInput('')
  }
  const removeTag = (t: string) => set('tags', form.tags.filter((x) => x !== t))

  const charCount = form.excerpt.length

  const handleSave = async () => {
    const fieldErrors = validatePostForm(form)
    setErrors(fieldErrors)

    if (Object.keys(fieldErrors).length > 0) {
      setShakeToken((t) => t + 1)
      const firstInvalid = FIELD_ORDER.find((field) => fieldErrors[field])
      if (firstInvalid === 'title') titleRef.current?.focus()
      else if (firstInvalid === 'slug') slugRef.current?.focus()
      else if (firstInvalid === 'excerpt') excerptRef.current?.focus()
      else if (firstInvalid === 'content') editor?.chain().focus().run()
      else if (firstInvalid === 'featuredImage') imageWrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setSaving(true)
    try {
      await onSave(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="admin-editor-page">

      {/* ── Left: Editor ── */}
      <div className="admin-editor-main">

        {/* Title & Slug */}
        <div className="admin-editor-header">
          <input
            ref={titleRef}
            className={`admin-editor-title${errors.title ? ' admin-field-error' : ''}`}
            type="text"
            placeholder="Post title…"
            value={form.title}
            onChange={(e) => handleTitle(e.target.value)}
            aria-label="Post title"
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title && <span className="admin-field-error-msg">{errors.title}</span>}

          <div className="admin-editor-slug-row">
            <span className="admin-editor-slug-base">foundryhomes.nz/blog/</span>
            <input
              ref={slugRef}
              className={`admin-editor-slug-input${errors.slug ? ' admin-field-error' : ''}`}
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugLocked(true)
                const nextSlug = slugify(e.target.value)
                set('slug', nextSlug)
                if (nextSlug.trim()) clearError('slug')
              }}
              placeholder="post-slug"
              aria-label="Post URL slug"
              aria-invalid={Boolean(errors.slug)}
            />
            {slugLocked && (
              <button
                className="admin-slug-unlock"
                onClick={() => setSlugLocked(false)}
                title="Auto-generate from title"
                type="button"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </button>
            )}
          </div>
          {errors.slug && <span className="admin-field-error-msg" style={{ marginTop: -14 }}>{errors.slug}</span>}
        </div>

        {/* Write / Preview tabs */}
        <div className="admin-editor-tabs">
          <button
            className={`admin-editor-tab${activeTab === 'write' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('write')}
            type="button"
          >Write</button>
          <button
            className={`admin-editor-tab${activeTab === 'preview' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('preview')}
            type="button"
          >Preview</button>
          <span className="admin-editor-tabs-spacer" />
          <span className="admin-editor-wordcount">
            {imageUploading
              ? 'Uploading image…'
              : `${form.content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length} words`}
          </span>
        </div>

        {/* Toolbar (write mode only) */}
        {activeTab === 'write' && (
          <Toolbar
            editor={editor}
            onInsertImage={() => contentImageInputRef.current?.click()}
            imageUploading={imageUploading}
          />
        )}

        {/* Hidden picker for inline content images (toolbar button) */}
        <input
          ref={contentImageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          style={{ display: 'none' }}
          aria-label="Insert image into post content"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? [])
            if (files.length && editor) void insertImagesIntoEditor(editor.view, files)
            e.target.value = ''
          }}
        />

        {/* Content area */}
        {activeTab === 'write' ? (
          <EditorContent editor={editor} />
        ) : (
          <div
            className="admin-editor-preview"
            dangerouslySetInnerHTML={{
              __html: form.content || '<p style="color:var(--grey)">Nothing to preview yet…</p>',
            }}
          />
        )}
        {errors.content && (
          <span className="admin-field-error-msg admin-field-error-msg--content">{errors.content}</span>
        )}
        {imageError && (
          <span className="admin-field-error-msg admin-field-error-msg--content">{imageError}</span>
        )}
      </div>

      {/* ── Right: Meta Panel ── */}
      <aside className="admin-meta-panel">

        {/* Publish */}
        <div className="admin-meta-section">
          <h4 className="admin-meta-title">Publish</h4>
          <div className="admin-meta-status-row">
            <span className={`admin-status-dot admin-status-dot--${form.status.toLowerCase()}`}>
              <i />
              {form.status.toLowerCase()}
            </span>
            <button
              className="admin-btn admin-btn--xs"
              type="button"
              onClick={() => {
                const nextStatus = form.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
                setForm((f) => ({
                  ...f,
                  status: nextStatus,
                  publishedAt: nextStatus === 'PUBLISHED' && !f.publishedAt ? todayISODate() : f.publishedAt,
                }))
              }}
            >
              {form.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
            </button>
          </div>

          <div className="admin-meta-field">
            <label htmlFor="pubdate">Publish Date</label>
            <input
              id="pubdate"
              type="date"
              value={form.publishedAt ? form.publishedAt.slice(0, 10) : ''}
              onChange={e => set('publishedAt', e.target.value ? e.target.value : null)}
            />
          </div>

          <div className="admin-meta-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="admin-meta-select"
              value={form.category}
              onChange={e => set('category', e.target.value as PostFormState['category'])}
            >
              {CATEGORY_OPTIONS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <div className="admin-meta-actions">
            <button className="admin-btn" type="button" onClick={onCancel} disabled={saving}>Discard</button>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save Post'}
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="admin-meta-section">
          <h4 className="admin-meta-title">Tags</h4>
          {form.tags.length > 0 && (
            <div className="admin-tags">
              {form.tags.map(t => (
                <span key={t} className="admin-tag">
                  {t}
                  <button type="button" onClick={() => removeTag(t)} aria-label={`Remove tag ${t}`}>×</button>
                </span>
              ))}
            </div>
          )}
          <div className="admin-tag-input-row">
            <input
              type="text"
              placeholder="Add a tag…"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
              aria-label="New tag"
            />
            <button className="admin-btn admin-btn--xs" type="button" onClick={addTag}>Add</button>
          </div>
        </div>

        {/* Featured Image */}
        <div ref={imageWrapRef} className={errors.featuredImage ? 'admin-field-error' : undefined}>
          <ImageUpload
            value={form.featuredImage}
            onChange={(url) => { set('featuredImage', url); if (url) clearError('featuredImage') }}
          />
          {errors.featuredImage && (
            <p className="admin-field-error-msg admin-field-error-msg--section">{errors.featuredImage}</p>
          )}
        </div>

        {/* Excerpt */}
        <div className="admin-meta-section">
          <h4 className="admin-meta-title">Excerpt</h4>
          <textarea
            ref={excerptRef}
            className={`admin-meta-textarea${errors.excerpt ? ' admin-field-error' : ''}`}
            placeholder="Short summary for listings and SEO…"
            value={form.excerpt}
            onChange={e => { set('excerpt', e.target.value); if (e.target.value.trim()) clearError('excerpt') }}
            rows={4}
            maxLength={200}
            aria-label="Post excerpt"
            aria-invalid={Boolean(errors.excerpt)}
          />
          {errors.excerpt ? (
            <span className="admin-field-error-msg">{errors.excerpt}</span>
          ) : (
            <span className={`admin-meta-hint${charCount > 160 ? ' admin-meta-hint--warn' : ''}`}>
              {charCount}/160 recommended
            </span>
          )}
        </div>

      </aside>
    </div>
  )
}
