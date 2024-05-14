import useQueryManager from '../../../hooks/useQueryManager'
import type { OrderListResponse } from '../types'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { useMemo } from 'react'

export const useOrders = () => {
  const { query } = useQueryManager('orders')

  const queryKey: QueryFetcherKey = useMemo(
    () => ['orders', { query }],
    [query]
  )

  const { data, isFetching, error, refetch } = useQuery({
    queryKey,
    queryFn: queryFetcher<OrderListResponse>('orders'),
    placeholderData: keepPreviousData
  })

  return { orderList: data, loading: isFetching, error, mutate: refetch }
}
