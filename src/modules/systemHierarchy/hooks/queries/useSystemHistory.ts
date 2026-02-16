import { useQuery } from '@tanstack/react-query'

import type { HistoryResponse } from '@/modules/systemItem/types/responses'
import { queryFetcher } from '@/utils/fetcher'

export const useSystemHistory = (uid: string | null) => {
    return useQuery({
        queryKey: ['history', { uid }],
        queryFn: queryFetcher<HistoryResponse[]>('history'),
        enabled: !!uid,
        retry: 1,
        staleTime: 30 * 1000, // 30 seconds
    })
}
