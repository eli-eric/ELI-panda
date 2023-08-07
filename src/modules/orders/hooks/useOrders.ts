import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import useQueryManager from '../../../hooks/useQueryManager'
import type { OrderListResponse } from '../types'

export const useOrders = () => {
  const query = useQueryManager('orders')
  const { orders } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<OrderListResponse>({
    config: {
      suspense: false,
      keepPreviousData: true
    },
    url: orders
  })
  return { orderList: response, loading, error, mutate }
}
