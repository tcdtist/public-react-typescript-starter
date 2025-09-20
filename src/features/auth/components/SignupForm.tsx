import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormItem } from '@/shared/components/form/FormItem'
import { Button } from '@/shared/components/ui/Button'

import { useSignup } from '../hooks/use-auth'

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof signupSchema>

export const SignupForm = () => {
  const signupMutation = useSignup()

  const methods = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = (data: SignupFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signupData } = data
    signupMutation.mutate(signupData)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem.Input name="name" label="Name" placeholder="Enter your name" required />

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

        <FormItem.InputPassword
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          required
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </Button>

        {signupMutation.error && (
          <p className="text-center text-sm text-red-500">
            {signupMutation.error.message || 'Signup failed'}
          </p>
        )}
      </form>
    </FormProvider>
  )
}
