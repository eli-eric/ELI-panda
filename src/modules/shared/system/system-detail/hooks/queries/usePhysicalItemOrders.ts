import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { PHYSICAL_ITEM_ORDERS_QUERY_KEY } from '@/utils/query/queryKeys'

import type { PhysicalItemOrders } from '../../types'

/** GET /physical-item/:uid/orders — purchase order + service items (newest first). */
export const usePhysicalItemOrders = (itemUid?: string | null) =>
    useQuery<PhysicalItemOrders, AxiosError, PhysicalItemOrders, QueryFetcherKey>({
        queryKey: [PHYSICAL_ITEM_ORDERS_QUERY_KEY, { uid: itemUid ?? null }],
        queryFn: queryFetcher<PhysicalItemOrders>('physicalItemOrders'),
        enabled: !!itemUid,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })
