import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { TeamDetail } from '../types/team.types'
import { applyTeamDetailResponse } from '../utils/teamCache'
import { TEAM_QUERY_KEY } from './useTeam'

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
        onSuccess: response => applyTeamDetailResponse(queryClient, uid, response.data),
    })
}
