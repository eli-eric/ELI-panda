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
            queryClient.setQueryData([TEAM_QUERY_KEY, { uid }], response.data)
            await queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] })
        },
    })
}
