import type { SystemResponsible } from './useSystemCanEdit'
import { useSystemCanEdit } from './useSystemCanEdit'

export type SystemEditPermissionStatus = 'loading' | 'error' | 'allowed' | 'denied'

export interface SystemEditPermission {
    // True only when the backend confirmed edit rights. Fail-closed: false while
    // loading and on fetch error, so an un-verifiable state never leaves editing open.
    canEdit: boolean
    responsibles: SystemResponsible[]
    status: SystemEditPermissionStatus
    refetch: () => void
}

/**
 * Single decision point for per-system edit permission. Every consumer (detail
 * tabs, header actions, sidebar image panel) calls this with its own system uid;
 * React Query dedups the underlying fetch so it stays one request per system.
 */
export const useSystemEditPermission = (uid?: string | null): SystemEditPermission => {
    const { data, isLoading, isError, refetch } = useSystemCanEdit(uid)

    // No uid → the query is disabled (never loads), so treat it as a non-denied
    // "nothing to decide yet" state rather than letting the ternary fall to 'denied'.
    const status: SystemEditPermissionStatus =
        !uid || isLoading
            ? 'loading'
            : isError
              ? 'error'
              : data?.result
                ? 'allowed'
                : 'denied'

    return {
        canEdit: status === 'allowed',
        responsibles: data?.responsibles ?? [],
        status,
        refetch: () => void refetch(),
    }
}

/** Human-readable "First Last" for a responsible, falling back to username. */
export const formatResponsibleName = (responsible: SystemResponsible): string => {
    const fullName = [responsible.firstName, responsible.lastName].filter(Boolean).join(' ').trim()
    return fullName || responsible.username || responsible.email || ''
}
