import axios from 'axios'

// JSONPlaceholder API base URL
const JSONPLACEHOLDER_API = 'https://jsonplaceholder.typicode.com'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

// Create axios instance for JSONPlaceholder API
const postsApi = axios.create({
  baseURL: JSONPLACEHOLDER_API,
  timeout: 10000,
})

// Posts API
export const postsService = {
  // Get all posts
  getAllPosts: async (): Promise<Post[]> => {
    const response = await postsApi.get<Post[]>('/posts')
    return response.data
  },

  // Get posts with pagination
  getPosts: async (page = 1, limit = 10): Promise<Post[]> => {
    const response = await postsApi.get<Post[]>('/posts', {
      params: {
        _page: page,
        _limit: limit,
      },
    })
    return response.data
  },

  // Get single post
  getPost: async (id: number): Promise<Post> => {
    const response = await postsApi.get<Post>(`/posts/${id}`)
    return response.data
  },

  // Get posts by user
  getPostsByUser: async (userId: number): Promise<Post[]> => {
    const response = await postsApi.get<Post[]>('/posts', {
      params: { userId },
    })
    return response.data
  },

  // Get post comments
  getPostComments: async (postId: number): Promise<Comment[]> => {
    const response = await postsApi.get<Comment[]>(`/posts/${postId}/comments`)
    return response.data
  },
}

// Users API
export const usersService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await postsApi.get<User[]>('/users')
    return response.data
  },

  // Get single user
  getUser: async (id: number): Promise<User> => {
    const response = await postsApi.get<User>(`/users/${id}`)
    return response.data
  },
}

// Export the axios instance for direct use if needed
export { postsApi }
