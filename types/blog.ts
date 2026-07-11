import type { Post, PostStatus, Category } from '@prisma/client'

export type { PostStatus, Category }

// Serialized shape returned across the wire (Prisma's Date fields become ISO strings)
export type PostDTO = Omit<Post, 'author' | 'createdAt' | 'updatedAt' | 'publishedAt' | 'tags'> & {
  tags: string[]
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export type AdminView = 'posts' | 'editor'

// Form state used by the admin editor before/while a post is saved
export type PostFormState = {
  id: string | null
  title: string
  slug: string
  tags: string[]
  excerpt: string
  content: string
  featuredImage: string | null
  status: PostStatus
  category: Category
  publishedAt: string | null
  updatedAt: string | null
}

export type PostMutationPayload = {
  title: string
  slug?: string
  tags: string[]
  excerpt: string
  content: string
  featuredImage: string | null
  status: PostStatus
  category: Category
  publishedAt?: string | null
  updatedAt?: string | null
}

export type ListPostsResponse = {
  posts: PostDTO[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ApiError = { error: string; details?: Record<string, string[] | undefined> }
