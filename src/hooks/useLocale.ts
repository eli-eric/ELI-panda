import { useMemo } from 'react'

export const useLocale = () =>
    useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.navigator.language
        }
        return 'en'
    }, [])
