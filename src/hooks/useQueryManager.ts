import { useQueryState } from 'next-usequerystate'
import { useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

import type { CodebookType } from './fetch/useCodebook'

interface Query {
  pagination?: string
  search?: string
  sorting?: string
  supplierUID?: string
  orderStatusUID?: string
  procurementResponsibleUID?: string
  requestorUID?: string
  columnFilter?: string
  [key: string]: any
}

export default function useQueryManager(tableId: string): { query: Query } {
  const { instances } = useTableStateStore()
  const [categoryQuery] = useQueryState('category', { history: 'push' })
  const category: CodebookType | null = categoryQuery ? JSON.parse(categoryQuery) : null
  const categoryFilter = useMemo(
    () => (category ? { value: category, id: 'category', name: 'category' } : undefined),
    [category]
  )
  //TODO: filters
  const sorting = instances[tableId]?.sortByQueryString || ''
  const pagination = instances[tableId]?.pagination || ''
  const search = instances[tableId]?.search || ''
  const supplierUID = instances[tableId]?.filter?.supplier?.uid || ''
  const orderStatusUID = instances[tableId]?.filter?.orderStatus?.uid || ''
  const procurementResponsibleUID = instances[tableId]?.filter?.procurementResponsible?.uid || ''
  const requestorUID = instances[tableId]?.filter?.requestor?.uid || ''
  //columnFilter merge with categoryFilter
  const columnFilter = useMemo(
    () => JSON.stringify((instances[tableId]?.columnFilter || []).concat(categoryFilter || [])),
    [instances, tableId, categoryFilter]
  )
  const custom = useMemo(() => instances[tableId]?.custom || {}, [instances, tableId])

  const filter = useMemo(() => {
    const filter: any = {}
    if (supplierUID) {
      filter.supplierUID = supplierUID
    }
    if (orderStatusUID) {
      filter.orderStatusUID = orderStatusUID
    }
    if (procurementResponsibleUID) {
      filter.procurementResponsibleUID = procurementResponsibleUID
    }
    if (requestorUID) {
      filter.requestorUID = requestorUID
    }
    return filter
  }, [supplierUID, orderStatusUID, procurementResponsibleUID, requestorUID])

  const query = useMemo(
    () => ({ pagination, search, columnFilter, sorting, ...filter, ...custom }),
    [pagination, search, columnFilter, sorting, filter, custom]
  )

  return { query }
}
