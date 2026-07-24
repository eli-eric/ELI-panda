import type { QueryClient } from '@tanstack/react-query'

import { TEAM_QUERY_KEY } from '../hooks/useTeam'
import { TEAMS_QUERY_KEY } from '../hooks/useTeams'
import type { TeamDetail } from '../types/team.types'

/**
 * Applies a member-operation response to the caches: shallow-merges the returned
 * TeamDetail over the cached detail — fields present in `data` win, but fields
 * the response omits are preserved (a partial payload must not drop
 * name/code/description) — and invalidates detail + list (memberCount).
 * A 204/empty body just triggers the invalidation. Member add/remove does not
 * change the team set, so CODEBOOK.TEAM is intentionally left untouched.
 */
export const applyTeamDetailResponse = (
    queryClient: QueryClient,
    uid: string,
    data?: TeamDetail,
) => {
    if (data) {
        queryClient.setQueryData<TeamDetail | undefined>([TEAM_QUERY_KEY, { uid }], prev =>
            prev ? { ...prev, ...data } : data,
        )
    }
    return Promise.all([
        queryClient.invalidateQueries({ queryKey: [TEAM_QUERY_KEY, { uid }] }),
        queryClient.invalidateQueries({ queryKey: [TEAMS_QUERY_KEY] }),
    ])
}
