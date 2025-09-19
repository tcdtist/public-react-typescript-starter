import { useMutation, useQuery } from '@tanstack/react-query'

import { authApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

export const useLogin = () => {
  const { setUser, setToken, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: authApi.login,
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setUser(data.user)
      setToken(data.token)
      setLoading(false)
    },
    onError: () => {
      setLoading(false)
    },
  })
}

export const useSignup = () => {
  const { setUser, setToken, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: authApi.signup,
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setUser(data.user)
      setToken(data.token)
      setLoading(false)
    },
    onError: () => {
      setLoading(false)
    },
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout()
    },
  })
}

export const useCurrentUser = () => {
  const { token, isAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: ['current-user'],
    queryFn: authApi.me,
    enabled: !!token && isAuthenticated,
  })
}
