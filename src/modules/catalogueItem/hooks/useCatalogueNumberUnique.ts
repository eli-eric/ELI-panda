import { useQuery } from '@tanstack/react-query'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

interface CatalogueNumberUniqueResponse {
  isUnique: boolean
  catalogueNumber: string
}

interface UseCatalogueNumberUniqueOptions {
  catalogueNumber: string
  enabled: boolean
}

export const useCatalogueNumberUnique = ({
  catalogueNumber,
  enabled
}: UseCatalogueNumberUniqueOptions) => {
  const queryKey: QueryFetcherKey = [
    'catalogueNumberUniqueCheck',
    { query: { catalogueNumber } }
  ]

  const { data, isFetching: isChecking } = useQuery({
    queryKey,
    queryFn: queryFetcher<CatalogueNumberUniqueResponse>(
      'catalogueNumberUniqueCheck'
    ),
    enabled: enabled && Boolean(catalogueNumber),
    // Don't cache uniqueness checks - always revalidate
    staleTime: 0
  })

  return {
    isUnique: data?.isUnique,
    catalogueNumber: data?.catalogueNumber,
    isChecking
  }
}
