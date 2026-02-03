import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { SystemLeaf } from '../../types'
import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

export const useSystemDetail = (leafUid: string | null) => {
    const queryKey: QueryFetcherKey = [SYSTEM_DETAIL_QUERY_KEY, { uid: leafUid }]

    const { data, isFetching, isError, error } = useQuery<
        SystemLeaf,
        Error,
        SystemLeaf,
        QueryFetcherKey
    >({
        queryKey,
        queryFn: queryFetcher<SystemLeaf>('systemDetail'),
        enabled: !!leafUid,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (isError && error) {
            toast.error(`Error fetching system detail: ${error.message}`)
        }
    }, [isError, error])

    return {
        system: data ?? null,
        isLoading: isFetching,
        error,
        queryKey,
    }
}
