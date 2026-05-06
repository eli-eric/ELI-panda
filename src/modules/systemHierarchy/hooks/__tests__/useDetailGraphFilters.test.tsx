import { act, renderHook } from '@testing-library/react'

import {
    getDefaultDetailGraphRelationshipTypes,
    useDetailGraphStore,
} from '../../store/useDetailGraphStore'
import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import { useDetailGraphFilters } from '../useGraphFilters'

const STORAGE_KEY = 'systemHierarchy-detail-graph'

const resetStore = () => {
    localStorage.removeItem(STORAGE_KEY)
    useDetailGraphStore.setState({
        relationshipTypes: null,
        layoutMode: GRAPH_LAYOUT_MODES.VERTICAL,
        expandedNodes: [],
        expandedEdges: [],
    })
}

describe('useDetailGraphFilters', () => {
    beforeEach(() => {
        resetStore()
    })

    it('returns default allowlist (all-except-HAS_SUBSYSTEM) when store has null sentinel', () => {
        const { result } = renderHook(() => useDetailGraphFilters())
        const expected = getDefaultDetailGraphRelationshipTypes()
        expect(result.current.filters.relationshipTypes).toEqual(expected)
        expect(result.current.filters.relationshipTypes).not.toContain('HAS_SUBSYSTEM')
    })

    it('toggleRelationshipType("HAS_SUBSYSTEM") promotes filter to explicit 9-item list', () => {
        const { result } = renderHook(() => useDetailGraphFilters())
        act(() => {
            result.current.toggleRelationshipType('HAS_SUBSYSTEM')
        })
        expect(result.current.filters.relationshipTypes).toContain('HAS_SUBSYSTEM')
        expect(useDetailGraphStore.getState().relationshipTypes).toContain('HAS_SUBSYSTEM')
        const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) as string).state
        expect(persisted.relationshipTypes).toContain('HAS_SUBSYSTEM')
    })

    it('toggleRelationshipType twice normalizes back to null sentinel (matches default)', () => {
        const { result } = renderHook(() => useDetailGraphFilters())
        act(() => {
            result.current.toggleRelationshipType('HAS_SUBSYSTEM')
            result.current.toggleRelationshipType('HAS_SUBSYSTEM')
        })
        expect(result.current.filters.relationshipTypes).not.toContain('HAS_SUBSYSTEM')
        // Normalization: explicit list equal to default collapses to null sentinel for forward-compat.
        expect(useDetailGraphStore.getState().relationshipTypes).toBeNull()
        expect(result.current.filters.relationshipTypes).toEqual(
            getDefaultDetailGraphRelationshipTypes(),
        )
    })

    it('resetFilters clears search/level/type AND restores null sentinel for relationshipTypes', () => {
        const { result } = renderHook(() => useDetailGraphFilters())
        act(() => {
            result.current.setSearch('turbo')
            result.current.toggleSystemLevel('Lvl1')
            result.current.setSystemType('Pump')
            result.current.toggleRelationshipType('HAS_SUBSYSTEM')
        })
        expect(result.current.filters.search).toBe('turbo')
        expect(result.current.filters.systemLevels).toEqual(['Lvl1'])
        expect(result.current.filters.systemType).toBe('Pump')
        expect(useDetailGraphStore.getState().relationshipTypes).toContain('HAS_SUBSYSTEM')

        act(() => {
            result.current.resetFilters()
        })
        expect(result.current.filters.search).toBe('')
        expect(result.current.filters.systemLevels).toEqual([])
        expect(result.current.filters.systemType).toBeNull()
        expect(useDetailGraphStore.getState().relationshipTypes).toBeNull()
        expect(result.current.filters.relationshipTypes).toEqual(
            getDefaultDetailGraphRelationshipTypes(),
        )
    })

    it('toggling off the last remaining type writes null sentinel (no empty-list inversion)', () => {
        const { result } = renderHook(() => useDetailGraphFilters())
        act(() => {
            result.current.toggleRelationshipType('HAS_SUBSYSTEM')
        })
        const explicitNine = useDetailGraphStore.getState().relationshipTypes ?? []
        expect(explicitNine).toHaveLength(9)

        act(() => {
            useDetailGraphStore.getState().setRelationshipTypes(['IS_SPARE_FOR'])
        })
        expect(useDetailGraphStore.getState().relationshipTypes).toEqual(['IS_SPARE_FOR'])

        act(() => {
            result.current.toggleRelationshipType('IS_SPARE_FOR')
        })
        expect(useDetailGraphStore.getState().relationshipTypes).toBeNull()
        expect(result.current.filters.relationshipTypes).toEqual(
            getDefaultDetailGraphRelationshipTypes(),
        )
    })

    it('search is session-only — does not persist to localStorage', () => {
        const { result } = renderHook(() => useDetailGraphFilters())
        act(() => {
            result.current.setSearch('turbo')
        })
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            const persisted = JSON.parse(raw).state
            expect(persisted.search).toBeUndefined()
        }
    })
})
