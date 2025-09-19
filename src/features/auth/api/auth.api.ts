import { axiosInstance } from '@/shared/lib/axios'

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
  }
  token: string
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/signup', data)
    return response.data
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post('/auth/logout')
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await axiosInstance.post('/auth/refresh')
    return response.data
  },

  me: async (): Promise<AuthResponse['user']> => {
    const response = await axiosInstance.get('/auth/me')
    return response.data
  },
}
