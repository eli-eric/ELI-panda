import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

import type { TeamListItem } from '../types/team.types'

export const TEAMS_QUERY_KEY = 'teams'

/**
 * Fetches the team list (bare array, sorted by name server-side).
 */
export const useTeams = () =>
    useQuery({
        queryKey: [TEAMS_QUERY_KEY],
        queryFn: queryFetcher<TeamListItem[]>('teams'),
    })
