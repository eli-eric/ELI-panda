'use-client'

import toast from 'react-hot-toast'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'

import type { CatalogueStatistics } from '../components/statistics/CatalogueStatistics.columns'
//use faker to generate fake data

export const useItemsAggregate = catalogueItemUid => {
  const { catalogueItemStatistics } = useEndpoint({ uid: catalogueItemUid })

  const { response, loading, error } = useFetch<CatalogueStatistics[]>({
    url: () => (catalogueItemUid ? catalogueItemStatistics : null),
    config: { suspense: false, revalidateOnMount: true },
    useMockFetcher: false,
    onError: () => {
      toast.error('Error fetching catalogue item statistics')
    }
  })

  return { itemStatistics: response, loading, error }
}
