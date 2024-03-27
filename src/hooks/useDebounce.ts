import { useEffect, useState } from 'react'

export const useDebounce = (value: any, delay: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [value, delay])

  return debouncedValue
}
