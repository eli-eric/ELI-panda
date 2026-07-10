import type { QueryClient } from '@tanstack/react-query'
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

const canEditQueryFn = queryFetcher<SystemCanEditResponse>('systemCanEdit')

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
