import { useQuery } from '@tanstack/react-query'

import { queryFetcher } from '@/utils/fetcher'

export const useGenerateUid = (enabled: boolean) => {
    const { data } = useQuery({
        queryKey: ['uuidGenerate'],
        queryFn: queryFetcher<string>('generateUUID'),
        enabled,
        staleTime: 0,
    })
    return data
}
