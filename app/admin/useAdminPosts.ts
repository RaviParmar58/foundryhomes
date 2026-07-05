'use client'

import { useCallback, useEffect, useState } from 'react'
import type { PostDTO, PostMutationPayload, ListPostsResponse, ApiError } from '@/types/blog'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = data as ApiError
    throw new Error(err.error || 'Request failed')
  }
  return data as T
}

export function useAdminPosts() {
  const [posts, setPosts] = useState<PostDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await request<ListPostsResponse>('/api/posts?pageSize=100')
      setPosts(data.posts)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const createPost = async (payload: PostMutationPayload) => {
    const created = await request<PostDTO>('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    await refresh()
    return created
  }

  const updatePost = async (originalSlug: string, payload: PostMutationPayload) => {
    const updated = await request<PostDTO>(`/api/posts/${originalSlug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    await refresh()
    return updated
  }

  const deletePost = async (slug: string) => {
    await request<{ success: true }>(`/api/posts/${slug}`, { method: 'DELETE' })
    await refresh()
  }

  return { posts, loading, error, refresh, createPost, updatePost, deletePost }
}
