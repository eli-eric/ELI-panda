import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { TeamDetail } from '../types/team.types'
import { TEAM_QUERY_KEY } from './useTeam'
import { TEAMS_QUERY_KEY } from './useTeams'

interface SetMembersVariables {
    userUids: string[]
}

/**
 * Replaces the whole member set of a team (PUT /teams/:uid/members).
 * All-or-nothing on the backend; an empty list clears all members.
 */
export const useTeamMembers = (uid: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TEAM_QUERY_KEY, uid, 'members'],
        mutationFn: queryMutate<TeamDetail, SetMembersVariables>('teamMembers', 'put', { uid }),
        onSuccess: async response => {
            // Prime the detail cache from the response when the API echoes the
            // updated team, but always invalidate as a safety net in case it
            // answers 204/empty (setQueryData(undefined) would otherwise leave
            // stale members behind a success toast).
            if (response.data) {
                queryClient.setQueryData([TEAM_QUERY_KEY, { uid }], response.data)
            }
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [TEAM_QUERY_KEY, { uid }] }),
                queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] }),
            ])
        },
    })
}
