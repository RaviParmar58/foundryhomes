import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { updatePostSchema } from '@/lib/validation'
import { toPostDTO, resolveUniqueSlug } from '@/lib/posts'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.post.findUnique({ where: { slug } })
  if (!post) return Response.json({ error: 'Post not found' }, { status: 404 })
  return Response.json(toPostDTO(post))
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (!existing) return Response.json({ error: 'Post not found' }, { status: 404 })

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = updatePostSchema.safeParse(json)
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const data = parsed.data
  const nextSlug = data.slug === existing.slug ? existing.slug : await resolveUniqueSlug(data.slug, existing.id)

  const publishedAt =
    data.publishedAt !== undefined
      ? data.publishedAt
        ? new Date(data.publishedAt)
        : null
      : data.status === 'PUBLISHED' && !existing.publishedAt
        ? new Date()
        : existing.publishedAt

  try {
    const post = await prisma.post.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        slug: nextSlug,
        tags: data.tags,
        excerpt: data.excerpt,
        content: data.content,
        featuredImage: data.featuredImage ?? null,
        status: data.status,
        publishedAt,
      },
    })

    return Response.json(toPostDTO(post))
  } catch (err) {
    console.error('Failed to update post', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (!existing) return Response.json({ error: 'Post not found' }, { status: 404 })

  try {
    await prisma.post.delete({ where: { id: existing.id } })
    return Response.json({ success: true })
  } catch (err) {
    console.error('Failed to delete post', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
