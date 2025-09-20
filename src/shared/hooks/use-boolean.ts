import { useCallback, useState } from 'react'

type UseBooleanReturn = [
  value: boolean,
  setTrue: () => void,
  setFalse: () => void,
  setToggle: () => void,
]

export function useBoolean(defaultValue = false): UseBooleanReturn {
  if (typeof defaultValue !== 'boolean') {
    throw new Error('defaultValue must be `true` or `false`')
  }
  const [value, setValue] = useState(defaultValue)

  const setTrue = useCallback(() => {
    setValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setValue(false)
  }, [])

  const setToggle = useCallback(() => {
    setValue((x) => !x)
  }, [])

  return [value, setTrue, setFalse, setToggle]
}
