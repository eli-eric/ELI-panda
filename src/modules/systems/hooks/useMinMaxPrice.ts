import toast from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

export const useMinMaxPrice = () => {
  const { ordersMinMaxPrice } = useEndpoint()
  const { response, loading, mutate } = useFetch<{ min: number; max: number }>({
    config: {
      suspense: false,
      keepPreviousData: true,
      onError: error => {
        toast.error(error.message)
      }
    },
    url: ordersMinMaxPrice,
    useMockFetcher: false
  })
  return { minMaxPrice: response }
}
