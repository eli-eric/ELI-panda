import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

import type { OrdersQuery } from '../types'

export default function useQueryManager() {
  const router = useRouter()
  const { instances } = useTableStateStore()
  //TODO: filters
  const sorting = instances['orders']?.sortByQueryString
  const pagination = instances['orders']?.pagination || '{"page":1,"pageSize":50}'

  const filter = useCallback(() => instances['orders']?.filter || {}, [instances])

  const [query, setQuery] = useState<OrdersQuery>({ pagination })

  useEffect(() => {
    const newQuery: OrdersQuery = { pagination, ...filter() }
    if (router.query.search) {
      newQuery.search = router.query.search as string
      if (sorting) {
        newQuery.sorting = sorting
      }
    } else if (sorting) {
      newQuery.sorting = sorting
    }

    setQuery(newQuery)
  }, [router.query.search, sorting, pagination, filter])

  return { query }
}
