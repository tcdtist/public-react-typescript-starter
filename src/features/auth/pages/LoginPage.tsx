import { Link } from 'react-router-dom'

import { AuthLayout } from '@/shared/components/layout/AuthLayout'

import { LoginForm } from '../components/LoginForm'

function SignupLink() {
  return (
    <>
      Or{' '}
      <Link
        to="/signup"
        aria-label="Create a new account"
        className="font-medium text-primary underline-offset-4 hover:text-primary/80 hover:underline"
      >
        create a new account
      </Link>
    </>
  )
}

function DemoCredentials() {
  return (
    <div className="mb-6 rounded-lg border-l-4 border-primary bg-muted/20 p-4">
      <p className="mb-2 text-sm font-medium text-foreground">Demo Credentials:</p>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>
          <strong>Email:</strong> user@tcdtist.com
        </p>
        <p>
          <strong>Password:</strong> tcdtist@123
        </p>
      </div>
      <p className="mt-2 text-xs italic text-muted-foreground">
        Form is pre-filled with these credentials for testing
      </p>
    </div>
  )
}

export const LoginPage = () => {
  return (
    <AuthLayout title="Sign in to your account" subtitle={<SignupLink />}>
      <DemoCredentials />
      <LoginForm />
    </AuthLayout>
  )
}
