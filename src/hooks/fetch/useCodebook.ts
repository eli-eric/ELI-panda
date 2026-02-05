import { keepPreviousData, useQuery } from '@tanstack/react-query'

import type { CODEBOOK } from '@/types/constants/codebook'
import type { CodebookQuery, CodebookTypeResponse } from '@/types/responses/codebook'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

export const useCodebook = (codebookName?: CODEBOOK, query?: CodebookQuery) => {
    const filterString = JSON.stringify(query?.filter || '')

    const queryKey: QueryFetcherKey = [
        'codebook',
        {
            path: codebookName,
            query: { ...query, filter: filterString },
        },
    ]

    const { data, isLoading } = useQuery({
        queryKey: queryKey,
        queryFn: queryFetcher<CodebookTypeResponse>('codebook'),
        placeholderData: keepPreviousData,
        enabled: !!codebookName,
    })

    return { data, isLoading, queryKey }
}
