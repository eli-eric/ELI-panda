import { useCallback, useMemo, useState } from 'react'

import { DEFAULT_GRAPH_FILTERS, type GraphFilterState } from '../utils/graphFilters'

export const useGraphFilters = () => {
    const [filters, setFilters] = useState<GraphFilterState>(DEFAULT_GRAPH_FILTERS)

    const setSearch = useCallback((search: string) => {
        setFilters(prev => ({ ...prev, search }))
    }, [])

    const setSystemLevel = useCallback((systemLevel: string | null) => {
        setFilters(prev => ({ ...prev, systemLevel }))
    }, [])

    const setSystemType = useCallback((systemType: string | null) => {
        setFilters(prev => ({ ...prev, systemType }))
    }, [])

    const setRelationshipType = useCallback((relationshipType: string | null) => {
        setFilters(prev => ({ ...prev, relationshipType }))
    }, [])

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_GRAPH_FILTERS)
    }, [])

    return useMemo(
        () => ({
            filters,
            setSearch,
            setSystemLevel,
            setSystemType,
            setRelationshipType,
            resetFilters,
        }),
        [filters, setSearch, setSystemLevel, setSystemType, setRelationshipType, resetFilters],
    )
}
