import { createBrowserRouter } from 'react-router-dom'

import { LoginPage } from '@/features/auth/pages/LoginPage'
import { SignupPage } from '@/features/auth/pages/SignupPage'
import { ChatPage } from '@/features/chat/pages/ChatPage'
import { ProfilePage } from '@/features/profile/pages/ProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page - Coming Soon!</div>,
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
    element: <ProfilePage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
])
