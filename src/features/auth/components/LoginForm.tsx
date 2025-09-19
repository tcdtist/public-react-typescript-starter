import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/shared/components/Button'
import { Input } from '@/shared/components/Input'

import { useLogin } from '../hooks/use-auth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>

      {loginMutation.error && (
        <p className="text-center text-sm text-red-500">
          {loginMutation.error.message || 'Login failed'}
        </p>
      )}
    </form>
  )
}
