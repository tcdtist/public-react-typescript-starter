import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  login: (_email: string, _password: string) => Promise<void>
  logout: () => void
  setUser: (_user: User) => void
  setToken: (_token: string) => void
  setLoading: (_loading: boolean) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,

        login: async (email: string, password: string) => {
          set({ isLoading: true })
          try {
            // Mock authentication with default credentials
            console.log('Login attempt:', email, password)

            // Default credentials: user@tcdtist.com / tcdtist@123
            if (email === 'user@tcdtist.com' && password === 'tcdtist@123') {
              const mockUser: User = {
                id: '1',
                email: email,
                name: 'TCDTIST User',
              }
              const mockToken = 'mock-jwt-token-' + Date.now()

              // Simulate API delay
              await new Promise((resolve) => setTimeout(resolve, 1000))

              set({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                isLoading: false,
              })
            } else {
              throw new Error('Invalid credentials. Use user@tcdtist.com / tcdtist@123')
            }
          } catch (error) {
            set({ isLoading: false })
            throw error
          }
        },

        logout: () => {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          })
        },

        setUser: (_user: User) => {
          set({ user: _user, isAuthenticated: !!_user })
        },

        setToken: (_token: string) => {
          set({ token: _token })
        },

        setLoading: (_loading: boolean) => {
          set({ isLoading: _loading })
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'auth-store' }
  )
)
