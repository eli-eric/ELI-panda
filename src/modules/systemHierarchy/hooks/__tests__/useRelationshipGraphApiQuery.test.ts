import { renderHook } from '@testing-library/react'

import { useRelationshipGraphApiQuery } from '../useRelationshipGraphApiQuery'

describe('useRelationshipGraphApiQuery', () => {
    it('normalizes filters into stable API query', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({
                search: '  pump  ',
                systemLevels: ['TECHNOLOGY_UNIT', 'KEY_SYSTEMS'],
                systemType: 'Motor',
                relationshipTypes: ['IS_POWERED_BY', 'HAS_SUBSYSTEM'],
            }),
        )

        expect(result.current.apiFilterQuery).toEqual({
            search: 'pump',
            systemLevels: 'KEY_SYSTEMS,TECHNOLOGY_UNIT',
            systemType: 'Motor',
            relationshipTypes: 'HAS_SUBSYSTEM,IS_POWERED_BY',
        })
    })

    it('returns the same filter query key for equivalent filter order', () => {
        const first = renderHook(() =>
            useRelationshipGraphApiQuery({
                search: '',
                systemLevels: ['B', 'A'],
                systemType: null,
                relationshipTypes: ['Y', 'X'],
            }),
        )

        const second = renderHook(() =>
            useRelationshipGraphApiQuery({
                search: '',
                systemLevels: ['A', 'B'],
                systemType: null,
                relationshipTypes: ['X', 'Y'],
            }),
        )

        expect(first.result.current.filterQueryKey).toBe(second.result.current.filterQueryKey)
    })

    it('always includes initial paging query settings', () => {
        const { result } = renderHook(() =>
            useRelationshipGraphApiQuery({
                search: '',
                systemLevels: [],
                systemType: null,
                relationshipTypes: [],
            }),
        )

        expect(result.current.initialScopeQuery).toEqual({
            limitPerRelationshipType: 20,
            includeRelationshipStats: true,
        })
    })
})
