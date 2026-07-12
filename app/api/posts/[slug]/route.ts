import { NextRequest } from 'next/server'
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { updatePostSchema } from '@/lib/validation'
import { toPostDTO, resolveUniqueSlug } from '@/lib/posts'
import { sanitizePostContent } from '@/lib/sanitizePostContent'
import { deleteBlobIfManaged } from '@/lib/blobStorage'

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

  const updateWithSlug = (slug: string) =>
    prisma.post.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        slug,
        tags: data.tags,
        excerpt: data.excerpt,
        content: sanitizePostContent(data.content),
        featuredImage: data.featuredImage ?? null,
        status: data.status,
        category: data.category,
        publishedAt,
      },
    })

  const isUniqueConstraintError = (err: unknown) =>
    err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002'

  try {
    let post
    try {
      post = await updateWithSlug(nextSlug)
    } catch (err) {
      // Lost a race against another concurrent update/create claiming the same slug - retry once.
      if (!isUniqueConstraintError(err) || nextSlug === existing.slug) throw err
      const retrySlug = await resolveUniqueSlug(data.slug, existing.id)
      post = await updateWithSlug(retrySlug)
    }

    const nextFeaturedImage = data.featuredImage ?? null
    if (existing.featuredImage && existing.featuredImage !== nextFeaturedImage) {
      await deleteBlobIfManaged(existing.featuredImage)
    }

    return Response.json(toPostDTO(post))
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return Response.json({ error: 'A post with this slug already exists. Please try again.' }, { status: 409 })
    }
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
    await deleteBlobIfManaged(existing.featuredImage)
    return Response.json({ success: true })
  } catch (err) {
    console.error('Failed to delete post', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
