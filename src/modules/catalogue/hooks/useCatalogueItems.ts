import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import useQueryManager from '@/hooks/useQueryManager'
import { useCataloguePath } from '@/modules/catalogue/hooks/usePath'
import type { CatalogueItemsResponse } from '@/types/responses'

export const useCatalogueItems = (tableId = 'catalogueItems') => {
  const { query } = useQueryManager(tableId)
  const pagination = JSON.parse(query.pagination || '{}')
  const categoryPath = useCataloguePath()
  const { catalogueItems } = useEndpoint({ query: { categoryPath, ...pagination, ...query } })
  const { response, loading, error, mutate } = useFetch<CatalogueItemsResponse>({
    url: catalogueItems,
    config: {
      suspense: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
      keepPreviousData: true
    }
  })
  return { catalogueItems: response, loading, error, mutate }
}
