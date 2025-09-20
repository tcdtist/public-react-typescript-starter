import { AuthLayout } from '@/shared/components/layout/AuthLayout'

import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Or{' '}
          <a
            href="/signup"
            className="font-medium text-primary underline-offset-4 hover:text-primary/80 hover:underline"
          >
            create a new account
          </a>
        </>
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
