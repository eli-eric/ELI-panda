import { useOrderLineContext } from '../context'

/**
 * Hook for managing order lines in the form.
 * This is an alias for useOrderLineContext for backwards compatibility.
 */
export const useOrderLine = () => useOrderLineContext()
