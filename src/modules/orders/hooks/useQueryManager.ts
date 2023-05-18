import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import useTableStateStore from '@/store/useTableStateStore'

import type { OrdersQuery } from '../types'

export default function useQueryManager(queryFilter) {
  const router = useRouter()
  const { instances } = useTableStateStore()
  //TODO: filters
  const sorting = instances['orders']?.sortByQueryString
  const pagination = instances['orders']?.pagination || ''

  const [query, setQuery] = useState<OrdersQuery>({ pagination })

  useEffect(() => {
    const newQuery = { pagination, ...queryFilter }
    if (router.query.search) {
      newQuery.search = router.query.search as string
      if (sorting) {
        newQuery.sorting = sorting
      }
    } else if (sorting) {
      newQuery.sorting = sorting
    }
    setQuery(newQuery)
  }, [router.query.search, sorting, pagination, queryFilter])

  return { query }
}
