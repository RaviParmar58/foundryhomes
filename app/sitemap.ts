import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { grannyFlatModels } from '@/lib/grannyFlatModels'
import { SITE_URL } from '@/lib/siteUrl'

const STATIC_ROUTES = [
  '',
  '/blog',
  '/contact',
  '/custom-builds',
  '/finance',
  '/foundry',
  '/foundryhomes',
  '/granny-flats-cabins',
  '/grannyflats',
  '/steel-framing',
  '/suppliers',
]

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }))

  const modelEntries: MetadataRoute.Sitemap = grannyFlatModels.map((model) => ({
    url: `${SITE_URL}/granny-flat-models/${model.slug}`,
    lastModified: new Date(),
  }))

  let postEntries: MetadataRoute.Sitemap = []

  try {
    const posts = await prisma.post.findMany({
      where: { status: 'PUBLISHED', publishedAt: { lte: new Date() } },
      select: { slug: true, updatedAt: true },
    })

    postEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
    }))
  } catch {
    postEntries = []
  }

  return [...staticEntries, ...modelEntries, ...postEntries]
}
