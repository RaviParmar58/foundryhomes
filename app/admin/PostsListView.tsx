'use client'

import { useEffect, useRef, useState } from 'react'
import type { PostDTO } from '@/types/blog'
import { fmtDate } from '@/lib/format'
import { IconPlus, IconEdit, IconExtLink, IconTrash, IconSearch, IconFile } from './icons'

export function PostsListView({
  posts,
  loading,
  error,
  onRefresh,
  onCreate,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  posts: PostDTO[]
  loading: boolean
  error: string | null
  onRefresh: () => void
  onCreate: () => void
  onEdit: (post: PostDTO) => void
  onDelete: (slug: string) => void | Promise<void>
  onToggleStatus: (post: PostDTO) => void | Promise<void>
}) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'PUBLISHED' | 'DRAFT'>('all')
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const cancelBtnRef = useRef<HTMLButtonElement>(null)
  const deleteTriggerRef = useRef<HTMLButtonElement | null>(null)

  const closeDeleteModal = () => setDeleteSlug(null)

  useEffect(() => {
    if (!deleteSlug) return

    cancelBtnRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeDeleteModal()
        return
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      deleteTriggerRef.current?.focus()
    }
  }, [deleteSlug])

  const filtered = posts.filter((p) => {
    const q = search.toLowerCase()
    const matchQ =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
    const matchS = filterStatus === 'all' || p.status === filterStatus
    return matchQ && matchS
  })

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === 'PUBLISHED').length,
    drafts: posts.filter((p) => p.status === 'DRAFT').length,
    views: posts.reduce((s, p) => s + p.views, 0),
  }

  const executeDelete = async () => {
    if (!deleteSlug) return
    await onDelete(deleteSlug)
    setDeleteSlug(null)
  }

  if (loading) {
    return (
      <div className="admin-empty">
        <IconFile />
        <p>Loading posts…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-empty">
        <IconFile />
        <p>{error}</p>
        <button className="admin-btn admin-btn--primary" onClick={onRefresh} type="button">
          Retry
        </button>
      </div>
    )
  }

  return (
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
            placeholder="Search by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search posts"
          />
          {search && (
            <button className="admin-search-clear" onClick={() => setSearch('')} type="button" aria-label="Clear search">×</button>
          )}
        </div>

        <div className="admin-filter-tabs" role="tablist">
          {(['all', 'PUBLISHED', 'DRAFT'] as const).map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={filterStatus === s}
              className={`admin-filter-tab${filterStatus === s ? ' is-active' : ''}`}
              onClick={() => setFilterStatus(s)}
              type="button"
            >
              {s === 'all' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <IconFile />
            <p>{search ? `No results for "${search}"` : 'No posts yet'}</p>
            {!search && (
              <button className="admin-btn admin-btn--primary" onClick={onCreate} type="button">
                <IconPlus /> Create your first post
              </button>
            )}
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Status</th>
                <th>Views</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="admin-table__row">
                  <td>
                    <div className="admin-table__post-cell">
                      {post.featuredImage && (
                        <div className="admin-table__thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.featuredImage} alt="" />
                        </div>
                      )}
                      <div className="admin-table__post-info">
                        <button className="admin-table__post-title" onClick={() => onEdit(post)} type="button">
                          {post.title}
                        </button>
                        <span className="admin-table__slug">/{post.slug}</span>
                        {post.tags.length > 0 && (
                          <div className="admin-table__tags">
                            {post.tags.slice(0, 3).map((t) => (
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

                  <td>
                    <button
                      className={`admin-status-dot admin-status-dot--${post.status.toLowerCase()} admin-status-dot--btn`}
                      onClick={() => onToggleStatus(post)}
                      title={`Click to ${post.status === 'PUBLISHED' ? 'unpublish' : 'publish'}`}
                      type="button"
                    >
                      <i />{post.status.toLowerCase()}
                    </button>
                  </td>

                  <td className="admin-table__mono">
                    {post.views > 0 ? post.views.toLocaleString() : '-'}
                  </td>

                  <td className="admin-table__mono">{fmtDate(post.updatedAt)}</td>

                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-icon-btn" onClick={() => onEdit(post)} title="Edit post" type="button">
                        <IconEdit />
                      </button>
                      <a className="admin-icon-btn" href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" title="View post">
                        <IconExtLink />
                      </a>
                      <button
                        className="admin-icon-btn admin-icon-btn--danger"
                        onClick={(e) => { deleteTriggerRef.current = e.currentTarget; setDeleteSlug(post.slug) }}
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

      {/* Delete Confirmation Modal */}
      {deleteSlug && (
        <div className="admin-modal-bg" onClick={closeDeleteModal} role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="admin-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__icon">
              <IconTrash />
            </div>
            <h3 className="admin-modal__title">Delete Post?</h3>
            <p className="admin-modal__body">
              This action cannot be undone. The post and all its content will be permanently removed.
            </p>
            <div className="admin-modal__actions">
              <button className="admin-btn" ref={cancelBtnRef} onClick={closeDeleteModal} type="button">Cancel</button>
              <button className="admin-btn admin-btn--danger" onClick={executeDelete} type="button">
                <IconTrash /> Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
