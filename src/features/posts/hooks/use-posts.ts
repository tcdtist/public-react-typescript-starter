import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import {
  type Comment,
  type Post,
  type User,
  postsService,
  usersService,
} from '@/features/posts/api/posts.api'

// Re-export types for convenience
export type { Post, User, Comment }

// React Query keys
export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...postsKeys.lists(), { filters }] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (id: number) => [...postsKeys.details(), id] as const,
  comments: (postId: number) => [...postsKeys.detail(postId), 'comments'] as const,
}

export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  details: () => [...usersKeys.all, 'detail'] as const,
  detail: (id: number) => [...usersKeys.details(), id] as const,
}

// Posts hooks
export function usePosts(page = 1, limit = 10) {
  return useQuery({
    queryKey: postsKeys.list({ page, limit }),
    queryFn: () => postsService.getPosts(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useAllPosts() {
  return useQuery({
    queryKey: postsKeys.lists(),
    queryFn: () => postsService.getAllPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postsKeys.detail(id),
    queryFn: () => postsService.getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function usePostsByUser(userId: number) {
  return useQuery({
    queryKey: postsKeys.list({ userId }),
    queryFn: () => postsService.getPostsByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function usePostComments(postId: number) {
  return useQuery({
    queryKey: postsKeys.comments(postId),
    queryFn: () => postsService.getPostComments(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Infinite query for posts with pagination
export function useInfinitePosts(limit = 10) {
  return useInfiniteQuery({
    queryKey: postsKeys.list({ limit }),
    queryFn: ({ pageParam = 1 }) => postsService.getPosts(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      // JSONPlaceholder has 100 posts total
      const totalPosts = 100
      const currentPage = allPages.length
      const hasMore = currentPage * limit < totalPosts

      return hasMore ? currentPage + 1 : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Users hooks
export function useUsers() {
  return useQuery({
    queryKey: usersKeys.lists(),
    queryFn: () => usersService.getAllUsers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.getUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

// Combined hook to get post with user data
export function usePostWithUser(postId: number) {
  const { data: post, ...postQuery } = usePost(postId)
  const { data: user, ...userQuery } = useUser(post?.userId || 0)

  return {
    post,
    user,
    isLoading: postQuery.isLoading || userQuery.isLoading,
    error: postQuery.error || userQuery.error,
    isError: postQuery.isError || userQuery.isError,
    isFetching: postQuery.isFetching || userQuery.isFetching,
    isPending: postQuery.isPending || userQuery.isPending,
    isSuccess: postQuery.isSuccess && userQuery.isSuccess,
  }
}
