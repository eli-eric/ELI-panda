import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { OrderListResponse } from '../types'
import useQueryManager from './useQueryManager'

const useOrders = () => {
  const query = useQueryManager()
  const { orders } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<OrderListResponse>({
    config: {
      suspense: false,
      refreshInterval: 10000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateOnMount: true
    },
    url: orders
  })
  return { orderList: response, loading, error, mutate }
}

export default useOrders
