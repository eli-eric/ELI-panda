import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

/**
 * URL-based selection for the teams explorer, mirroring the hierarchy module.
 * The selected team uid lives in the `?team` query param (shallow navigation).
 */
export const useTeamSelection = () => {
    const router = useRouter()

    const teamParam = router.query.team
    const selectedUid = (Array.isArray(teamParam) ? teamParam[0] : teamParam) ?? null

    const updateQuery = useCallback(
        (team: string | undefined) => {
            const current = { ...router.query }
            if (team === undefined) {
                delete current.team
            } else {
                current.team = team
            }
            router.push({ pathname: router.pathname, query: current }, undefined, {
                shallow: true,
            })
        },
        [router],
    )

    const selectTeam = useCallback((uid: string) => updateQuery(uid), [updateQuery])
    const clearSelection = useCallback(() => updateQuery(undefined), [updateQuery])

    return useMemo(
        () => ({ selectedUid, selectTeam, clearSelection }),
        [selectedUid, selectTeam, clearSelection],
    )
}
