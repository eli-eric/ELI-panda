import { act } from '@testing-library/react'

import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import { useHierarchyStore } from '../useHierarchyStore'

const reset = () =>
    act(() =>
        useHierarchyStore.setState({
            expandedNodes: [],
            graphLayoutMode: GRAPH_LAYOUT_MODES.VERTICAL,
            graphExpandedNodes: [],
            graphExpandedEdges: [],
            copiedSystemUid: null,
        }),
    )

const node = (uid: string) => ({ uid, label: uid }) as any
const edge = (uid: string) => ({ uid, source: 'a', target: 'b' }) as any

describe('useHierarchyStore', () => {
    beforeEach(reset)

    it('defaults to empty expanded list and VERTICAL graph layout', () => {
        const s = useHierarchyStore.getState()
        expect(s.expandedNodes).toEqual([])
        expect(s.graphLayoutMode).toBe(GRAPH_LAYOUT_MODES.VERTICAL)
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

    it('addGraphExpanded de-dupes by uid', () => {
        act(() =>
            useHierarchyStore
                .getState()
                .addGraphExpanded([node('a'), node('b')], [edge('e1')]),
        )
        act(() =>
            useHierarchyStore
                .getState()
                .addGraphExpanded([node('b'), node('c')], [edge('e1'), edge('e2')]),
        )
        const s = useHierarchyStore.getState()
        expect(s.graphExpandedNodes.map(n => n.uid)).toEqual(['a', 'b', 'c'])
        expect(s.graphExpandedEdges.map(e => e.uid)).toEqual(['e1', 'e2'])
    })

    it('setGraphExpanded replaces and resetGraphExpanded wipes', () => {
        act(() =>
            useHierarchyStore.getState().setGraphExpanded([node('a')], [edge('e1')]),
        )
        expect(useHierarchyStore.getState().graphExpandedNodes).toHaveLength(1)
        act(() => useHierarchyStore.getState().resetGraphExpanded())
        expect(useHierarchyStore.getState().graphExpandedNodes).toEqual([])
        expect(useHierarchyStore.getState().graphExpandedEdges).toEqual([])
    })

    it('setGraphLayoutMode flips between modes', () => {
        act(() =>
            useHierarchyStore.getState().setGraphLayoutMode(GRAPH_LAYOUT_MODES.HORIZONTAL),
        )
        expect(useHierarchyStore.getState().graphLayoutMode).toBe(GRAPH_LAYOUT_MODES.HORIZONTAL)
    })
})
