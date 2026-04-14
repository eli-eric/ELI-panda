import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import {
    RELATIONSHIP_GRAPH_INITIAL_LIMIT,
    RELATIONSHIP_GRAPH_QUERY_KEY,
} from '../../types/constants'
import type { RelationshipGraphResponse } from '../../types/graph'
import { fromSystemGraphResponse } from '../../utils/graphTransformers'

interface UseRelationshipGraphOptions {
    systemUid?: string | null
    enabled?: boolean
    query?: Record<string, string | number | boolean>
    paged?: boolean
    staleTime?: number
}

export const useRelationshipGraph = (options: UseRelationshipGraphOptions = {}) => {
    const { systemUid, enabled = true, query, paged = true, staleTime } = options

    const requestQuery = useMemo(() => {
        const base = query ?? {}
        if (!paged) return base

        return {
            ...base,
            limitPerRelationshipType: RELATIONSHIP_GRAPH_INITIAL_LIMIT,
            includeRelationshipStats: true,
        }
    }, [query, paged])

    const queryKey: QueryFetcherKey = useMemo(
        () =>
            systemUid
                ? [RELATIONSHIP_GRAPH_QUERY_KEY, { uid: systemUid, query: requestQuery }]
                : [RELATIONSHIP_GRAPH_QUERY_KEY],
        [systemUid, requestQuery],
    )

    const { data, isLoading, isFetching, error, refetch } = useQuery<
        RelationshipGraphResponse,
        Error,
        RelationshipGraphResponse,
        QueryFetcherKey
    >({
        queryKey,
        queryFn: async (...args) => {
            const raw = await queryFetcher<SystemGraphResponse>('systemGraph')(...args)
            return fromSystemGraphResponse(raw)
        },
        enabled: enabled && !!systemUid,
        placeholderData: keepPreviousData,
        staleTime,
    })

    return {
        nodes: data?.nodes ?? [],
        edges: data?.links ?? [],
        meta: data?.meta,
        isLoading,
        isFetching,
        error,
        refetch,
        queryKey,
    }
}
