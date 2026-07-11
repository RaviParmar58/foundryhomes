import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { toPostDTO } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import { SITE_URL } from '@/lib/siteUrl'
import BlogPageClient from './BlogPageClient'

export const revalidate = 60
export const dynamic = 'force-dynamic'
const PAGE_SIZE = 9

const TITLE = 'Blog - Build Notes from Foundry Homes'
const DESCRIPTION =
  'Practical thinking on steel-framed homes, smart design decisions, and the realities of building well in New Zealand.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default async function BlogPage() {
  const where = { status: 'PUBLISHED' as const, publishedAt: { lte: new Date() } }
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: PAGE_SIZE,
    }),
    prisma.post.count({ where }),
  ])

  return (
    <>
      <Navbar />
      <MobileMenu />
      <BlogPageClient
        initialPosts={posts.map(toPostDTO)}
        total={total}
        pageSize={PAGE_SIZE}
      />
      <Footer />
    </>
  )
}
