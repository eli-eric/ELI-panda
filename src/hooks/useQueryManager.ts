import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

export default function useQueryManager(tableId: string) {
  const router = useRouter()
  const { instances } = useTableStateStore()
  //TODO: filters
  const sorting = instances[tableId]?.sortByQueryString || ''
  const pagination = instances[tableId]?.pagination || ''
  const search = instances[tableId]?.search || ''
  const supplierUID = instances[tableId]?.filter?.supplier?.uid || ''
  const orderStatusUID = instances[tableId]?.filter?.orderStatus?.uid || ''
  const procurementResponsibleUID = instances[tableId]?.filter?.procurementResponsible?.uid || ''
  const requestorUID = instances[tableId]?.filter?.requestor?.uid || ''
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

  const [query, setQuery] = useState({ pagination, ...custom })

  useEffect(() => {
    if (router.isReady) {
      const newQuery = { pagination, ...filter, ...custom }
      if (router.query.search || search) {
        newQuery.search = (router.query.search as string) || search
        if (sorting) {
          newQuery.sorting = sorting
        }
      } else if (sorting) {
        newQuery.sorting = sorting
      }

      setQuery(newQuery)
    }
  }, [router.query.search, sorting, pagination, filter, router.isReady, search, custom])

  return { query }
}
