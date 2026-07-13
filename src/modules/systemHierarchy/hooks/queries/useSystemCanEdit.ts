import type { QueryClient, QueryFunction } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

export const SYSTEM_CAN_EDIT_QUERY_KEY = 'systemCanEdit'

// A user responsible for a system (or one of its ancestors). Shape mirrors the
// backend GET /system/{uid}/can-edit response.
export interface SystemResponsible {
    uid: string
    firstName: string | null
    lastName: string | null
    username: string | null
    email: string | null
}

export interface SystemCanEditResponse {
    // `true` if the current user may edit this system. Always accompanied by
    // `responsibles` so the UI can point unpermitted users at someone.
    result: boolean
    responsibles: SystemResponsible[]
}

// First value present under any of the given keys — tolerates casing drift
// (e.g. a PascalCase gateway serializer) without a bespoke DTO per environment.
const pick = (obj: Record<string, unknown>, ...keys: string[]): unknown => {
    for (const key of keys) {
        if (obj[key] !== undefined && obj[key] !== null) return obj[key]
    }
    return undefined
}

const toStringOrNull = (value: unknown): string | null =>
    typeof value === 'string' && value !== '' ? value : null

const normalizeResponsible = (raw: Record<string, unknown>): SystemResponsible => ({
    uid: String(pick(raw, 'uid', 'Uid', 'UID') ?? ''),
    firstName: toStringOrNull(pick(raw, 'firstName', 'FirstName')),
    lastName: toStringOrNull(pick(raw, 'lastName', 'LastName')),
    username: toStringOrNull(pick(raw, 'username', 'Username', 'userName', 'UserName')),
    email: toStringOrNull(pick(raw, 'email', 'Email')),
})

/**
 * Normalizes the raw `can-edit` payload to our contract. Deliberately tolerant of
 * field-name casing so a serializer difference on the live gateway can't silently
 * flip every system to `denied` (fail-closed + contract drift = whole-module
 * lockout). Still fail-closed on the value: `result` must be an explicit boolean
 * `true`, anything else → `false`.
 */
export const normalizeCanEditResponse = (raw: unknown): SystemCanEditResponse => {
    const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
    const result = pick(obj, 'result', 'Result')
    const responsibles = pick(obj, 'responsibles', 'Responsibles')
    return {
        result: result === true,
        responsibles: Array.isArray(responsibles)
            ? responsibles
                  .filter((r): r is Record<string, unknown> => !!r && typeof r === 'object')
                  .map(normalizeResponsible)
                  // Drop identity-less entries: they'd collide on the React key and
                  // render blank in the tooltip.
                  .filter(r => r.uid)
            : [],
    }
}

const rawCanEditQueryFn = queryFetcher<unknown>('systemCanEdit')
const canEditQueryFn: QueryFunction<SystemCanEditResponse, QueryFetcherKey> = async ctx =>
    normalizeCanEditResponse(await rawCanEditQueryFn(ctx))

/**
 * Per-system edit permission from the backend. Authoritative source (GraphQL has
 * no canEdit/responsibles field and team-membership/ancestors can't be resolved
 * client-side). Shared cache key with {@link ensureSystemCanEdit}.
 */
export const useSystemCanEdit = (uid?: string | null) =>
    useQuery<SystemCanEditResponse, AxiosError, SystemCanEditResponse, QueryFetcherKey>({
        queryKey: [SYSTEM_CAN_EDIT_QUERY_KEY, { uid }],
        queryFn: canEditQueryFn,
        enabled: !!uid,
        // Always-fresh on purpose: this is the security gate for otherwise
        // unguarded GraphQL patches, so we prefer a re-check over a stale allow.
        // `ensureSystemCanEdit` still reuses this cache entry within a render pass.
        staleTime: 0,
    })

/**
 * Imperative read of the same cached can-edit result, for check-on-click guards
 * (create/delete). Reuses the query cache so it never double-fetches the system
 * currently shown in the detail view.
 */
export const ensureSystemCanEdit = (
    queryClient: QueryClient,
    uid: string,
): Promise<SystemCanEditResponse> =>
    queryClient.ensureQueryData<SystemCanEditResponse, AxiosError, SystemCanEditResponse, QueryFetcherKey>({
        queryKey: [SYSTEM_CAN_EDIT_QUERY_KEY, { uid }],
        queryFn: canEditQueryFn,
    })
