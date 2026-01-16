import { useEffect, useMemo, useRef } from 'react'

import { PaginationV2 as PaginationComponent } from '@/components/table/PaginationV2.comp'
import { usePagination } from '@/hooks/table/usePagination'
import useTableStateStore from '@/store/useTableStateStore'
import type { PaginationSettings } from '@/types/pagination'
import { PAGE_SIZE_OPTIONS } from '@/types/pagination'

interface PaginationV2Props {
  tableId: string
  settings?: PaginationSettings & {
    showPageSizeSelector?: boolean
  }
}

/**
 * Pagination container component (V2)
 *
 * Uses event-driven usePagination hook - eliminates 4 useEffects from old version.
 * Single useEffect only for reset on search/filter/sort change.
 *
 * Same interface as old Pagination for drop-in replacement.
 */
export function PaginationV2({ tableId, settings }: PaginationV2Props) {
  const {
    enableQueryURL,
    total = 0,
    pageSizeDefault = 50,
    pageSizeOptions = PAGE_SIZE_OPTIONS,
    showPageSizeSelector = true
  } = settings || {}

  const paginationState = usePagination({
    tableId,
    enableQueryURL,
    total,
    pageSizeDefault,
    pageSizeOptions
  })

  // Track search/filter/sort changes to reset pagination
  const { instances } = useTableStateStore()
  const search = instances[tableId]?.search || ''
  const filter = instances[tableId]?.filter || ''
  const sortBy = instances[tableId]?.sortBy || ''

  // Memoize columnFilter to prevent reference changes on every render
  const columnFilterRaw = instances[tableId]?.columnFilter
  const columnFilterKey = useMemo(
    () => JSON.stringify(columnFilterRaw || []),
    [columnFilterRaw]
  )

  // Use refs to track previous values and avoid reset on mount
  const prevValuesRef = useRef({ search, filter, sortBy, columnFilterKey })
  const isInitialMount = useRef(true)

  // Single useEffect - only for reset on search/filter/sort change
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      prevValuesRef.current = { search, filter, sortBy, columnFilterKey }
      return
    }

    // Check if any tracked value changed
    const prev = prevValuesRef.current
    const hasChanged =
      prev.search !== search ||
      prev.filter !== filter ||
      prev.sortBy !== sortBy ||
      prev.columnFilterKey !== columnFilterKey

    if (hasChanged && paginationState.pagination.page !== 1) {
      paginationState.resetPagination()
    }

    // Update refs for next comparison
    prevValuesRef.current = { search, filter, sortBy, columnFilterKey }
  }, [search, filter, sortBy, columnFilterKey, paginationState])

  return (
    <PaginationComponent
      {...paginationState}
      total={total}
      pageSizeOptions={pageSizeOptions}
      showPageSizeSelector={showPageSizeSelector}
    />
  )
}
