import { AuthLayout } from '@/shared/components/layout/AuthLayout'

import { SignupForm } from '../components/SignupForm'

export const SignupPage = () => {
  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:text-primary/80 hover:underline"
          >
            Sign in here
          </a>
        </>
      }
    >
      <SignupForm />
    </AuthLayout>
  )
}
