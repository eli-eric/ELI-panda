import { useQuery } from '@tanstack/react-query'

import { queryFetcher, type QueryFetcherKey } from '@/utils/fetcher'

export interface RivValidationWarning {
    publicationCode: string
    message: string
}

export interface RivValidationResponse {
    totalPublications: number
    validPublications: number
    warnings: RivValidationWarning[]
}

export const useRivValidate = (year: string, provider: string, enabled: boolean) => {
    const queryKey: QueryFetcherKey = ['rivValidate', { query: { year, provider } }]

    return useQuery({
        queryKey,
        queryFn: queryFetcher<RivValidationResponse>('rivValidate'),
        enabled: enabled && !!year && !!provider,
    })
}
