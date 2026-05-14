import { act, renderHook } from '@testing-library/react'

import { DEFAULT_GRAPH_FILTERS } from '../../utils/graphFilters'
import { useGraphFilters } from '../useGraphFilters'

describe('useGraphFilters', () => {
    it('initializes with DEFAULT_GRAPH_FILTERS', () => {
        const { result } = renderHook(() => useGraphFilters())
        expect(result.current.filters).toEqual(DEFAULT_GRAPH_FILTERS)
    })

    it('setSearch updates search field only', () => {
        const { result } = renderHook(() => useGraphFilters())
        act(() => result.current.setSearch('q'))
        expect(result.current.filters.search).toBe('q')
    })

    it('toggleSystemLevel adds/removes from list', () => {
        const { result } = renderHook(() => useGraphFilters())
        act(() => result.current.toggleSystemLevel('KEY_SYSTEMS'))
        expect(result.current.filters.systemLevels).toContain('KEY_SYSTEMS')
        act(() => result.current.toggleSystemLevel('KEY_SYSTEMS'))
        expect(result.current.filters.systemLevels).not.toContain('KEY_SYSTEMS')
    })

    it('setSystemType updates systemType', () => {
        const { result } = renderHook(() => useGraphFilters())
        act(() => result.current.setSystemType('ENGINE'))
        expect(result.current.filters.systemType).toBe('ENGINE')
        act(() => result.current.setSystemType(null))
        expect(result.current.filters.systemType).toBeNull()
    })

    it('toggleRelationshipType adds/removes type', () => {
        const { result } = renderHook(() => useGraphFilters())
        act(() => result.current.toggleRelationshipType('IS_SPARE_FOR'))
        expect(result.current.filters.relationshipTypes).toContain('IS_SPARE_FOR')
        act(() => result.current.toggleRelationshipType('IS_SPARE_FOR'))
        expect(result.current.filters.relationshipTypes).not.toContain('IS_SPARE_FOR')
    })

    it('resetFilters returns to defaults', () => {
        const { result } = renderHook(() => useGraphFilters())
        act(() => result.current.setSearch('x'))
        act(() => result.current.toggleSystemLevel('A'))
        act(() => result.current.resetFilters())
        expect(result.current.filters).toEqual(DEFAULT_GRAPH_FILTERS)
    })
})
