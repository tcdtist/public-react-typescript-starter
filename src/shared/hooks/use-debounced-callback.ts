/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type DebouncedState,
  type Options,
  useDebouncedCallback as useDebouncedCallbackLib,
} from 'use-debounce'

export const DEBOUNCE_DELAY = 250

export const DEBOUNCE_OPTIONS: Options = {
  leading: true,
  trailing: false,
}

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  func: T,
  delay: number = DEBOUNCE_DELAY,
  options: Options = DEBOUNCE_OPTIONS
): DebouncedState<T> {
  return useDebouncedCallbackLib(func, delay, options)
}
