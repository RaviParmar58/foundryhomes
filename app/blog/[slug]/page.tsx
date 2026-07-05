import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import { fmtMonthYear, readTimeFromContent } from '@/lib/format'

export const dynamic = 'force-dynamic'

async function getPublishedPost(slug: string) {
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post || post.status !== 'PUBLISHED') return null
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

  return {
    title: `${post.title} — Foundry Homes Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()

  prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } }).catch(() => { })

  return (
    <>
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
