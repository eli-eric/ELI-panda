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
            // Merge the response into the cached detail (never overwrite): a
            // partial payload would otherwise drop name/code/description until
            // the refetch lands. Always invalidate as the source of truth,
            // which also covers a 204/empty body.
            if (response.data) {
                queryClient.setQueryData<TeamDetail | undefined>(
                    [TEAM_QUERY_KEY, { uid }],
                    prev => (prev ? { ...prev, ...response.data } : response.data),
                )
            }
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: [TEAM_QUERY_KEY, { uid }] }),
                queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] }),
            ])
        },
    })
}
