import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import useQueryManager from '@/hooks/useQueryManager'
import type { CatalogueItemsResponse } from '@/modules/shared/catalogue/table/types/responses'

export const useCatalogueItems = (tableId = 'catalogueItems') => {
  const { query } = useQueryManager(tableId)
  const pagination = JSON.parse(query.pagination || '{}')
  //const categoryPath = useCataloguePath()
  const { catalogueItems } = useEndpoint({ query: { ...pagination, ...query } })
  const { response, loading, error, mutate } = useFetch<CatalogueItemsResponse>({
    url: catalogueItems,
    config: {
      suspense: false,
      keepPreviousData: true
    }
  })
  return { catalogueItems: response, loading, error, mutate }
}
