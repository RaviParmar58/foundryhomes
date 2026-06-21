'use client'

import Image from 'next/image'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const categories = ['All', 'Building Tips', 'Design', 'Steel Framing', 'Finance', 'Case Studies']

const featuredPost = {
  category: 'Industry Insights',
  title: 'The Future of Steel-Framed Housing in New Zealand',
  excerpt:
    'Steel framing is redefining modern home construction across New Zealand — stronger, straighter, and built to last a lifetime. Discover how Foundry Homes is leading this shift in residential building.',
  author: 'Foundry Team',
  date: 'June 2025',
  readTime: '8 min read',
  image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&q=80',
}

const posts = [
  {
    category: 'Steel Framing',
    title: 'Why Steel Outperforms Timber in NZ Conditions',
    excerpt:
      "From coastal salt air to alpine freeze-thaw cycles, NZ conditions test every building material. Here's why steel consistently wins.",
    author: 'James R.',
    date: 'May 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    category: 'Design',
    title: 'Designing Your Perfect Granny Flat: 5 Key Considerations',
    excerpt:
      'Small footprint, big impact. We cover the key design decisions that separate a great minor dwelling from a mediocre one.',
    author: 'Sarah M.',
    date: 'April 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  },
  {
    category: 'Finance',
    title: 'Understanding Home Loan Options in NZ',
    excerpt:
      'First build? Investment property? Our finance partner Autumn Financial breaks down what every Kiwi builder should know before signing.',
    author: 'Melanie A.',
    date: 'March 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
  {
    category: 'Building Tips',
    title: 'The Complete NZ Building Process, Explained',
    excerpt:
      'Consent, contract, construction — we walk you through every stage of a new build from first concept all the way to handover day.',
    author: 'Foundry Team',
    date: 'February 2025',
    readTime: '10 min',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  },
  {
    category: 'Case Studies',
    title: 'Modern Family Home in Whangarei',
    excerpt:
      'A 4-bedroom steel-framed family home delivered on time and on budget. See how we handled design, consents, and the full build.',
    author: 'Foundry Team',
    date: 'January 2025',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    category: 'Building Tips',
    title: 'How to Choose the Right Builder for Your Project',
    excerpt:
      'With so many builders in NZ, how do you pick the right one? The questions you should always ask before signing anything.',
    author: 'Foundry Team',
    date: 'December 2024',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
]

export default function BlogPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="blog-page" id="top">

        {/* ── Hero ── */}
        <section className="blog-hero" aria-label="Foundry Blog">
          <div className="wrap blog-hero__inner">
            <div className="blog-hero__copy">
              <p className="eyebrow rv">Insights &amp; Ideas</p>
              <h1 className="display rv rv-d1">
                The Foundry<br /><span className="blog-hero__accent">Journal</span>
              </h1>
              <p className="lede rv rv-d2">
                Building tips, design ideas, industry news and real stories from the team — everything you need to build smarter in New Zealand.
              </p>
              <div className="blog-hero__search rv rv-d3" role="search">
                <input
                  type="search"
                  placeholder="Search articles…"
                  aria-label="Search blog articles"
                />
                <button type="button" aria-label="Search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="blog-hero__stats rv rv-d2" aria-hidden="true">
              <div className="blog-hero__stat">
                <b>24+</b>
                <span>Articles</span>
              </div>
              <div className="blog-hero__stat">
                <b>6</b>
                <span>Categories</span>
              </div>
              <div className="blog-hero__stat">
                <b>NZ</b>
                <span>Focused</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Article ── */}
        <section className="blog-featured" aria-label="Featured article">
          <div className="wrap">
            <p className="eyebrow rv blog-featured__eyebrow">Featured</p>
            <a href="#" className="blog-featured__card rv rv-d1" aria-label={`Read: ${featuredPost.title}`}>
              <div className="blog-featured__image">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1080px) 100vw, 58vw"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div className="blog-featured__body">
                <span className="blog-featured__tag">{featuredPost.category}</span>
                <h2 className="blog-featured__title display">{featuredPost.title}</h2>
                <p className="blog-featured__excerpt">{featuredPost.excerpt}</p>
                <div className="blog-featured__meta">
                  <span>{featuredPost.author}</span>
                  <span>{featuredPost.date}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <span className="btn btn--sm blog-featured__btn">
                  <span>Read Article</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <div className="blog-filter">
          <div className="wrap blog-filter__inner">
            <div className="blog-filter__tabs" role="tablist" aria-label="Filter by category">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`blog-filter__tab${i === 0 ? ' is-active' : ''}`}
                  role="tab"
                  aria-selected={i === 0}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="blog-filter__count" aria-live="polite">
              Showing {posts.length} of 24 articles
            </span>
          </div>
        </div>

        {/* ── Article Grid ── */}
        <section className="blog-grid-section" aria-label="All articles">
          <div className="wrap">
            <div className="blog-grid">
              {posts.map((post, i) => (
                <article
                  key={i}
                  className="blog-card rv"
                  style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
                >
                  <a href="#" className="blog-card__inner" aria-label={`Read: ${post.title}`}>
                    <div className="blog-card__image">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="blog-card__image-overlay" aria-hidden="true"></div>
                      <span className="blog-card__category">{post.category}</span>
                    </div>
                    <div className="blog-card__body">
                      <h3 className="blog-card__title">{post.title}</h3>
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                      <div className="blog-card__footer">
                        <div className="blog-card__author">
                          <div className="blog-card__avatar" aria-hidden="true">{post.author[0]}</div>
                          <div className="blog-card__author-info">
                            <b>{post.author}</b>
                            <span>{post.date}</span>
                          </div>
                        </div>
                        <span className="blog-card__read">
                          {post.readTime}
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

            <div className="blog-loadmore rv">
              <button type="button" className="btn" data-magnet="">
                <span>Load more articles</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* ── Newsletter CTA ── */}
        <section className="blog-newsletter" aria-label="Newsletter signup">
          <div className="wrap">
            <p className="eyebrow rv blog-newsletter__eyebrow">Stay informed</p>
            <h2 className="display rv rv-d1">
              Get the latest<br /><span className="blog-hero__accent">straight to you</span>
            </h2>
            <p className="lede rv rv-d2">
              Monthly insights on home building, design trends, and the NZ property market — no spam, unsubscribe any time.
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

      <Footer />
    </>
  )
}
