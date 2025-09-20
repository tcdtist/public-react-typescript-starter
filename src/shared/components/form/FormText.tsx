import { forwardRef } from 'react'

import { cn } from '@/shared/utils/functions'

// Label Component
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  optional?: boolean
}

export const Label = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, required, optional, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
      {optional && <span className="ml-1 text-muted-foreground">(optional)</span>}
    </label>
  )
)
Label.displayName = 'FormLabel'

// Description Component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Description = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
Description.displayName = 'FormDescription'

// Helper Component
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface FormHelperProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const Helper = forwardRef<HTMLParagraphElement, FormHelperProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-xs text-muted-foreground', className)} {...props} />
  )
)
Helper.displayName = 'FormHelper'
