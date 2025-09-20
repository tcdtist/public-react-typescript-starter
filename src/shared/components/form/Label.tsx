import { forwardRef } from 'react'

import { cn } from '@/shared/utils/functions'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className
    )}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
