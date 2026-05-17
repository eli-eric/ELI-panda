import { act, renderHook } from '@testing-library/react'

import { useRelationshipGraphScopes } from '../useRelationshipGraphScopes'

const baseProps = {
    graphUid: 'g-1',
    filterQueryKey: 'fk-1',
    graphScopeKey: 'graph:g-1',
    apiMeta: undefined,
    resetGraphExpanded: () => {},
}

describe('useRelationshipGraphScopes', () => {
    it('initial state has activeScopeKey=graphScopeKey + empty scope states', () => {
        const { result } = renderHook(() => useRelationshipGraphScopes(baseProps))
        expect(result.current.activeScopeKey).toBe('graph:g-1')
        expect(result.current.scopeStates).toEqual({})
        expect(result.current.loadMoreLoading).toEqual({})
        expect(result.current.expandedScopeUids).toEqual([])
    })

    it('apiMeta change merges into scopeStates[graphScopeKey]', () => {
        const meta = {
            relationshipStats: { A: { total: 10, returned: 5, hasMore: true } },
        } as any
        const { result, rerender } = renderHook(
            (props: any) => useRelationshipGraphScopes(props),
            { initialProps: baseProps },
        )
        rerender({ ...baseProps, apiMeta: meta })
        expect(result.current.scopeStates['graph:g-1']).toBeDefined()
    })

    it('registerExpandedScopeUid dedupes added uid', () => {
        const { result } = renderHook(() => useRelationshipGraphScopes(baseProps))
        act(() => {
            result.current.registerExpandedScopeUid('a')
            result.current.registerExpandedScopeUid('a')
            result.current.registerExpandedScopeUid('b')
        })
        expect(result.current.expandedScopeUids).toEqual(['a', 'b'])
    })

    it('setNodeScopeMeta writes node:<uid> key', () => {
        const { result } = renderHook(() => useRelationshipGraphScopes(baseProps))
        act(() => {
            result.current.setNodeScopeMeta('u-1', {
                relationshipStats: { A: { total: 3, returned: 2, hasMore: true } },
            } as any)
        })
        expect(result.current.scopeStates['node:u-1']).toBeDefined()
    })

    it('setLoadMoreTypeLoading creates compound key', () => {
        const { result } = renderHook(() => useRelationshipGraphScopes(baseProps))
        act(() => {
            result.current.setLoadMoreTypeLoading('graph:g-1', 'A', true)
        })
        expect(result.current.loadMoreLoading['graph:g-1:A']).toBe(true)
    })

    it('changing graphUid resets scopeStates + expandedScopeUids + calls resetGraphExpanded', () => {
        const resetGraphExpanded = jest.fn()
        const { result, rerender } = renderHook(
            (props: any) => useRelationshipGraphScopes(props),
            { initialProps: { ...baseProps, resetGraphExpanded } },
        )
        act(() => {
            result.current.registerExpandedScopeUid('a')
        })
        rerender({ ...baseProps, graphUid: 'g-2', resetGraphExpanded })
        expect(result.current.expandedScopeUids).toEqual([])
        expect(resetGraphExpanded).toHaveBeenCalled()
    })

    it('changing filterQueryKey clears scopeStates + loadMoreLoading', () => {
        const { result, rerender } = renderHook(
            (props: any) => useRelationshipGraphScopes(props),
            { initialProps: baseProps },
        )
        act(() => {
            result.current.setLoadMoreTypeLoading('graph:g-1', 'A', true)
        })
        rerender({ ...baseProps, filterQueryKey: 'fk-2' })
        expect(result.current.loadMoreLoading).toEqual({})
        expect(result.current.scopeStates).toEqual({})
    })
})
