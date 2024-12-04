import { useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import type { Publication } from '@/modules/publication/types/responses'
import { queryFetcher } from '@/utils/fetcher'

export const usePublications = (tableId: string) => {
  const query = useQueryManager(tableId)

  return useQuery({
    queryKey: ['publications', { query: query.query }],
    queryFn: queryFetcher<Publication[]>('publications')
  })
}
