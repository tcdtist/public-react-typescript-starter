import { forwardRef, useState } from 'react'

import { IoEye, IoEyeOff } from 'react-icons/io5'

import { cn } from '@/shared/utils/functions'

export interface InputPasswordProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  showPasswordToggle?: boolean
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, showPasswordToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            showPasswordToggle && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <IoEyeOff className="h-4 w-4" /> : <IoEye className="h-4 w-4" />}
          </button>
        )}
      </div>
    )
  }
)
InputPassword.displayName = 'InputPassword'

export { InputPassword }
