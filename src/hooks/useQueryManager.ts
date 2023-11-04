import { useMemo } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

interface Query {
  pagination?: string
  search?: string
  sorting?: string
  supplierUID?: string
  orderStatusUID?: string
  procurementResponsibleUID?: string
  requestorUID?: string
  [key: string]: any
}

export default function useQueryManager(tableId: string): { query: Query } {
  const { instances } = useTableStateStore()
  //TODO: filters
  const sorting = instances[tableId]?.sortByQueryString || ''
  const pagination = instances[tableId]?.pagination || ''
  const search = instances[tableId]?.search || ''
  const supplierUID = instances[tableId]?.filter?.supplier?.uid || ''
  const orderStatusUID = instances[tableId]?.filter?.orderStatus?.uid || ''
  const procurementResponsibleUID = instances[tableId]?.filter?.procurementResponsible?.uid || ''
  const requestorUID = instances[tableId]?.filter?.requestor?.uid || ''
  const columnFilter = useMemo(() => JSON.stringify(instances[tableId]?.columnFilter || []), [instances, tableId])
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

  return { query: { pagination, search, columnFilter, sorting, ...filter, ...custom } }
}
