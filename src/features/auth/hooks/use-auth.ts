import { useMutation, useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import { authApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'

export const useLogin = () => {
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: () => {
      // Redirect to the page user was trying to access or home
      const from = (location.state as { from?: string })?.from || '/'
      navigate(from, { replace: true })
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
