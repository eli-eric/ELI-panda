import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import useQueryManager from '@/hooks/useQueryManager'
import type { CatalogueItemsResponse } from '@/types/responses'

export const useCatalogueItems = (tableId = 'catalogueItems', categoryUID?: string) => {
  const { query } = useQueryManager(tableId)
  query.categoryUID = categoryUID || ''
  const pagination = JSON.parse(query.pagination || '{}')
  const { catalogueItems } = useEndpoint({ query: { ...pagination, ...query } })
  const { response, loading, error, mutate } = useFetch<CatalogueItemsResponse>({
    url: catalogueItems,
    config: {
      suspense: false,
      keepPreviousData: true,
      refreshInterval: 15000
    }
  })
  return { catalogueItems: response, loading, error, mutate }
}
