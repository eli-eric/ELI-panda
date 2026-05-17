import { renderHook } from '@testing-library/react'

import { useRelationshipGraphApiQuery } from '../useRelationshipGraphApiQuery'

const baseFilters = {
    search: '',
    systemLevels: [] as string[],
    systemType: null as string | null,
    relationshipTypes: [] as string[],
}

describe('useRelationshipGraphApiQuery', () => {
    it('returns empty apiFilterQuery for default filters', () => {
        const { result } = renderHook(() => useRelationshipGraphApiQuery(baseFilters))
        expect(result.current.apiFilterQuery).toEqual({})
    })

    it('includes search when non-empty after trim', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({ ...baseFilters, search: '  foo  ' }),
        )
        expect(result.current.apiFilterQuery.search).toBe('foo')
    })

    it('skips search when whitespace-only', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({ ...baseFilters, search: '   ' }),
        )
        expect(result.current.apiFilterQuery.search).toBeUndefined()
    })

    it('sorts + joins systemLevels by comma', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({
                ...baseFilters,
                systemLevels: ['z', 'a', 'm'],
            }),
        )
        expect(result.current.apiFilterQuery.systemLevels).toBe('a,m,z')
    })

    it('forwards systemType when set', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({ ...baseFilters, systemType: 'TypeA' }),
        )
        expect(result.current.apiFilterQuery.systemType).toBe('TypeA')
    })

    it('sorts + joins relationshipTypes by comma', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({
                ...baseFilters,
                relationshipTypes: ['B', 'A'],
            }),
        )
        expect(result.current.apiFilterQuery.relationshipTypes).toBe('A,B')
    })

    it('filterQueryKey is a stable JSON string of apiFilterQuery', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({ ...baseFilters, search: 'x' }),
        )
        expect(result.current.filterQueryKey).toBe(JSON.stringify({ search: 'x' }))
    })

    it('initialScopeQuery extends apiFilterQuery with limit + stats flag', () => {
        const { result } = renderHook(() => useRelationshipGraphApiQuery(baseFilters))
        expect(result.current.initialScopeQuery.includeRelationshipStats).toBe(true)
        expect(typeof result.current.initialScopeQuery.limitPerRelationshipType).toBe('number')
    })
})
