import { useCallback, useLayoutEffect, useRef } from 'react'

/**
 * useEventCallback hook
 *
 * Returns a memoized callback that has access to fresh values but maintains referential equality.
 * Useful for event handlers that need to access current state but shouldn't cause re-renders when passed as deps.
 */
export function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef<(...args: Args) => Return>(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useLayoutEffect(() => {
    ref.current = fn
  })

  return useCallback((...args: Args) => ref.current(...args), [])
}
