'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import type { AdminView, PostDTO, PostFormState, PostMutationPayload } from '@/types/blog'
import { todayISODate } from '@/lib/format'
import { useAdminPosts } from './useAdminPosts'
import { PostsListView } from './PostsListView'
import { PostEditorView } from './PostEditorView'
import { useRouter } from 'next/navigation'
import { IconGrid, IconPlus, IconHome, IconExtLink, IconChevron, IconSun, IconMoon, IconLogout } from './icons'

type AdminTheme = 'light' | 'dark'
const ADMIN_THEME_KEY = 'fh_admin_theme'

const emptyForm = (): PostFormState => ({
  id: null,
  title: '',
  slug: '',
  tags: [],
  excerpt: '',
  content: '',
  featuredImage: null,
  status: 'DRAFT',
  category: 'BUILDING_TIPS',
  publishedAt: null,
})

const toFormState = (post: PostDTO): PostFormState => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  tags: post.tags,
  excerpt: post.excerpt,
  content: post.content,
  featuredImage: post.featuredImage,
  status: post.status,
  category: post.category,
  publishedAt: post.publishedAt,
})

const toPayload = (form: PostFormState): PostMutationPayload => ({
  title: form.title,
  slug: form.slug,
  tags: form.tags,
  excerpt: form.excerpt,
  content: form.content,
  featuredImage: form.featuredImage,
  status: form.status,
  category: form.category,
  publishedAt: form.publishedAt,
})

export default function AdminPage() {
  const router = useRouter()
  const { posts, loading, error, refresh, createPost, updatePost, deletePost } = useAdminPosts()
  const [view, setView] = useState<AdminView>('posts')
  const [editingPost, setEditingPost] = useState<PostFormState | null>(null)
  const [originalSlug, setOriginalSlug] = useState<string | null>(null)
  const [isNewPost, setIsNewPost] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [theme, setTheme] = useState<AdminTheme>('light')

  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_THEME_KEY) as AdminTheme | null
      const initial = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      setTheme(initial)
    } catch {
      /* localStorage unavailable - keep default light theme */
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(ADMIN_THEME_KEY, next)
      } catch {
        /* ignore persistence failures */
      }
      return next
    })
  }

  const toast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToastMsg(msg)
    toastTimer.current = setTimeout(() => setToastMsg(''), 2800)
  }

  const openCreate = () => {
    setEditingPost(emptyForm())
    setOriginalSlug(null)
    setIsNewPost(true)
    setView('editor')
    setSidebarOpen(false)
  }

  const openEdit = (post: PostDTO) => {
    setEditingPost(toFormState(post))
    setOriginalSlug(post.slug)
    setIsNewPost(false)
    setView('editor')
  }

  const savePost = async (form: PostFormState) => {
    try {
      if (isNewPost) {
        await createPost(toPayload(form))
        toast('Post created successfully')
      } else {
        await updatePost(originalSlug!, toPayload(form))
        toast('Post saved successfully')
      }
      setView('posts')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to save post')
      refresh()
    }
  }

  const executeDelete = async (slug: string) => {
    try {
      await deletePost(slug)
      toast('Post deleted')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to delete post')
      refresh()
    }
  }

  const toggleStatus = async (post: PostDTO) => {
    const nextStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
    const payload: PostMutationPayload = {
      title: post.title,
      slug: post.slug,
      tags: post.tags,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage,
      status: nextStatus,
      category: post.category,
      publishedAt: nextStatus === 'PUBLISHED' && !post.publishedAt ? todayISODate() : post.publishedAt,
    }
    try {
      await updatePost(post.slug, payload)
      toast(nextStatus === 'PUBLISHED' ? 'Post published' : 'Post unpublished')
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Failed to update post')
      refresh()
    }
  }

  const pageTitle = view === 'editor' ? (isNewPost ? 'New Post' : 'Edit Post') : 'Blog Posts'

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="admin" data-admin-theme={theme} suppressHydrationWarning>
      {toastMsg && (
        <div className="admin-toast" role="status" aria-live="polite">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMsg}</span>
        </div>
      )}

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
          <button className="admin-nav__item" onClick={openCreate} type="button">
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
            <button
              className="admin-icon-btn"
              onClick={handleLogout}
              type="button"
              title="Sign out"
              aria-label="Sign out"
              style={{ marginLeft: 'auto' }}
            >
              <IconLogout />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="admin-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* ── Main ── */}
      <div className="admin-main">

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
            <button
              className="admin-theme-toggle"
              onClick={toggleTheme}
              type="button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <IconSun /> : <IconMoon />}
            </button>
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

        <div className="admin-body">
          {view === 'posts' && (
            <PostsListView
              posts={posts}
              loading={loading}
              error={error}
              onRefresh={refresh}
              onCreate={openCreate}
              onEdit={openEdit}
              onDelete={executeDelete}
              onToggleStatus={toggleStatus}
            />
          )}

          {view === 'editor' && editingPost && (
            <PostEditorView
              post={editingPost}
              isNew={isNewPost}
              onSave={savePost}
              onCancel={() => setView('posts')}
            />
          )}
        </div>
      </div>

    </div>
  )
}
