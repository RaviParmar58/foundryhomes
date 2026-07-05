'use client'

import { useEffect, useRef, useState } from 'react'
import type { PostFormState } from '@/types/blog'
import { slugify } from '@/lib/slugify'
import { todayISODate } from '@/lib/format'
import { ImageUpload } from './ImageUpload'

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
  const editorRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof PostFormState>(key: K, value: PostFormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  /* Auto-slug from title when not locked */
  const handleTitle = (title: string) => {
    set('title', title)
    if (!slugLocked) set('slug', slugify(title))
  }

  /* Tags */
  const addTag = () => {
    const t = tagInput.trim().toLowerCase()
    if (t && !form.tags.includes(t)) set('tags', [...form.tags, t])
    setTagInput('')
  }
  const removeTag = (t: string) => set('tags', form.tags.filter((x) => x !== t))

  /* Rich text toolbar — execCommand (still widely supported) */
  const exec = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    const url = window.prompt('Enter URL:', 'https://')
    if (url) exec('createLink', url)
  }

  /* Sync contentEditable → state */
  const handleEditorInput = () => {
    if (editorRef.current) set('content', editorRef.current.innerHTML)
  }

  /* Seed initial content into editor on mount */
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = form.content || ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const charCount = form.excerpt.length

  const handleSave = async () => {
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
            className="admin-editor-title"
            type="text"
            placeholder="Post title…"
            value={form.title}
            onChange={(e) => handleTitle(e.target.value)}
            aria-label="Post title"
          />
          <div className="admin-editor-slug-row">
            <span className="admin-editor-slug-base">foundryhomes.nz/blog/</span>
            <input
              className="admin-editor-slug-input"
              type="text"
              value={form.slug}
              onChange={(e) => { setSlugLocked(true); set('slug', slugify(e.target.value)) }}
              placeholder="post-slug"
              aria-label="Post URL slug"
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
            {form.content.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        {/* Toolbar (write mode only) */}
        {activeTab === 'write' && (
          <div className="admin-toolbar" role="toolbar" aria-label="Text formatting">
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('bold') }} title="Bold (Ctrl+B)"><strong>B</strong></button>
            <button className="admin-toolbar__btn admin-toolbar__btn--italic" onMouseDown={e => { e.preventDefault(); exec('italic') }} title="Italic (Ctrl+I)"><em>I</em></button>
            <button className="admin-toolbar__btn admin-toolbar__btn--underline" onMouseDown={e => { e.preventDefault(); exec('underline') }} title="Underline"><span style={{ textDecoration: 'underline' }}>U</span></button>
            <div className="admin-toolbar__sep" />
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'h2') }} title="Heading 2">H2</button>
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'h3') }} title="Heading 3">H3</button>
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'p') }} title="Paragraph">¶</button>
            <div className="admin-toolbar__sep" />
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('insertUnorderedList') }} title="Bullet list">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
            </button>
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('insertOrderedList') }} title="Numbered list">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
            </button>
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('formatBlock', 'blockquote') }} title="Blockquote">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
            </button>
            <div className="admin-toolbar__sep" />
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); insertLink() }} title="Insert link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            </button>
            <button className="admin-toolbar__btn" onMouseDown={e => { e.preventDefault(); exec('removeFormat') }} title="Clear formatting">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2l6 6"/><path d="M2 6l6 6"/><line x1="15" y1="5" x2="5" y2="19"/><line x1="19" y1="12" x2="19" y2="19"/><line x1="16" y1="19" x2="22" y2="19"/></svg>
            </button>
          </div>
        )}

        {/* Content area */}
        {activeTab === 'write' ? (
          <div
            ref={editorRef}
            className="admin-editor-content"
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            data-placeholder="Start writing your post…"
            spellCheck
          />
        ) : (
          <div
            className="admin-editor-preview"
            dangerouslySetInnerHTML={{
              __html: form.content || '<p style="color:var(--grey)">Nothing to preview yet…</p>',
            }}
          />
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

          <div className="admin-meta-actions">
            <button className="admin-btn" type="button" onClick={onCancel} disabled={saving}>Discard</button>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={handleSave}
              disabled={!form.title.trim() || saving}
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
        <ImageUpload value={form.featuredImage} onChange={(url) => set('featuredImage', url)} />

        {/* Excerpt */}
        <div className="admin-meta-section">
          <h4 className="admin-meta-title">Excerpt</h4>
          <textarea
            className="admin-meta-textarea"
            placeholder="Short summary for listings and SEO…"
            value={form.excerpt}
            onChange={e => set('excerpt', e.target.value)}
            rows={4}
            maxLength={200}
            aria-label="Post excerpt"
          />
          <span className={`admin-meta-hint${charCount > 160 ? ' admin-meta-hint--warn' : ''}`}>
            {charCount}/160 recommended
          </span>
        </div>

      </aside>
    </div>
  )
}
