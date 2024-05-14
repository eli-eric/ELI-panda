import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

export const useMinMaxPrice = () => {
  const { data } = useQuery({
    queryKey: ['ordersMinMaxPrice'],
    queryFn: queryFetcher<{ min: number; max: number }>('ordersMinMaxPrice')
  })

  return { minMaxPrice: data }
}
