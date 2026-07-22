import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { TeamDetail } from '../types/team.types'

export const TEAM_QUERY_KEY = 'team'

/**
 * Fetches a single team with its members (GET /teams/:uid).
 */
export const useTeam = (uid?: string | null) =>
    useQuery({
        queryKey: [TEAM_QUERY_KEY, { uid }],
        queryFn: queryFetcher<TeamDetail>('teamDetail'),
        enabled: !!uid,
    })
