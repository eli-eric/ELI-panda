import { useMemo } from 'react'

import { RELATIONSHIP_GRAPH_INITIAL_LIMIT } from '../types/constants'
import type { GraphFilterState } from '../utils/graphFilters'

type ApiFilterQuery = Record<string, string>

interface UseRelationshipGraphApiQueryResult {
    apiFilterQuery: ApiFilterQuery
    filterQueryKey: string
    initialScopeQuery: Record<string, string | number | boolean>
}

export const useRelationshipGraphApiQuery = (
    filters: GraphFilterState,
): UseRelationshipGraphApiQueryResult => {
    const apiFilterQuery = useMemo(() => {
        const query: ApiFilterQuery = {}
        const trimmedSearch = filters.search.trim()

        if (trimmedSearch) query.search = trimmedSearch
        if (filters.systemLevels.length > 0) {
            query.systemLevels = [...filters.systemLevels].sort().join(',')
        }
        if (filters.systemType) query.systemType = filters.systemType
        if (filters.relationshipTypes.length > 0) {
            query.relationshipTypes = [...filters.relationshipTypes].sort().join(',')
        }

        return query
    }, [filters.relationshipTypes, filters.search, filters.systemLevels, filters.systemType])

    const filterQueryKey = useMemo(() => JSON.stringify(apiFilterQuery), [apiFilterQuery])

    const initialScopeQuery = useMemo(
        () => ({
            ...apiFilterQuery,
            limitPerRelationshipType: RELATIONSHIP_GRAPH_INITIAL_LIMIT,
            includeRelationshipStats: true,
        }),
        [apiFilterQuery],
    )

    return {
        apiFilterQuery,
        filterQueryKey,
        initialScopeQuery,
    }
}
