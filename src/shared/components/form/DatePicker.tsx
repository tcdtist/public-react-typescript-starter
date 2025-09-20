import { forwardRef } from 'react'

import dayjs from 'dayjs'

import { cn } from '@/shared/utils/functions'

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  value?: Date | string
  onDateChange?: (date: Date | null) => void
  format?: string
  showTime?: boolean
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      value,
      onDateChange,
      onChange,
      format: _format = 'YYYY-MM-DD',
      showTime = false,
      ...props
    },
    ref
  ) => {
    const inputType = showTime ? 'datetime-local' : 'date'

    const formatValue = (val: Date | string | undefined) => {
      if (!val) return ''

      const date = dayjs(val)
      if (!date.isValid()) return ''

      if (showTime) {
        return date.format('YYYY-MM-DDTHH:mm')
      }
      return date.format('YYYY-MM-DD')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      if (inputValue) {
        const date = dayjs(inputValue).toDate()
        onDateChange?.(date)
      } else {
        onDateChange?.(null)
      }

      onChange?.(e)
    }

    return (
      <input
        type={inputType}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        value={formatValue(value)}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
DatePicker.displayName = 'DatePicker'

export { DatePicker }
