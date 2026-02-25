import { useCallback, useMemo, useState } from 'react'

import { DEFAULT_GRAPH_FILTERS, type GraphFilterState } from '../utils/graphFilters'

export const useGraphFilters = () => {
    const [filters, setFilters] = useState<GraphFilterState>(DEFAULT_GRAPH_FILTERS)

    const setSearch = useCallback((search: string) => {
        setFilters(prev => ({ ...prev, search }))
    }, [])

    const toggleSystemLevel = useCallback((level: string) => {
        setFilters(prev => ({
            ...prev,
            systemLevels: prev.systemLevels.includes(level)
                ? prev.systemLevels.filter(l => l !== level)
                : [...prev.systemLevels, level],
        }))
    }, [])

    const setSystemType = useCallback((systemType: string | null) => {
        setFilters(prev => ({ ...prev, systemType }))
    }, [])

    const toggleRelationshipType = useCallback((type: string) => {
        setFilters(prev => ({
            ...prev,
            relationshipTypes: prev.relationshipTypes.includes(type)
                ? prev.relationshipTypes.filter(t => t !== type)
                : [...prev.relationshipTypes, type],
        }))
    }, [])

    const resetFilters = useCallback(() => {
        setFilters(DEFAULT_GRAPH_FILTERS)
    }, [])

    return useMemo(
        () => ({
            filters,
            setSearch,
            toggleSystemLevel,
            setSystemType,
            toggleRelationshipType,
            resetFilters,
        }),
        [filters, setSearch, toggleSystemLevel, setSystemType, toggleRelationshipType, resetFilters],
    )
}
