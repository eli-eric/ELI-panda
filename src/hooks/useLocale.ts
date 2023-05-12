import { useMemo } from 'react'

const useLocale = () =>
  useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.navigator.language
    }
    return 'en'
  }, [])

export default useLocale
