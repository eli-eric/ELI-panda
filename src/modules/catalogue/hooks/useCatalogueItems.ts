import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useCataloguePath } from '@/hooks/usePath'
import useQueryManager from '@/hooks/useQueryManager'
import type { CatalogueItemsResponse } from '@/types/responses'

const useCatalogueItems = () => {
  const { query } = useQueryManager('catalogueItems')
  const pagination = JSON.parse(query.pagination)
  const categoryPath = useCataloguePath()
  const { catalogueItems } = useEndpoint({ query: { categoryPath, ...pagination, ...query } })
  const { response, loading, error, mutate } = useFetch<CatalogueItemsResponse>({
    url: catalogueItems,
    config: { suspense: false }
  })
  return { catalogueItems: response, loading, error, mutate }
}

export default useCatalogueItems
