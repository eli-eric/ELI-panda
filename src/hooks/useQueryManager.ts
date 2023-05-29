import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

import type { OrdersQuery } from '../modules/orders/types'

export default function useQueryManager(tableId: string) {
  const router = useRouter()
  const { instances } = useTableStateStore()
  //TODO: filters
  const sorting = instances[tableId]?.sortByQueryString || ''
  const pagination = instances[tableId]?.pagination || '{"page":1,"pageSize":50}'
  const search = instances[tableId]?.search || ''

  const filter = useCallback(() => instances[tableId]?.filter || {}, [instances, tableId])

  const [query, setQuery] = useState<OrdersQuery>({ pagination })

  useEffect(() => {
    if (router.isReady) {
      const newQuery: OrdersQuery = { pagination, ...filter() }
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
  }, [router.query.search, sorting, pagination, filter, router.isReady, search])

  return { query }
}
