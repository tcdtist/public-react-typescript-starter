import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormItem } from '@/shared/components/form/FormItem'
import { Button } from '@/shared/components/ui/Button'

import { useLogin } from '../hooks/use-auth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const loginMutation = useLogin()

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem.Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormItem.InputPassword
          name="password"
          label="Password"
          placeholder="Enter your password"
          required
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>

        {loginMutation.error && (
          <p className="text-center text-sm text-red-500">
            {loginMutation.error.message || 'Login failed'}
          </p>
        )}
      </form>
    </FormProvider>
  )
}
