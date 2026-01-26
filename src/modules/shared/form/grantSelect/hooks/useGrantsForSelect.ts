import { keepPreviousData, useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import type { GrantsResponse } from '@/modules/grants/types/grant.types'
import { queryFetcher } from '@/utils/fetcher'

/**
 * Fetches grants for selection modal.
 *
 * Uses useQueryManager to integrate with SearchBar component.
 * When used with SearchBar's `useQuery={false}`, search state is stored
 * in table state store without URL pollution.
 *
 * @param tableId - Table ID for state management (search, pagination)
 */
export const useGrantsForSelect = (tableId: string) => {
  const query = useQueryManager(tableId)

  return useQuery({
    queryKey: ['grants-select', { query: query.query }],
    queryFn: queryFetcher<GrantsResponse>('grants'),
    placeholderData: keepPreviousData
  })
}
