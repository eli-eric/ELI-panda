import { useQuery } from '@tanstack/react-query'

import useQueryManager from '@/hooks/useQueryManager'
import { queryFetcher } from '@/utils/fetcher'

import type { ResearchersResponse } from '../types/researcher.types'

export const useResearchers = (tableId: string) => {
    const query = useQueryManager(tableId, undefined, true)

    return useQuery({
        queryKey: ['researchers', { query: query.query }],
        queryFn: queryFetcher<ResearchersResponse>('researchers'),
    })
}
