'use client'

import { useState, useEffect, useRef } from 'react'

/* ── Types ─────────────────────────────────────────────────── */
type PostStatus = 'published' | 'draft'
type Category   = 'Building Tips' | 'Design' | 'Steel Framing' | 'Finance' | 'Case Studies' | 'Industry Insights'

interface BlogPost {
  id: string
  title: string
  slug: string
  category: Category
  tags: string[]
  excerpt: string
  content: string
  featuredImage: string
  status: PostStatus
  author: string
  createdAt: string
  updatedAt: string
  views: number
}

type AdminView = 'posts' | 'editor'

/* ── Constants ─────────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  'Building Tips', 'Design', 'Steel Framing', 'Finance', 'Case Studies', 'Industry Insights',
]

const SEED_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Steel-Framed Housing in New Zealand',
    slug: 'future-steel-framed-housing-nz',
    category: 'Industry Insights',
    tags: ['steel framing', 'NZ housing', 'innovation'],
    excerpt: 'Steel framing is redefining modern home construction across New Zealand — stronger, straighter, and built to last a lifetime.',
    content: '<p>Steel framing is redefining modern home construction across New Zealand. From coastal homes battling salt air to urban builds demanding precision, the shift away from timber is accelerating.</p><h2>Why Now?</h2><p>The combination of material science improvements, supply chain maturity, and growing builder awareness has made steel the material of choice for forward-thinking builders.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80',
    status: 'published',
    author: 'Foundry Team',
    createdAt: '2025-06-01',
    updatedAt: '2025-06-01',
    views: 847,
  },
  {
    id: '2',
    title: 'Why Steel Outperforms Timber in NZ Conditions',
    slug: 'steel-vs-timber-nz',
    category: 'Steel Framing',
    tags: ['steel', 'timber', 'comparison', 'NZ'],
    excerpt: 'From coastal salt air to alpine freeze-thaw cycles, NZ conditions test every building material. Here\'s why steel consistently wins.',
    content: '<p>From coastal salt air to alpine freeze-thaw cycles, NZ conditions test every building material.</p><h2>The Case for Steel</h2><p>Steel doesn\'t warp, twist, or shrink — meaning your doors keep closing and your walls stay straight, year after year.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    status: 'published',
    author: 'James R.',
    createdAt: '2025-05-10',
    updatedAt: '2025-05-12',
    views: 623,
  },
  {
    id: '3',
    title: 'Designing Your Perfect Granny Flat: 5 Key Considerations',
    slug: 'designing-perfect-granny-flat',
    category: 'Design',
    tags: ['granny flat', 'design', 'minor dwelling'],
    excerpt: 'Small footprint, big impact. The key design decisions that separate a great minor dwelling from a mediocre one.',
    content: '<p>Small footprint, big impact. Granny flats are one of New Zealand\'s fastest-growing housing categories.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    status: 'published',
    author: 'Sarah M.',
    createdAt: '2025-04-18',
    updatedAt: '2025-04-20',
    views: 412,
  },
  {
    id: '4',
    title: 'Understanding Home Loan Options in NZ',
    slug: 'home-loan-options-nz',
    category: 'Finance',
    tags: ['finance', 'mortgage', 'first home buyer'],
    excerpt: 'Our finance partner Autumn Financial breaks down what every Kiwi builder should know before signing.',
    content: '<p>Finance for your Foundry build — we\'ve partnered with Autumn Financial to make this as straightforward as possible.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80',
    status: 'draft',
    author: 'Melanie A.',
    createdAt: '2025-03-22',
    updatedAt: '2025-03-22',
    views: 0,
  },
  {
    id: '5',
    title: 'The Complete NZ Building Process, Explained',
    slug: 'complete-nz-building-process',
    category: 'Building Tips',
    tags: ['building process', 'consent', 'NZ build'],
    excerpt: 'Consent, contract, construction — we walk you through every stage from first concept to handover day.',
    content: '<p>The building process in New Zealand is well-structured once you understand each stage.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
    status: 'draft',
    author: 'Foundry Team',
    createdAt: '2025-02-14',
    updatedAt: '2025-02-14',
    views: 0,
  },
  {
    id: '6',
    title: 'Modern Family Home in Whangarei — Case Study',
    slug: 'family-home-whangarei-case-study',
    category: 'Case Studies',
    tags: ['case study', 'Whangarei', 'family home'],
    excerpt: 'A 4-bedroom steel-framed family home delivered on time and on budget. See how we handled design, consents, and the full build.',
    content: '<p>This Whangarei build is a great example of what steel-framed construction can achieve.</p>',
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
    status: 'published',
    author: 'Foundry Team',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-09',
    views: 298,
  },
]

/* ── Helpers ───────────────────────────────────────────────── */
const uid     = () => Math.random().toString(36).slice(2, 9)
const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })
const slugify  = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const today    = () => new Date().toISOString().slice(0, 10)

/* ── SVG Icons (inline) ────────────────────────────────────── */
const IconGrid     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
const IconPlus     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IconHome     = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const IconExtLink  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const IconEdit     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const IconTrash    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
const IconSearch   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IconChevron  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
const IconFile     = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>

/* ═══════════════════════════════════════════════════════════
   POST EDITOR COMPONENT
═══════════════════════════════════════════════════════════ */
function PostEditor({
  post,
  isNew,
  onSave,
  onCancel,
}: {
  post: BlogPost
  isNew: boolean
  onSave: (p: BlogPost) => void
  onCancel: () => void
}) {
  const [form, setForm]           = useState<BlogPost>(post)
  const [tagInput, setTagInput]   = useState('')
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
  const [slugLocked, setSlugLocked] = useState(!isNew)
  const editorRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) =>
    setForm(f => ({ ...f, [key]: value }))

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
  const removeTag = (t: string) => set('tags', form.tags.filter(x => x !== t))

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
            onChange={e => handleTitle(e.target.value)}
            aria-label="Post title"
          />
          <div className="admin-editor-slug-row">
            <span className="admin-editor-slug-base">foundryhomes.nz/blog/</span>
            <input
              className="admin-editor-slug-input"
              type="text"
              value={form.slug}
              onChange={e => { setSlugLocked(true); set('slug', slugify(e.target.value)) }}
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
            <span className={`admin-status-dot admin-status-dot--${form.status}`}>
              <i />
              {form.status}
            </span>
            <button
              className="admin-btn admin-btn--xs"
              type="button"
              onClick={() => set('status', form.status === 'published' ? 'draft' : 'published')}
            >
              {form.status === 'published' ? 'Unpublish' : 'Publish'}
            </button>
          </div>

          <div className="admin-meta-field">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              type="text"
              value={form.author}
              onChange={e => set('author', e.target.value)}
            />
          </div>
          <div className="admin-meta-field">
            <label htmlFor="pubdate">Publish Date</label>
            <input
              id="pubdate"
              type="date"
              value={form.createdAt}
              onChange={e => set('createdAt', e.target.value)}
            />
          </div>

          <div className="admin-meta-actions">
            <button className="admin-btn" type="button" onClick={onCancel}>Discard</button>
            <button
              className="admin-btn admin-btn--primary"
              type="button"
              onClick={() => onSave(form)}
              disabled={!form.title.trim()}
            >
              Save Post
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="admin-meta-section">
          <h4 className="admin-meta-title">Category</h4>
          <select
            className="admin-meta-select"
            value={form.category}
            onChange={e => set('category', e.target.value as Category)}
            aria-label="Post category"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
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
        <div className="admin-meta-section">
          <h4 className="admin-meta-title">Featured Image</h4>
          {form.featuredImage && (
            <div className="admin-feat-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.featuredImage} alt="Featured" />
              <button
                type="button"
                className="admin-feat-img__remove"
                onClick={() => set('featuredImage', '')}
                aria-label="Remove featured image"
              >×</button>
            </div>
          )}
          <input
            className="admin-meta-input"
            type="url"
            placeholder="Paste image URL…"
            value={form.featuredImage}
            onChange={e => set('featuredImage', e.target.value)}
            aria-label="Featured image URL"
          />
        </div>

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

/* ═══════════════════════════════════════════════════════════
   MAIN ADMIN PAGE
═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const [posts, setPosts]               = useState<BlogPost[]>([])
  const [view, setView]                 = useState<AdminView>('posts')
  const [editingPost, setEditingPost]   = useState<BlogPost | null>(null)
  const [isNewPost, setIsNewPost]       = useState(false)
  const [search, setSearch]             = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | PostStatus>('all')
  const [filterCat, setFilterCat]       = useState('all')
  const [deleteId, setDeleteId]         = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [toastMsg, setToastMsg]         = useState('')

  /* Hydrate from localStorage or seed data */
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fh_blog_posts')
      setPosts(stored ? JSON.parse(stored) : SEED_POSTS)
    } catch {
      setPosts(SEED_POSTS)
    }
  }, [])

  /* Persist on change */
  useEffect(() => {
    if (posts.length) localStorage.setItem('fh_blog_posts', JSON.stringify(posts))
  }, [posts])

  /* Toast helper */
  const toast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2800)
  }

  /* ── Filtered list ── */
  const filtered = posts.filter(p => {
    const q = search.toLowerCase()
    const matchQ   = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
    const matchS   = filterStatus === 'all' || p.status === filterStatus
    const matchC   = filterCat === 'all' || p.category === filterCat
    return matchQ && matchS && matchC
  })

  /* ── CRUD ── */
  const openCreate = () => {
    setEditingPost({
      id: uid(), title: '', slug: '', category: 'Building Tips', tags: [],
      excerpt: '', content: '', featuredImage: '', status: 'draft',
      author: 'Foundry Team', createdAt: today(), updatedAt: today(), views: 0,
    })
    setIsNewPost(true)
    setView('editor')
    setSidebarOpen(false)
  }

  const openEdit = (post: BlogPost) => {
    setEditingPost({ ...post })
    setIsNewPost(false)
    setView('editor')
  }

  const savePost = (post: BlogPost) => {
    const updated = { ...post, updatedAt: today() }
    setPosts(prev => {
      const exists = prev.find(p => p.id === updated.id)
      return exists ? prev.map(p => p.id === updated.id ? updated : p) : [updated, ...prev]
    })
    toast(isNewPost ? 'Post created successfully' : 'Post saved successfully')
    setView('posts')
  }

  const confirmDelete = (id: string) => setDeleteId(id)

  const executeDelete = () => {
    setPosts(prev => prev.filter(p => p.id !== deleteId))
    setDeleteId(null)
    toast('Post deleted')
  }

  const toggleStatus = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published', updatedAt: today() }
        : p
    ))
  }

  /* ── Stats ── */
  const stats = {
    total:     posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts:    posts.filter(p => p.status === 'draft').length,
    views:     posts.reduce((s, p) => s + p.views, 0),
  }

  /* ── Topbar title ── */
  const pageTitle = view === 'editor'
    ? (isNewPost ? 'New Post' : 'Edit Post')
    : 'Blog Posts'

  return (
    <div className="admin">

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar${sidebarOpen ? ' is-open' : ''}`} aria-label="Admin navigation">
        <div className="admin-sidebar__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Foundry Homes" height={36} />
          <span className="admin-sidebar__badge">Admin</span>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav__label">Content</p>
          <button
            className={`admin-nav__item${view === 'posts' ? ' is-active' : ''}`}
            onClick={() => { setView('posts'); setSidebarOpen(false) }}
            type="button"
          >
            <IconGrid /> All Posts
            <span className="admin-nav__count">{posts.length}</span>
          </button>
          <button
            className="admin-nav__item"
            onClick={openCreate}
            type="button"
          >
            <IconPlus /> New Post
          </button>

          <p className="admin-nav__label" style={{ marginTop: 24 }}>Site</p>
          <a className="admin-nav__item" href="/" target="_blank" rel="noopener noreferrer">
            <IconHome /> View Site
          </a>
          <a className="admin-nav__item" href="/blog" target="_blank" rel="noopener noreferrer">
            <IconExtLink /> View Blog
          </a>
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">F</div>
            <div>
              <b>Foundry Team</b>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* ── Main ── */}
      <div className="admin-main">

        {/* Topbar */}
        <header className="admin-topbar">
          <button
            className="admin-topbar__burger"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            type="button"
          >
            <span /><span /><span />
          </button>

          <h1 className="admin-topbar__title">{pageTitle}</h1>

          <div className="admin-topbar__right">
            {toastMsg && (
              <span className="admin-toast" role="status">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {toastMsg}
              </span>
            )}
            {view === 'posts' ? (
              <button className="admin-btn admin-btn--primary" onClick={openCreate} type="button">
                <IconPlus /> New Post
              </button>
            ) : (
              <button className="admin-btn" onClick={() => setView('posts')} type="button">
                <IconChevron /> Back to Posts
              </button>
            )}
          </div>
        </header>

        {/* Page body */}
        <div className="admin-body">

          {/* ══ POSTS LIST VIEW ══ */}
          {view === 'posts' && (
            <>
              {/* Stats row */}
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <span>Total Posts</span>
                  <b>{stats.total}</b>
                </div>
                <div className="admin-stat-card admin-stat-card--teal">
                  <span>Published</span>
                  <b>{stats.published}</b>
                </div>
                <div className="admin-stat-card">
                  <span>Drafts</span>
                  <b>{stats.drafts}</b>
                </div>
                <div className="admin-stat-card">
                  <span>Total Views</span>
                  <b>{stats.views.toLocaleString()}</b>
                </div>
              </div>

              {/* Filters */}
              <div className="admin-filters">
                <div className="admin-search-box">
                  <IconSearch />
                  <input
                    type="search"
                    placeholder="Search by title, category or tag…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search posts"
                  />
                  {search && (
                    <button
                      className="admin-search-clear"
                      onClick={() => setSearch('')}
                      type="button"
                      aria-label="Clear search"
                    >×</button>
                  )}
                </div>

                <div className="admin-filter-tabs" role="tablist">
                  {(['all', 'published', 'draft'] as const).map(s => (
                    <button
                      key={s}
                      role="tab"
                      aria-selected={filterStatus === s}
                      className={`admin-filter-tab${filterStatus === s ? ' is-active' : ''}`}
                      onClick={() => setFilterStatus(s)}
                      type="button"
                    >
                      {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>

                <select
                  className="admin-select"
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Table */}
              <div className="admin-table-wrap">
                {filtered.length === 0 ? (
                  <div className="admin-empty">
                    <IconFile />
                    <p>{search ? `No results for "${search}"` : 'No posts yet'}</p>
                    {!search && (
                      <button className="admin-btn admin-btn--primary" onClick={openCreate} type="button">
                        <IconPlus /> Create your first post
                      </button>
                    )}
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Post</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map(post => (
                        <tr key={post.id} className="admin-table__row">

                          {/* Post title + thumbnail */}
                          <td>
                            <div className="admin-table__post-cell">
                              {post.featuredImage && (
                                <div className="admin-table__thumb">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={post.featuredImage} alt="" />
                                </div>
                              )}
                              <div className="admin-table__post-info">
                                <button
                                  className="admin-table__post-title"
                                  onClick={() => openEdit(post)}
                                  type="button"
                                >
                                  {post.title}
                                </button>
                                <span className="admin-table__slug">/{post.slug}</span>
                                {post.tags.length > 0 && (
                                  <div className="admin-table__tags">
                                    {post.tags.slice(0, 3).map(t => (
                                      <span key={t} className="admin-table__tag">{t}</span>
                                    ))}
                                    {post.tags.length > 3 && (
                                      <span className="admin-table__tag">+{post.tags.length - 3}</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td>
                            <span className="admin-cat-badge">{post.category}</span>
                          </td>

                          {/* Status — clickable toggle */}
                          <td>
                            <button
                              className={`admin-status-dot admin-status-dot--${post.status} admin-status-dot--btn`}
                              onClick={() => toggleStatus(post.id)}
                              title={`Click to ${post.status === 'published' ? 'unpublish' : 'publish'}`}
                              type="button"
                            >
                              <i />{post.status}
                            </button>
                          </td>

                          {/* Views */}
                          <td className="admin-table__mono">
                            {post.views > 0 ? post.views.toLocaleString() : '—'}
                          </td>

                          {/* Date */}
                          <td className="admin-table__mono">{fmtDate(post.updatedAt)}</td>

                          {/* Actions */}
                          <td>
                            <div className="admin-row-actions">
                              <button
                                className="admin-icon-btn"
                                onClick={() => openEdit(post)}
                                title="Edit post"
                                type="button"
                              >
                                <IconEdit />
                              </button>
                              <a
                                className="admin-icon-btn"
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View post"
                              >
                                <IconExtLink />
                              </a>
                              <button
                                className="admin-icon-btn admin-icon-btn--danger"
                                onClick={() => confirmDelete(post.id)}
                                title="Delete post"
                                type="button"
                              >
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {filtered.length > 0 && (
                <p className="admin-table-count">
                  Showing <strong>{filtered.length}</strong> of <strong>{posts.length}</strong> posts
                </p>
              )}
            </>
          )}

          {/* ══ EDITOR VIEW ══ */}
          {view === 'editor' && editingPost && (
            <PostEditor
              post={editingPost}
              isNew={isNewPost}
              onSave={savePost}
              onCancel={() => setView('posts')}
            />
          )}

        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {deleteId && (
        <div className="admin-modal-bg" onClick={() => setDeleteId(null)} role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__icon">
              <IconTrash />
            </div>
            <h3 className="admin-modal__title">Delete Post?</h3>
            <p className="admin-modal__body">
              This action cannot be undone. The post and all its content will be permanently removed.
            </p>
            <div className="admin-modal__actions">
              <button className="admin-btn" onClick={() => setDeleteId(null)} type="button">Cancel</button>
              <button className="admin-btn admin-btn--danger" onClick={executeDelete} type="button">
                <IconTrash /> Delete Post
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
