import { useQuery } from '@tanstack/react-query'

import type { AxiosError } from '@/types/http'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'
import { PHYSICAL_ITEM_PROPERTIES_QUERY_KEY } from '@/utils/query/queryKeys'

import type { PhysicalItemCatalogueProperties } from '../../types'

/**
 * GET /physical-item/:uid/catalogue-properties — catalogue values with service
 * overrides already resolved by the server (latest service item wins).
 */
export const usePhysicalItemCatalogueProperties = (itemUid?: string | null) => {
    const query = useQuery<
        PhysicalItemCatalogueProperties,
        AxiosError,
        PhysicalItemCatalogueProperties,
        QueryFetcherKey
    >({
        queryKey: [PHYSICAL_ITEM_PROPERTIES_QUERY_KEY, { uid: itemUid ?? null }],
        queryFn: queryFetcher<PhysicalItemCatalogueProperties>('physicalItemCatalogueProperties'),
        enabled: !!itemUid,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    })

    const groups = query.data?.groups ?? []
    return {
        groups,
        hasProperties: groups.some(group => group.properties.length > 0),
        hasOverriddenProperties: query.data?.hasOverriddenProperties ?? false,
        isLoading: query.isLoading,
        error: query.error,
    }
}
