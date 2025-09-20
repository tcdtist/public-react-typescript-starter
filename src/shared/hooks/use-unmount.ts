import { useEffect, useRef } from 'react'

/**
 * useUnmount hook
 *
 * Executes a callback when the component is unmounted
 */
export function useUnmount(callback: () => void): void {
  const callbackRef = useRef(callback)

  // Update ref to latest callback
  callbackRef.current = callback

  useEffect(() => {
    return () => {
      callbackRef.current()
    }
  }, [])
}
