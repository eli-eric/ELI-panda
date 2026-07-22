import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { message } from '@/i18n/src/messages'
import type { AxiosError } from '@/types/http'
import { queryMutate } from '@/utils/fetcher'

import type { Team } from '../types/team.types'
import { TEAM_QUERY_KEY } from './useTeam'
import { TEAMS_QUERY_KEY } from './useTeams'

export type TeamField = 'name' | 'code' | 'description'

type TeamFieldPayload = Partial<Record<TeamField, string | null>>

const labels = message.teamsPage.fields

/**
 * Per-field PATCH for a team (mirrors systemHierarchy's useSystemFieldUpdate,
 * but REST + scalar-only). Sends a single key; returns the promise so the
 * inline-field component can auto-revert on rejection.
 */
export const useTeamFieldUpdate = () => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()

    const updateField = useCallback(
        (uid: string, field: TeamField, value: string | null) => {
            const payload: TeamFieldPayload = { [field]: value }
            const promise = queryMutate<Team, TeamFieldPayload>('teamDetail', 'patch', { uid })(
                payload,
            ).then(async response => {
                await queryClient.invalidateQueries({ queryKey: [TEAM_QUERY_KEY, { uid }] })
                await queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] })
                return response
            })

            toast.promise(promise, {
                loading: fm({ id: labels.saving }),
                success: fm({ id: labels.saved }),
                error: (err: AxiosError) => {
                    // Surface the server's own reason on a validation error
                    // (duplicate code, bad format, …) rather than guessing.
                    const serverMessage = (err?.response?.data as { errorMessage?: string })
                        ?.errorMessage
                    if (err?.response?.status === 400) {
                        return serverMessage || fm({ id: labels.saveFailed })
                    }
                    return fm({ id: labels.saveFailed })
                },
            })

            return promise
        },
        [fm, queryClient],
    )

    return { updateField }
}
