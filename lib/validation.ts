import { z } from 'zod'
import { PostStatus, Category } from '@prisma/client'
import { isVercelBlobUrl } from '@/lib/blobStorage'

const slugField = z
  .string()
  .min(1, 'Slug is required')
  .max(200)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase, alphanumeric, and hyphen-separated')

const featuredImageField = z
  .string()
  .refine(
    (val) => val.startsWith('/assets/') || isVercelBlobUrl(val),
    'Featured image must be an uploaded file or site asset path'
  )
  .nullable()
  .optional()

const publishedAtField = z.string().nullable().optional()

export const contactEnquirySchema = z.object({
  firstName: z.string().trim().max(80, 'First name is too long').optional().default(''),
  lastName: z.string().trim().max(80, 'Last name is too long').optional().default(''),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email').max(160),
  phone: z.string().trim().max(40, 'Phone number is too long').optional().default(''),
  enquiryType: z.string().trim().max(120, 'Enquiry type is too long').optional().default('General enquiry'),
  message: z.string().trim().min(1, 'Message is required').max(4000, 'Message is too long'),
  source: z.string().trim().max(80).optional().default('Website contact form'),
  company: z.string().trim().max(120).optional().default(''),
})

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: slugField.optional(),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  excerpt: z.string().min(1, 'Excerpt is required').max(300),
  content: z.string().min(1, 'Content is required'),
  featuredImage: featuredImageField,
  status: z.nativeEnum(PostStatus).default('DRAFT'),
  category: z.nativeEnum(Category).default('BUILDING_TIPS'),
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
  category: z.nativeEnum(Category),
  publishedAt: publishedAtField,
  updatedAt: z.string().min(1, 'Missing updatedAt'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>
