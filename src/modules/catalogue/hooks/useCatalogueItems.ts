import { useQueryState } from 'next-usequerystate'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import { useCataloguePath } from '@/hooks/usePath'
import useQueryManager from '@/hooks/useQueryManager'
import type { CatalogueItemsResponse } from '@/types/responses'

import useCategoryList from './useCategoryList'

const useCatalogueItems = () => {
  const [search] = useQueryState('search')
  const { query } = useQueryManager('catalogueItems')
  const pagination = JSON.parse(query.pagination)
  const categoryPath = useCataloguePath()
  const { categoryList } = useCategoryList()
  const { catalogueItems } = useEndpoint({ query: { categoryPath, ...pagination, ...query } })
  const { response, loading, error, mutate } = useFetch<CatalogueItemsResponse>({
    url: (categoryList && categoryList.length === 0) || search ? catalogueItems : null
  })
  return { catalogueItems: response, loading, error, mutate }
}

export default useCatalogueItems
