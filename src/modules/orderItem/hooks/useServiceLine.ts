import { useServiceLineContext } from '../context'

/**
 * Hook for managing service lines in the form.
 * This is an alias for useServiceLineContext for backwards compatibility.
 */
export const useServiceLine = () => useServiceLineContext()
