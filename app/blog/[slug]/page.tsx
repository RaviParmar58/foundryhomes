import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import PageFx from '@/components/PageFx'
import { fmtMonthYear, readTimeFromContent } from '@/lib/format'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'
import { SITE_URL } from '@/lib/siteUrl'

const VIEW_DEDUPE_WINDOW_MS = 30 * 60 * 1000 // 30 min per post per IP

export const dynamic = 'force-dynamic'

async function getPublishedPost(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post || post.status !== 'PUBLISHED') return null
  if (!post.publishedAt || post.publishedAt > new Date()) return null
  return post
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title: `${post.title} - Foundry Homes Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()

  const ip = getClientIp({ headers: headers() })
  const { allowed: shouldCountView } = checkRateLimit(`view:${post.id}:${ip}`, 1, VIEW_DEDUPE_WINDOW_MS)
  if (shouldCountView) {
    prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => { })
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Foundry Homes' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageFx />
      <Navbar />
      <MobileMenu />
      <main className="blog-post-page">
        <section className="blog-post-hero">
          <div className="wrap">
            <a href="/blog" className="blog-post-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Blog
            </a>
            <h1 className="display">{post.title}</h1>
            <div className="blog-post-hero__meta">
              <span>{fmtMonthYear(post.publishedAt ?? post.createdAt)}</span>
              <span>{readTimeFromContent(post.content)}</span>
            </div>
            {post.featuredImage && (
              <div className="blog-post-image">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1080px) 100vw, 760px"
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
          </div>
        </section>

        <div className="wrap">
          <article
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
