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

        login: async (_email: string, _password: string) => {
          set({ isLoading: true })
          try {
            // TODO: Implement actual login API call
            console.log('Login attempt:', _email, _password)
            const mockUser: User = { id: '1', email: _email, name: 'John Doe' }
            const mockToken = 'mock-jwt-token'

            set({
              user: mockUser,
              token: mockToken,
              isAuthenticated: true,
              isLoading: false,
            })
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
