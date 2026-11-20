import { keepPreviousData, useQuery } from '@tanstack/react-query'

import useTableStateStore from '@/store/useTableStateStore'
import { queryFetcher } from '@/utils/fetcher'

import type { TeamMember } from '../types/team.types'

/**
 * Fetches enabled facility users assignable as team members
 * (GET /teams/assignable-users?search=).
 *
 * Reads the search term straight from the table store (which SearchBar updates)
 * instead of useQueryManager: the latter falls back to the global URL `?search=`
 * when the store value is empty, which would leak an unrelated URL search into
 * this modal (SearchBar is mounted with useQuery={false} precisely to avoid URL
 * coupling). The endpoint only understands `?search=`.
 */
export const useAssignableUsers = (tableId: string) => {
    const search = useTableStateStore(state => state.instances[tableId]?.search) || ''

    return useQuery({
        queryKey: ['team-assignable-users', { query: { search } }],
        queryFn: queryFetcher<TeamMember[]>('teamAssignableUsers'),
        placeholderData: keepPreviousData,
    })
}
