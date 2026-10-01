import { useEffect, useMemo, useRef } from 'react'

import { PaginationV2 as PaginationComponent } from '@/components/table/PaginationV2.comp'
import { usePagination } from '@/hooks/table/usePagination'
import useTableStateStore from '@/store/useTableStateStore'
import type { PaginationSettings } from '@/types/pagination'
import { PAGE_SIZE_OPTIONS, resolvePageSizeDefault } from '@/types/pagination'
import { parseColumnFilterParam, parseJsonParam, readQueryParamFromUrl } from '@/utils/urlQuery'

interface PaginationV2Props {
    tableId: string
    settings?: PaginationSettings & {
        showPageSizeSelector?: boolean
    }
    /** Callback fired when page changes (for scroll-to-top, analytics, etc.) */
    onPageChange?: (page: number) => void
}

/**
 * Pagination container component (V2)
 *
 * Uses event-driven usePagination hook - eliminates 4 useEffects from old version.
 * Single useEffect only for reset on search/filter/sort change.
 *
 * Same interface as old Pagination for drop-in replacement.
 */
/**
 * The URL's sort in the same canonical form the store holds it in, so a
 * hand-formatted `?sortBy` (extra whitespace, reordered keys) still compares
 * equal once it round-trips through `JSON.stringify`.
 */
const readUrlSortKey = (): string => {
    const parsed = parseJsonParam<unknown>(readQueryParamFromUrl('sortBy'), [])
    return Array.isArray(parsed) && parsed.length > 0 ? JSON.stringify(parsed) : ''
}

export function PaginationV2({ tableId, settings, onPageChange }: PaginationV2Props) {
    const {
        enableQueryURL,
        total = 0,
        pageSizeOptions = PAGE_SIZE_OPTIONS,
        showPageSizeSelector = true,
    } = settings || {}

    const pageSizeDefault = resolvePageSizeDefault(tableId, settings?.pageSizeDefault)

    const paginationHook = usePagination({
        tableId,
        enableQueryURL,
        total,
        pageSizeDefault,
        pageSizeOptions,
        onPageChange,
    })

    const { pagination, resetPagination } = paginationHook

    // Track search/filter/sort changes to reset pagination
    const { instances } = useTableStateStore()
    const search = instances[tableId]?.search || ''
    const filter = instances[tableId]?.filter || ''
    // Compare the serialized sort, not the store's array: the array identity says
    // nothing useful once the sort is rehydrated from elsewhere.
    const sortBy = instances[tableId]?.sortByQueryString || ''

    // Memoize columnFilter to prevent reference changes on every render
    const columnFilterRaw = instances[tableId]?.columnFilter
    const columnFilterKey = useMemo(() => JSON.stringify(columnFilterRaw || []), [columnFilterRaw])

    // Baseline for "did the user change something", captured from the store as it
    // is at mount.
    const prevValuesRef = useRef<{
        search: string
        filter: string | object
        sortBy: string
        columnFilterKey: string
    } | null>(null)

    if (prevValuesRef.current === null) {
        prevValuesRef.current = { search, filter, sortBy, columnFilterKey }
    }

    // What the URL asked for when we mounted. A deep link's filter/sort only
    // reaches the store a commit later, and that late arrival must not read as a
    // user edit — it would knock the URL's own ?page back to 1 (ELIPANDA-505).
    // Comparing against the URL rather than seeding the baseline from it means we
    // do not have to assume the table's filter/sort hooks are URL-synced too:
    // LeavesPanel pairs a URL-enabled PaginationV2 with a table that is not.
    const hydrationValuesRef = useRef<{ sortBy: string; columnFilterKey: string } | null>(null)

    if (hydrationValuesRef.current === null) {
        hydrationValuesRef.current = enableQueryURL
            ? {
                  sortBy: readUrlSortKey(),
                  columnFilterKey: JSON.stringify(
                      parseColumnFilterParam(readQueryParamFromUrl('filter')),
                  ),
              }
            : { sortBy: '', columnFilterKey: '[]' }
    }

    const isInitialMount = useRef(true)

    // Single useEffect - only for reset on search/filter/sort change
    useEffect(() => {
        // Skip on initial mount — the baseline seeded above already describes the
        // state this table is hydrating into.
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }

        // Check if any tracked value changed. Landing exactly on what the URL
        // already advertised at mount is hydration, not an edit.
        const prev = prevValuesRef.current
        const hydration = hydrationValuesRef.current
        if (!prev || !hydration) return
        const hasChanged =
            prev.search !== search ||
            prev.filter !== filter ||
            (prev.sortBy !== sortBy && sortBy !== hydration.sortBy) ||
            (prev.columnFilterKey !== columnFilterKey &&
                columnFilterKey !== hydration.columnFilterKey)

        if (hasChanged && pagination.page !== 1) {
            resetPagination()
        }

        // Update refs for next comparison
        prevValuesRef.current = { search, filter, sortBy, columnFilterKey }
    }, [search, filter, sortBy, columnFilterKey, pagination.page, resetPagination])

    return (
        <PaginationComponent
            {...paginationHook}
            total={total}
            pageSizeOptions={pageSizeOptions}
            showPageSizeSelector={showPageSizeSelector}
        />
    )
}
