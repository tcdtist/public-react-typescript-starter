import { useState } from 'react'

import { useEventListener } from './use-event-listener'

/**
 * useHover hook
 *
 * Tracks whether an element is being hovered
 */
export function useHover<T extends HTMLElement = HTMLElement>(
  elementRef: React.RefObject<T>
): boolean {
  const [value, setValue] = useState<boolean>(false)

  const handleMouseEnter = () => setValue(true)
  const handleMouseLeave = () => setValue(false)

  useEventListener('mouseenter', handleMouseEnter, elementRef?.current)
  useEventListener('mouseleave', handleMouseLeave, elementRef?.current)

  return value
}
