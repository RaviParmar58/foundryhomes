import { NextRequest } from 'next/server'
import { Prisma, PostStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { createPostSchema } from '@/lib/validation'
import { toPostDTO, resolveUniqueSlug } from '@/lib/posts'
import type { ListPostsResponse } from '@/types/blog'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const statusParam = searchParams.get('status')
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get('pageSize')) || 9))

  const where: Prisma.PostWhereInput = {}

  if (statusParam && Object.values(PostStatus).includes(statusParam as PostStatus)) {
    where.status = statusParam as PostStatus
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
  const slug = await resolveUniqueSlug(data.slug || data.title)

  try {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug,
        category: 'BUILDING_TIPS',
        tags: data.tags,
        excerpt: data.excerpt,
        content: data.content,
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

    return Response.json(toPostDTO(post), { status: 201 })
  } catch (err) {
    console.error('Failed to create post', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
