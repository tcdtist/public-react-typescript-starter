import { motion } from 'framer-motion'
import { FiLoader, FiLock } from 'react-icons/fi'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { Container } from '@/shared/components/layout/Container'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-3 text-muted-foreground"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <FiLoader className="h-6 w-6" />
          </motion.div>
          <span>Checking authentication...</span>
        </motion.div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    if (fallback) return <>{fallback}</>
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}

export function AuthRequired({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated || !user) {
    if (fallback) return <>{fallback}</>

    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted"
            >
              <FiLock className="h-10 w-10 text-muted-foreground" />
            </motion.div>

            <h2 className="mb-4 text-2xl font-bold">Authentication Required</h2>
            <p className="mb-6 text-muted-foreground">
              You need to be logged in to access this content.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign In
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    )
  }

  return <>{children}</>
}
