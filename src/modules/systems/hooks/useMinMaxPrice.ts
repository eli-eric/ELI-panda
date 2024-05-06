import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'

export const useMinMaxPrice = () => {
  const { data } = useQuery<{ min: number; max: number }>({
    queryKey: ['ordersMinMaxPrice'],
    queryFn: queryFetcher('ordersMinMaxPrice')
  })

  return { minMaxPrice: data }
}
