'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import type { ListPostsResponse, PostDTO } from '@/types/blog'
import { fmtMonthYear, readTimeFromContent } from '@/lib/format'

async function fetchPosts(opts: {
  page: number
  pageSize: number
}): Promise<ListPostsResponse> {
  const sp = new URLSearchParams()
  sp.set('status', 'PUBLISHED')
  sp.set('page', String(opts.page))
  sp.set('pageSize', String(opts.pageSize))

  const res = await fetch(`/api/posts?${sp.toString()}`)
  if (!res.ok) throw new Error('Failed to load posts')
  return res.json()
}

export default function BlogPageClient({
  initialPosts,
  total,
  pageSize,
}: {
  initialPosts: PostDTO[]
  total: number
  pageSize: number
}) {
  useFoundryAnimations()

  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(total)
  const [loadingMore, setLoadingMore] = useState(false)
  const leadPost = posts[0] ?? null
  const gridPosts = posts.slice(1)

  const loadMore = async () => {
    setLoadingMore(true)
    try {
      const data = await fetchPosts({ page: page + 1, pageSize })
      setPosts((prev) => [...prev, ...data.posts])
      setPage((p) => p + 1)
      setTotalCount(data.total)
    } catch {
      // Keep the button available so the visitor can retry.
    } finally {
      setLoadingMore(false)
    }
  }

  const hasMore = posts.length < totalCount

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>

      <main className="blog-page" id="top">
        <section className="blog-hero" aria-label="Foundry Blog">
          <div className="wrap blog-hero__inner">
            <div className="blog-hero__copy">
              <p className="eyebrow rv">Insights &amp; Ideas</p>
              <h1 className="display rv rv-d1">
                Build Notes<br /><span className="blog-hero__accent">from Foundry</span>
              </h1>
              <p className="lede rv rv-d2">
                Practical thinking on steel-framed homes, smart design decisions, and the realities of building well in New Zealand.
              </p>
              <div className="blog-hero__meta rv rv-d3">
                <span>{totalCount} articles</span>
                <span>Updated monthly</span>
              </div>
            </div>

            {leadPost && (
              <a
                href={`/blog/${leadPost.slug}`}
                className="blog-lead rv rv-d2"
                aria-label={`Read: ${leadPost.title}`}
              >
                <div className="blog-lead__image">
                  {leadPost.featuredImage && (
                    <Image
                      src={leadPost.featuredImage}
                      alt={leadPost.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 42vw"
                      style={{ objectFit: 'cover' }}
                      priority
                    />
                  )}
                </div>
                <div className="blog-lead__content">
                  <span className="blog-lead__label">Latest article</span>
                  <h2>{leadPost.title}</h2>
                  <p>{leadPost.excerpt}</p>
                  <div className="blog-lead__footer">
                    <span>{fmtMonthYear(leadPost.publishedAt ?? leadPost.createdAt)}</span>
                    <span>{readTimeFromContent(leadPost.content)}</span>
                  </div>
                </div>
              </a>
            )}
          </div>
        </section>

        <section className="blog-grid-section" aria-label="Latest articles">
          <div className="wrap">
            <div className="blog-section-head rv">
              <p className="eyebrow">More from the journal</p>
              <h2>Latest thinking</h2>
            </div>

            {posts.length === 0 ? (
              <p className="blog-empty">No articles found.</p>
            ) : gridPosts.length === 0 ? (
              <p className="blog-empty">More articles are coming soon.</p>
            ) : (
              <div className="blog-grid">
                {gridPosts.map((post, i) => (
                  <article
                    key={post.id}
                    className="blog-card rv"
                    style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
                  >
                    <a href={`/blog/${post.slug}`} className="blog-card__inner" aria-label={`Read: ${post.title}`}>
                      <div className="blog-card__image">
                        {post.featuredImage && (
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                          />
                        )}
                        <div className="blog-card__image-overlay" aria-hidden="true"></div>
                      </div>
                      <div className="blog-card__body">
                        <h3 className="blog-card__title">{post.title}</h3>
                        <p className="blog-card__excerpt">{post.excerpt}</p>
                        <div className="blog-card__footer">
                          <span>{fmtMonthYear(post.publishedAt ?? post.createdAt)}</span>
                          <span className="blog-card__read">
                            {readTimeFromContent(post.content)}
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="blog-loadmore rv">
                <button type="button" className="btn" data-magnet="" onClick={loadMore} disabled={loadingMore}>
                  <span>{loadingMore ? 'Loading...' : 'Load more articles'}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="blog-newsletter" aria-label="Newsletter signup">
          <div className="wrap">
            <p className="eyebrow rv blog-newsletter__eyebrow">Stay informed</p>
            <h2 className="display rv rv-d1">
              Get the latest<br /><span className="blog-hero__accent">straight to you</span>
            </h2>
            <p className="lede rv rv-d2">
              Monthly insights on home building, design trends, and the NZ property market - no spam, unsubscribe any time.
            </p>
            <form
              className="blog-newsletter__form rv rv-d3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter subscription form"
            >
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            <p className="blog-newsletter__note rv rv-d4">We respect your privacy. Unsubscribe anytime.</p>
          </div>
        </section>
      </main>
    </>
  )
}
