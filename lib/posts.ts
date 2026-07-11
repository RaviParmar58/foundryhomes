import type { Post } from '@prisma/client'
import type { PostDTO } from '@/types/blog'
import { prisma } from '@/lib/prisma'
import { slugify } from '@/lib/slugify'

export const toPostDTO = (post: Post): PostDTO => {
  const { author: _author, ...dto } = post

  return {
    ...dto,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  }
}

// Generates a unique slug, auto-suffixing (-2, -3, ...) on collision.
// `excludeId` lets an update keep its own slug without colliding with itself.
export const resolveUniqueSlug = async (base: string, excludeId?: string): Promise<string> => {
  const root = slugify(base) || 'post'
  let candidate = root
  let suffix = 2
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug: candidate } })
    if (!existing || existing.id === excludeId) return candidate
    candidate = `${root}-${suffix}`
    suffix += 1
  }
}
