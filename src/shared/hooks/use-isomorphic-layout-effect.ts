import { useEffect, useLayoutEffect } from 'react'

/**
 * useIsomorphicLayoutEffect hook
 *
 * Uses useLayoutEffect on client and useEffect on server to avoid hydration warnings
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
