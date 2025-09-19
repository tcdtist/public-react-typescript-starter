import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'

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
  const [showPassword, setShowPassword] = useState(false)
  const signupMutation = useSignup()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: SignupFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...signupData } = data
    signupMutation.mutate(signupData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name
        </label>
        <Input id="name" type="text" placeholder="Enter your name" {...register('name')} />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="Enter your email" {...register('email')} />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password')}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating account...' : 'Sign Up'}
      </Button>

      {signupMutation.error && (
        <p className="text-center text-sm text-red-500">
          {signupMutation.error.message || 'Signup failed'}
        </p>
      )}
    </form>
  )
}
