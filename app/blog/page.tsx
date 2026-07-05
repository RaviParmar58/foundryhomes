import { prisma } from '@/lib/prisma'
import { toPostDTO } from '@/lib/posts'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import BlogPageClient from './BlogPageClient'

export const revalidate = 60
const PAGE_SIZE = 9

export default async function BlogPage() {
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: PAGE_SIZE,
    }),
    prisma.post.count({ where: { status: 'PUBLISHED' } }),
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
