import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { SYSTEM_SUBSYSTEMS_QUERY_KEY } from '@/utils/query/queryKeys'

import type { SubsystemRow } from '../../types'

/** GET /system/:uid/subsystems — direct, non-deleted children. */
export const useSystemSubsystems = (uid?: string | null, enabled = true) =>
    useQuery<SubsystemRow[], AxiosError, SubsystemRow[], QueryFetcherKey>({
        queryKey: [SYSTEM_SUBSYSTEMS_QUERY_KEY, { uid: uid ?? null }],
        queryFn: queryFetcher<SubsystemRow[]>('systemSubsystems'),
        enabled: enabled && !!uid,
        staleTime: 60 * 1000,
        retry: 1,
    })
