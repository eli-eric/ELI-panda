import { useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import { queryFetcher } from '@/utils/fetcher'

import type { ZonesResponse } from '../types/zone.types'

export const useZones = (tableId: string) => {
    const query = useQueryManager(tableId)

    return useQuery({
        queryKey: ['zones', { query: query.query }],
        queryFn: queryFetcher<ZonesResponse>('zones'),
    })
}
