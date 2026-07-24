import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { TeamDetail } from '../types/team.types'
import { applyTeamDetailResponse } from '../utils/teamCache'
import { TEAM_QUERY_KEY } from './useTeam'

/**
 * Removes a single member from a team (DELETE /teams/:uid/members/:userUid).
 * Idempotent; returns the updated TeamDetail. The userUid is per-call, so the
 * mutation fn is built inside mutationFn rather than bound at hook creation.
 */
export const useRemoveTeamMember = (teamUid: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: [TEAM_QUERY_KEY, teamUid, 'remove-member'],
        mutationFn: (userUid: string) =>
            queryMutate<TeamDetail, undefined>('teamMember', 'delete', {
                uid: teamUid,
                endpointVariables: { itemUid: userUid },
            })(undefined),
        onSuccess: response => applyTeamDetailResponse(queryClient, teamUid, response.data),
    })
}
