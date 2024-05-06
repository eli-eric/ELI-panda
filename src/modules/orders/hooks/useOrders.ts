import useQueryManager from '../../../hooks/useQueryManager'
import type { OrderListResponse } from '../types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { makeQuery } from '@/utils/formatters'
import { queryFetcher } from '@/utils/fetcher'
import { useMemo } from 'react'

export const useOrders = () => {
  const { query } = useQueryManager('orders')

  const queryKey = useMemo(
    () => ['orders', { query: makeQuery(query) }],
    [query]
  )

  const { data, isFetching, error, refetch } = useQuery<OrderListResponse>({
    queryKey,
    queryFn: queryFetcher('orders'),
    placeholderData: keepPreviousData
  })

  return { orderList: data, loading: isFetching, error, mutate: refetch }
}
