import { act } from '@testing-library/react'

import { useHierarchyStore } from '../useHierarchyStore'

const reset = () =>
    act(() =>
        useHierarchyStore.setState({
            expandedNodes: [],
            copiedSystemUid: null,
        }),
    )

describe('useHierarchyStore', () => {
    beforeEach(reset)

    it('defaults to empty expanded list', () => {
        const s = useHierarchyStore.getState()
        expect(s.expandedNodes).toEqual([])
    })

    it('toggleNode adds, then removes', () => {
        act(() => useHierarchyStore.getState().toggleNode('a'))
        expect(useHierarchyStore.getState().expandedNodes).toEqual(['a'])
        act(() => useHierarchyStore.getState().toggleNode('a'))
        expect(useHierarchyStore.getState().expandedNodes).toEqual([])
    })

    it('expandNode is idempotent', () => {
        act(() => {
            useHierarchyStore.getState().expandNode('a')
            useHierarchyStore.getState().expandNode('a')
        })
        expect(useHierarchyStore.getState().expandedNodes).toEqual(['a'])
    })

    it('expandNodes appends only new uids', () => {
        act(() => useHierarchyStore.getState().expandNodes(['a', 'b']))
        act(() => useHierarchyStore.getState().expandNodes(['b', 'c']))
        expect(useHierarchyStore.getState().expandedNodes).toEqual(['a', 'b', 'c'])
    })

    it('setExpandedNodes replaces the list', () => {
        act(() => useHierarchyStore.getState().expandNode('a'))
        act(() => useHierarchyStore.getState().setExpandedNodes(['x', 'y']))
        expect(useHierarchyStore.getState().expandedNodes).toEqual(['x', 'y'])
    })

    it('collapseAll empties the list', () => {
        act(() => useHierarchyStore.getState().expandNodes(['a', 'b', 'c']))
        act(() => useHierarchyStore.getState().collapseAll())
        expect(useHierarchyStore.getState().expandedNodes).toEqual([])
    })

    it('setCopiedSystemUid stores and clears the value', () => {
        act(() => useHierarchyStore.getState().setCopiedSystemUid('uid-1'))
        expect(useHierarchyStore.getState().copiedSystemUid).toBe('uid-1')
        act(() => useHierarchyStore.getState().setCopiedSystemUid(null))
        expect(useHierarchyStore.getState().copiedSystemUid).toBeNull()
    })
})
