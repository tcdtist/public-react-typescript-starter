import { createBrowserRouter } from 'react-router-dom'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { SignupForm } from '@/features/auth/components/SignupForm'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page - Coming Soon!</div>,
  },
  {
    path: '/login',
    element: (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-center text-3xl font-bold">Sign In</h2>
          <LoginForm />
        </div>
      </div>
    ),
  },
  {
    path: '/signup',
    element: (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-center text-3xl font-bold">Sign Up</h2>
          <SignupForm />
        </div>
      </div>
    ),
  },
  {
    path: '/profile',
    element: <div>Profile Page - Coming Soon!</div>,
  },
  {
    path: '/chat',
    element: <div>Chat Page - Coming Soon!</div>,
  },
])
