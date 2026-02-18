import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'

import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import type { HierarchyNode } from '../../types'
import { HIERARCHY_QUERY_KEY } from '../../types/constants'

export const useSystemHierarchy = () => {
    const queryKey: QueryFetcherKey = [HIERARCHY_QUERY_KEY]

    const { data, isFetching, isError, error } = useQuery<
        HierarchyNode[],
        Error,
        HierarchyNode[],
        QueryFetcherKey
    >({
        queryKey,
        queryFn: queryFetcher<HierarchyNode[]>('systemsHierarchy'),
        staleTime: 5 * 60 * 1000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (isError && error) {
            toast.error(`Error fetching hierarchy: ${error.message}`)
        }
    }, [isError, error])

    return {
        nodes: data ?? [],
        isLoading: isFetching,
        error,
        queryKey,
    }
}
