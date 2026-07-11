import { NextRequest } from 'next/server'
import { PostStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createPostSchema } from '@/lib/validation'
import { toPostDTO, resolveUniqueSlug } from '@/lib/posts'
import { sanitizePostContent } from '@/lib/sanitizePostContent'
import type { ListPostsResponse } from '@/types/blog'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const statusParam = searchParams.get('status')
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize')) || 9))

  const where: { status?: PostStatus; publishedAt?: { lte: Date } } = {}

  if (statusParam && Object.values(PostStatus).includes(statusParam as PostStatus)) {
    where.status = statusParam as PostStatus
    // Public requests (filtered to PUBLISHED) shouldn't reveal scheduled
    // future-dated posts early. Unfiltered admin requests see everything.
    if (where.status === 'PUBLISHED') {
      where.publishedAt = { lte: new Date() }
    }
  }
  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ])

  const body: ListPostsResponse = {
    posts: posts.map(toPostDTO),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  }

  return Response.json(body)
}

export async function POST(request: NextRequest) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = createPostSchema.safeParse(json)
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const data = parsed.data

  const createWithSlug = (slug: string) =>
    prisma.post.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        tags: data.tags,
        excerpt: data.excerpt,
        content: sanitizePostContent(data.content),
        featuredImage: data.featuredImage ?? null,
        status: data.status,
        author: 'Foundry Team',
        publishedAt:
          data.publishedAt !== undefined
            ? data.publishedAt
              ? new Date(data.publishedAt)
              : null
            : data.status === 'PUBLISHED'
              ? new Date()
              : null,
      },
    })

  const isUniqueConstraintError = (err: unknown) =>
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002'

  try {
    const slug = await resolveUniqueSlug(data.slug || data.title)
    let post
    try {
      post = await createWithSlug(slug)
    } catch (err) {
      // Lost a race against another concurrent create with the same slug - retry once.
      if (!isUniqueConstraintError(err)) throw err
      const retrySlug = await resolveUniqueSlug(data.slug || data.title)
      post = await createWithSlug(retrySlug)
    }

    return Response.json(toPostDTO(post), { status: 201 })
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return Response.json({ error: 'A post with this slug already exists. Please try again.' }, { status: 409 })
    }
    console.error('Failed to create post', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
