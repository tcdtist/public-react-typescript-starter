import { useCallback, useEffect, useRef } from 'react'

/**
 * useIsMounted hook
 *
 * Returns a function that tells whether the component is still mounted.
 * Useful for avoiding state updates on unmounted components.
 */
export function useIsMounted() {
  const isMountedRef = useRef(true)

  const isMounted = useCallback(() => isMountedRef.current, [])

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  return isMounted
}
