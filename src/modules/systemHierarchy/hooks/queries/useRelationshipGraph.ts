import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'
import type { QueryFetcherKey } from '@/utils/fetcher'
import { queryFetcher } from '@/utils/fetcher'

import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'
import type { RelationshipGraphResponse } from '../../types/graph'
import { fromSystemGraphResponse } from '../../utils/graphTransformers'
import { MOCK_GRAPH_DATA } from '../../utils/mockGraphData'

// Toggle to false to use mock data when backend is unavailable
const USE_REAL_API = true

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

    // Real API: uses generalGraph endpoint (/general/{uid}/graph)
    // then maps SystemGraphResponse → RelationshipGraphResponse
    const { data, isLoading, error } = useQuery<
        RelationshipGraphResponse,
        Error,
        RelationshipGraphResponse,
        QueryFetcherKey
    >({
        queryKey,
        queryFn: USE_REAL_API
            ? async (...args) => {
                  const raw =
                      await queryFetcher<SystemGraphResponse>('generalGraph')(...args)
                  return fromSystemGraphResponse(raw)
              }
            : () => Promise.resolve(MOCK_GRAPH_DATA),
        enabled: enabled && (USE_REAL_API ? !!systemUid : true),
    })

    return {
        nodes: data?.nodes ?? [],
        edges: data?.links ?? [],
        isLoading,
        error,
        queryKey,
    }
}
