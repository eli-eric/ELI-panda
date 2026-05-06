import { useCallback, useMemo, useState } from 'react'

import {
    getDefaultDetailGraphRelationshipTypes,
    useDetailGraphStore,
} from '../store/useDetailGraphStore'
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
        [
            filters,
            setSearch,
            toggleSystemLevel,
            setSystemType,
            toggleRelationshipType,
            resetFilters,
        ],
    )
}

export const useDetailGraphFilters = () => {
    const storedRelationshipTypes = useDetailGraphStore(state => state.relationshipTypes)
    const setStoredRelationshipTypes = useDetailGraphStore(state => state.setRelationshipTypes)

    const [search, setSearchState] = useState<string>('')
    const [systemLevels, setSystemLevels] = useState<string[]>([])
    const [systemType, setSystemTypeState] = useState<string | null>(null)

    const effectiveRelationshipTypes = useMemo(
        () => storedRelationshipTypes ?? getDefaultDetailGraphRelationshipTypes(),
        [storedRelationshipTypes],
    )

    const filters: GraphFilterState = useMemo(
        () => ({
            search,
            systemLevels,
            systemType,
            relationshipTypes: effectiveRelationshipTypes,
        }),
        [search, systemLevels, systemType, effectiveRelationshipTypes],
    )

    const setSearch = useCallback((value: string) => {
        setSearchState(value)
    }, [])

    const toggleSystemLevel = useCallback((level: string) => {
        setSystemLevels(prev =>
            prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level],
        )
    }, [])

    const setSystemType = useCallback((value: string | null) => {
        setSystemTypeState(value)
    }, [])

    const toggleRelationshipType = useCallback(
        (type: string) => {
            const stored = useDetailGraphStore.getState().relationshipTypes
            const current = stored ?? getDefaultDetailGraphRelationshipTypes()
            const next = current.includes(type)
                ? current.filter(t => t !== type)
                : [...current, type]
            setStoredRelationshipTypes(next)
        },
        [setStoredRelationshipTypes],
    )

    const resetFilters = useCallback(() => {
        setSearchState('')
        setSystemLevels([])
        setSystemTypeState(null)
        setStoredRelationshipTypes(null)
    }, [setStoredRelationshipTypes])

    return useMemo(
        () => ({
            filters,
            setSearch,
            toggleSystemLevel,
            setSystemType,
            toggleRelationshipType,
            resetFilters,
        }),
        [
            filters,
            setSearch,
            toggleSystemLevel,
            setSystemType,
            toggleRelationshipType,
            resetFilters,
        ],
    )
}
