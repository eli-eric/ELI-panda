import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { SYSTEM_SPARE_PARTS_QUERY_KEY } from '@/utils/query/queryKeys'

import type { SystemSpareParts } from '../../types'

/** GET /system/:uid/spare-parts — spares for this system (inbound) and what it covers (outbound). */
export const useSystemSpareParts = (uid?: string | null) =>
    useQuery<SystemSpareParts, AxiosError, SystemSpareParts, QueryFetcherKey>({
        queryKey: [SYSTEM_SPARE_PARTS_QUERY_KEY, { uid: uid ?? null }],
        queryFn: queryFetcher<SystemSpareParts>('systemSpareParts'),
        enabled: !!uid,
        staleTime: 60 * 1000,
        retry: 1,
    })
