import { keepPreviousData, useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import { queryFetcher } from '@/utils/fetcher'

import type { TeamMember } from '../types/team.types'

/**
 * Fetches enabled facility users assignable as team members
 * (GET /teams/assignable-users?search=). Integrates with SearchBar via
 * useQueryManager (server-side search), like useResearchersForSelect.
 */
export const useAssignableUsers = (tableId: string) => {
    const query = useQueryManager(tableId)

    return useQuery({
        queryKey: ['team-assignable-users', { query: query.query }],
        queryFn: queryFetcher<TeamMember[]>('teamAssignableUsers'),
        placeholderData: keepPreviousData,
    })
}
