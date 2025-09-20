import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/shared/utils/functions'

export interface SelectInfiniteOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectInfiniteProps {
  options: SelectInfiniteOption[]
  value?: string
  onValueChange?: (value: string) => void
  onLoadMore?: () => void
  hasMore?: boolean
  loading?: boolean
  placeholder?: string
  className?: string
  searchable?: boolean
  onSearch?: (query: string) => void
}

const SelectInfinite = forwardRef<HTMLDivElement, SelectInfiniteProps>(
  (
    {
      className,
      options,
      value,
      onValueChange,
      onLoadMore,
      hasMore = false,
      loading = false,
      placeholder = 'Select an option...',
      searchable = false,
      onSearch,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedOption, setSelectedOption] = useState<SelectInfiniteOption | null>(
      options.find((opt) => opt.value === value) || null
    )
    const listRef = useRef<HTMLDivElement>(null)

    const handleSelect = (option: SelectInfiniteOption) => {
      setSelectedOption(option)
      onValueChange?.(option.value)
      setIsOpen(false)
      setSearchQuery('')
    }

    const handleScroll = useCallback(() => {
      if (!listRef.current || !hasMore || loading) return

      const { scrollTop, scrollHeight, clientHeight } = listRef.current
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        onLoadMore?.()
      }
    }, [hasMore, loading, onLoadMore])

    const handleSearch = (query: string) => {
      setSearchQuery(query)
      onSearch?.(query)
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref && 'current' in ref && ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false)
          setSearchQuery('')
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      }

      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, ref])

    return (
      <div className={cn('relative', className)} ref={ref} {...props}>
        <button
          type="button"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={cn(!selectedOption && 'text-muted-foreground')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border border-input bg-background shadow-md">
            {searchable && (
              <div className="border-b border-input p-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-8 w-full rounded border-none bg-transparent px-2 text-sm outline-none"
                />
              </div>
            )}
            <div ref={listRef} onScroll={handleScroll} className="max-h-48 overflow-y-auto p-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    'flex w-full items-center px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground',
                    option.disabled && 'cursor-not-allowed opacity-50',
                    selectedOption?.value === option.value && 'bg-accent text-accent-foreground'
                  )}
                  onClick={() => !option.disabled && handleSelect(option)}
                  disabled={option.disabled}
                >
                  {option.label}
                </button>
              ))}
              {loading && (
                <div className="flex items-center justify-center p-2">
                  <div className="text-sm text-muted-foreground">Loading...</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
SelectInfinite.displayName = 'SelectInfinite'

export { SelectInfinite }
