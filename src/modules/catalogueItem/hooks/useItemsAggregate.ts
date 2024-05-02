'use-client'

import type { CatalogueStatistics } from '../components/statistics/CatalogueStatistics.columns'
import { useQuery } from '@tanstack/react-query'
import { queryFetcher } from '@/utils/fetcher'
//use faker to generate fake data

export const useItemsAggregate = (uid?: string) => {
  const { data, error, isLoading } = useQuery<CatalogueStatistics[]>({
    queryKey: uid
      ? ['catalogueItemStatistics', { uid }]
      : ['catalogueItemsStatistics'],
    queryFn: uid
      ? queryFetcher('catalogueItemStatistics')
      : queryFetcher('catalogueItemsStatistics')
  })

  return { itemStatistics: data, loading: isLoading, error }
}
