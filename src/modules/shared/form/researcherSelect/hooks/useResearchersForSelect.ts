import { keepPreviousData, useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import type { ResearchersResponse } from '@/modules/researchers/types/researcher.types'
import { queryFetcher } from '@/utils/fetcher'

/**
 * Fetches researchers for selection modal.
 *
 * Uses useQueryManager to integrate with SearchBar component.
 * When used with SearchBar's `useQuery={false}`, search state is stored
 * in table state store without URL pollution.
 *
 * @param tableId - Table ID for state management (search, pagination)
 */
export const useResearchersForSelect = (tableId: string) => {
  const query = useQueryManager(tableId)

  return useQuery({
    queryKey: ['researchers-select', { query: { ...query.query } }],
    queryFn: queryFetcher<ResearchersResponse>('researchers'),
    placeholderData: keepPreviousData
  })
}
