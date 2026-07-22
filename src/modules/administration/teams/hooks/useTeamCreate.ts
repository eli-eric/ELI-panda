import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryMutate } from '@/utils/fetcher'

import type { TeamCreateData } from '../form/team-create.schema'
import type { Team } from '../types/team.types'
import { TEAMS_QUERY_KEY } from './useTeams'

interface UseTeamCreateOptions {
    onSuccess?: (team: Team) => void
}

/**
 * Creates a team (POST /teams). Empty code/description are dropped so the
 * backend treats them as unset.
 */
export const useTeamCreate = ({ onSuccess }: UseTeamCreateOptions = {}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['create-team'],
        mutationFn: (data: TeamCreateData) => {
            const payload = {
                name: data.name.trim(),
                code: data.code?.trim() || undefined,
                description: data.description?.trim() || undefined,
            }
            return queryMutate<Team, typeof payload>('teams', 'post')(payload)
        },
        onSuccess: async response => {
            await queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] })
            onSuccess?.(response.data)
        },
    })
}
