import { useMemo } from 'react'

import { useUrlQueryState } from '@/hooks/useUrlQueryState'
import useTableStateStore from '@/store/useTableStateStore'
import { DEFAULT_PAGINATION, resolvePageSizeDefault, toLegacyPagination } from '@/types/pagination'
import type { CodebookType } from '@/types/responses/codebook'
import { parseColumnFilterParam, parseJsonParam, parsePositiveIntParam } from '@/utils/urlQuery'

interface Query {
    pagination?: string
    search?: string
    sorting?: string
    columnFilter?: string
    [key: string]: any
}

export default function useQueryManager(
    tableId: string,
    pageSizeDefault?: number,
    enableQueryURL: boolean = false,
): { query: Query } {
    const { instances } = useTableStateStore()
    const [categoryQuery] = useUrlQueryState('category', { history: 'push' })
    const category = parseJsonParam<CodebookType | null>(categoryQuery, null)

    const categoryFilter = useMemo(
        () => (category ? { value: category, id: 'category', name: 'category' } : undefined),
        [category],
    )

    const [searchQuery] = useUrlQueryState('search')
    const [filterQuery] = useUrlQueryState('filter')
    const [pageQuery] = useUrlQueryState('page')
    const [pageSizeQuery] = useUrlQueryState('pageSize')

    const resolvedPageSizeDefault = useMemo(
        () => resolvePageSizeDefault(tableId, pageSizeDefault),
        [tableId, pageSizeDefault],
    )

    const sorting = instances[tableId]?.sortByQueryString || ''

    // Support both new typed format and legacy JSON string format
    // Priority: 1. New paginationState, 2. Legacy pagination string, 3. URL params, 4. Default
    const pagination = useMemo(() => {
        // Priority 1: New typed format from store
        const paginationState = instances[tableId]?.paginationState
        if (paginationState) {
            return toLegacyPagination(paginationState)
        }

        // Priority 2: Legacy format from store
        const legacyPagination = instances[tableId]?.pagination
        if (legacyPagination) {
            return legacyPagination
        }

        // Priority 3: URL params with defaults. Serialized, not interpolated:
        // `?page=abc` used to reach consumers as the literal `{"page":NaN,…}`,
        // which threw in whoever parsed it back.
        const page = parsePositiveIntParam(pageQuery, DEFAULT_PAGINATION.page)
        const pageSize = parsePositiveIntParam(pageSizeQuery, resolvedPageSizeDefault)
        return JSON.stringify({ page, pageSize })
    }, [instances, tableId, pageQuery, pageSizeQuery, resolvedPageSizeDefault])

    const search = instances[tableId]?.search || searchQuery || ''

    //columnFilter merge with categoryFilter, fallback to URL params only when opted in
    const columnFilter = useMemo(() => {
        const storeFilters = instances[tableId]?.columnFilter || []
        const urlFilters =
            enableQueryURL && storeFilters.length === 0 ? parseColumnFilterParam(filterQuery) : []
        const filters = storeFilters.length > 0 ? storeFilters : urlFilters
        return JSON.stringify(filters.concat(categoryFilter || []))
    }, [instances, tableId, categoryFilter, filterQuery, enableQueryURL])
    const custom = useMemo(() => instances[tableId]?.custom || {}, [instances, tableId])

    const query = useMemo(
        () => ({ pagination, search, columnFilter, sorting, ...custom }),
        [pagination, search, columnFilter, sorting, custom],
    )

    return { query }
}
