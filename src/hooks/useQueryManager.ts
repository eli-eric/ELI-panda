import { useQueryState } from 'next-usequerystate'
import { useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'
import { DEFAULT_PAGINATION, resolvePageSizeDefault, toLegacyPagination } from '@/types/pagination'
import type { CodebookType } from '@/types/responses/codebook'

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
): { query: Query } {
    const { instances } = useTableStateStore()
    const [categoryQuery] = useQueryState('category', { history: 'push' })
    const category: CodebookType | null = categoryQuery ? JSON.parse(categoryQuery) : null

    const categoryFilter = useMemo(
        () => (category ? { value: category, id: 'category', name: 'category' } : undefined),
        [category],
    )

    const [searchQuery] = useQueryState('search')
    const [pageQuery] = useQueryState('page')
    const [pageSizeQuery] = useQueryState('pageSize')

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

        // Priority 3: URL params with defaults
        const page = pageQuery ? parseInt(pageQuery, 10) : DEFAULT_PAGINATION.page
        const pageSize = pageSizeQuery ? parseInt(pageSizeQuery, 10) : resolvedPageSizeDefault
        return `{"page":${page},"pageSize":${pageSize}}`
    }, [instances, tableId, pageQuery, pageSizeQuery, resolvedPageSizeDefault])

    const search = instances[tableId]?.search || searchQuery || ''

    //columnFilter merge with categoryFilter
    const columnFilter = useMemo(
        () => JSON.stringify((instances[tableId]?.columnFilter || []).concat(categoryFilter || [])),
        [instances, tableId, categoryFilter],
    )
    const custom = useMemo(() => instances[tableId]?.custom || {}, [instances, tableId])

    const query = useMemo(
        () => ({ pagination, search, columnFilter, sorting, ...custom }),
        [pagination, search, columnFilter, sorting, custom],
    )

    return { query }
}
