import { useCallback } from 'react'

import { useGlobalSearchStore } from '../store/useGlobalSearchStore'

/**
 * Hook for opening the global search modal
 * Provides a reusable callback that can be used across the app
 * @returns Callback function that opens the global search modal
 */
export const useOpenGlobalSearch = () => {
    const setOpen = useGlobalSearchStore(state => state.setOpen)

    const openGlobalSearch = useCallback(() => {
        setOpen(true)
    }, [setOpen])

    return openGlobalSearch
}
