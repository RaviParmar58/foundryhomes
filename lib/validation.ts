import { z } from 'zod'
import { PostStatus } from '@prisma/client'

const slugField = z
  .string()
  .min(1, 'Slug is required')
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, and hyphen-separated')

const featuredImageField = z
  .string()
  .regex(/^\/(?:uploads|assets)\//, 'Featured image must be an uploaded file or site asset path')
  .nullable()
  .optional()

const publishedAtField = z.string().nullable().optional()

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: slugField.optional(),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  excerpt: z.string().min(1, 'Excerpt is required').max(300),
  content: z.string().min(1, 'Content is required'),
  featuredImage: featuredImageField,
  status: z.nativeEnum(PostStatus).default('DRAFT'),
  publishedAt: publishedAtField,
})

export const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: slugField,
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  excerpt: z.string().min(1, 'Excerpt is required').max(300),
  content: z.string().min(1, 'Content is required'),
  featuredImage: featuredImageField,
  status: z.nativeEnum(PostStatus),
  publishedAt: publishedAtField,
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
