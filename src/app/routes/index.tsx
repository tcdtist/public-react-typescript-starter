import { createBrowserRouter } from 'react-router-dom'

import { LoginPage } from '@/features/auth/pages/LoginPage'
import { SignupPage } from '@/features/auth/pages/SignupPage'
import { ChatPage } from '@/features/chat/pages/ChatPage'
import { AboutPage } from '@/features/common/pages/AboutPage'
import { ContactPage } from '@/features/common/pages/ContactPage'
import { HomePage } from '@/features/common/pages/HomePage'
import { PostDetailPage } from '@/features/posts/pages/PostDetailPage'
import { PostsPage } from '@/features/posts/pages/PostsPage'
import { ProfilePage } from '@/features/profile/pages/ProfilePage'
import { ProtectedRoute } from '@/shared/components/auth/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/posts',
    element: (
      <ProtectedRoute>
        <PostsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/posts/:id',
    element: (
      <ProtectedRoute>
        <PostDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/chat',
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
  },
])
