import { useQueryState } from 'next-usequerystate'
import { useCallback, useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'
import type {
  PaginationSettings,
  PaginationState,
  UsePaginationReturn
} from '@/types/pagination'
import {
  calculateDisplayRange,
  calculateTotalPages,
  clampPage,
  PAGE_SIZE_OPTIONS,
  parseLegacyPagination
} from '@/types/pagination'

interface UsePaginationOptions extends PaginationSettings {
  tableId: string
}

/**
 * Event-driven pagination hook
 *
 * Source of truth:
 * - enableQueryURL=true  -> URL is source of truth
 * - enableQueryURL=false -> Store is source of truth
 *
 * NO useEffects for synchronization - all updates are event-driven
 */
export function usePagination({
  tableId,
  enableQueryURL = false,
  total = 0,
  pageSizeDefault = 50,
  pageSizeOptions = PAGE_SIZE_OPTIONS
}: UsePaginationOptions): UsePaginationReturn {
  // URL state (only used when enableQueryURL=true)
  const [pageQuery, setPageQuery] = useQueryState('page')
  const [pageSizeQuery, setPageSizeQuery] = useQueryState('pageSize')

  // Store state and actions
  const { instances, setPaginationState } = useTableStateStore()

  // Determine current pagination based on source of truth
  const pagination = useMemo((): PaginationState => {
    if (enableQueryURL) {
      // URL is source of truth
      const page = pageQuery ? parseInt(pageQuery, 10) : 1
      const pageSize = pageSizeQuery ? parseInt(pageSizeQuery, 10) : pageSizeDefault
      return {
        page: isNaN(page) || page < 1 ? 1 : page,
        pageSize: isNaN(pageSize) || pageSize < 1 ? pageSizeDefault : pageSize
      }
    }

    // Store is source of truth
    const storeState = instances[tableId]?.paginationState
    if (storeState) return storeState

    // Fallback: try legacy format
    const legacyState = instances[tableId]?.pagination
    if (legacyState) {
      return parseLegacyPagination(legacyState, {
        page: 1,
        pageSize: pageSizeDefault
      })
    }

    return { page: 1, pageSize: pageSizeDefault }
  }, [
    enableQueryURL,
    pageQuery,
    pageSizeQuery,
    pageSizeDefault,
    instances,
    tableId
  ])

  // Computed values
  const totalPages = useMemo(
    () => calculateTotalPages(total, pagination.pageSize),
    [total, pagination.pageSize]
  )

  const isFirstPage = pagination.page === 1
  const isLastPage = pagination.page >= totalPages || total === 0

  const { from: fromItem, to: toItem } = useMemo(
    () => calculateDisplayRange(pagination.page, pagination.pageSize, total),
    [pagination.page, pagination.pageSize, total]
  )

  // Event-driven update function (no useEffect!)
  const updatePagination = useCallback(
    (newState: PaginationState) => {
      if (enableQueryURL) {
        // Update URL (source of truth)
        setPageQuery(newState.page.toString())
        setPageSizeQuery(newState.pageSize.toString())
      }
      // Always update store for consistency and for useQueryManager to read
      setPaginationState(tableId, newState)
    },
    [enableQueryURL, setPageQuery, setPageSizeQuery, setPaginationState, tableId]
  )

  // Navigation actions
  const goToPreviousPage = useCallback(() => {
    if (pagination.page > 1) {
      updatePagination({ ...pagination, page: pagination.page - 1 })
    }
  }, [pagination, updatePagination])

  const goToNextPage = useCallback(() => {
    if (pagination.page < totalPages) {
      updatePagination({ ...pagination, page: pagination.page + 1 })
    }
  }, [pagination, totalPages, updatePagination])

  const goToPage = useCallback(
    (page: number) => {
      const validPage = clampPage(page, totalPages)
      updatePagination({ ...pagination, page: validPage })
    },
    [pagination, totalPages, updatePagination]
  )

  const setPageSize = useCallback(
    (size: number) => {
      // Validate size is in options, otherwise use default
      const validSize = pageSizeOptions.includes(size) ? size : pageSizeDefault
      // Reset to page 1 when changing page size
      updatePagination({ page: 1, pageSize: validSize })
    },
    [pageSizeOptions, pageSizeDefault, updatePagination]
  )

  const resetPagination = useCallback(() => {
    updatePagination({ page: 1, pageSize: pageSizeDefault })
  }, [pageSizeDefault, updatePagination])

  return {
    pagination,
    goToPreviousPage,
    goToNextPage,
    goToPage,
    setPageSize,
    resetPagination,
    totalPages,
    isFirstPage,
    isLastPage,
    fromItem,
    toItem
  }
}

/**
 * Hook to reset pagination when filters/search change
 * Used by SearchBar and filter components
 */
export function useResetPaginationOnChange(tableId: string) {
  const setPaginationState = useTableStateStore(state => state.setPaginationState)

  return useCallback(() => {
    // Get current state at call time to avoid stale closure
    const current = useTableStateStore.getState().instances[tableId]?.paginationState
    if (current && current.page !== 1) {
      setPaginationState(tableId, { ...current, page: 1 })
    }
  }, [tableId, setPaginationState])
}
