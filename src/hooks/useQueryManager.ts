import { useQueryState } from 'next-usequerystate'
import { useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'
import type { CodebookType } from '@/types/responses/codebook'

interface Query {
  pagination?: string
  search?: string
  sorting?: string
  columnFilter?: string
  [key: string]: any
}

export default function useQueryManager(tableId: string): { query: Query } {
  const { instances } = useTableStateStore()
  const [categoryQuery] = useQueryState('category', { history: 'push' })
  const category: CodebookType | null = categoryQuery
    ? JSON.parse(categoryQuery)
    : null

  const categoryFilter = useMemo(
    () =>
      category
        ? { value: category, id: 'category', name: 'category' }
        : undefined,
    [category]
  )

  const [searchQuery] = useQueryState('search')
  const [pageQuery] = useQueryState('page')

  const sorting = instances[tableId]?.sortByQueryString || ''

  const pagination =
    instances[tableId]?.pagination || `{"page":${pageQuery || 1},"pageSize":50}`
  const search = instances[tableId]?.search || searchQuery || ''

  //columnFilter merge with categoryFilter
  const columnFilter = useMemo(
    () =>
      JSON.stringify(
        (instances[tableId]?.columnFilter || []).concat(categoryFilter || [])
      ),
    [instances, tableId, categoryFilter]
  )
  const custom = useMemo(
    () => instances[tableId]?.custom || {},
    [instances, tableId]
  )

  const query = useMemo(
    () => ({ pagination, search, columnFilter, sorting, ...custom }),
    [pagination, search, columnFilter, sorting, custom]
  )

  return { query }
}
