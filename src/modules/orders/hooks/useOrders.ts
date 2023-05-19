import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/useFetch'

import type { OrderListResponse } from '../types'
import useQueryManager from './useQueryManager'

const useOrders = () => {
  const query = useQueryManager()
  const { orders } = useEndpoint({ ...query })
  const { response, loading, error, mutate } = useFetch<OrderListResponse>({ config: { suspense: false }, url: orders })
  return { orderList: response, loading, error, mutate }
}

export default useOrders
