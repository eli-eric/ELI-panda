import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'
import type { RelationshipGraphResponse } from '../../types/graph'
import { fromSystemGraphResponse } from '../../utils/graphTransformers'

interface UseRelationshipGraphOptions {
    systemUid?: string | null
    enabled?: boolean
}

export const useRelationshipGraph = (options: UseRelationshipGraphOptions = {}) => {
    const { systemUid, enabled = true } = options

    const queryKey: QueryFetcherKey = useMemo(
        () =>
            systemUid
                ? [RELATIONSHIP_GRAPH_QUERY_KEY, { uid: systemUid }]
                : [RELATIONSHIP_GRAPH_QUERY_KEY],
        [systemUid],
    )

    const { data, isLoading, error } = useQuery<
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
    })

    return {
        nodes: data?.nodes ?? [],
        edges: data?.links ?? [],
        isLoading,
        error,
        queryKey,
    }
}
