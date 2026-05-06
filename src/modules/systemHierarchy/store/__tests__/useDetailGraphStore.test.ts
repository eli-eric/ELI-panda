import { act } from '@testing-library/react'

import { GRAPH_LAYOUT_MODES, type RelationshipGraphEdge, type RelationshipGraphNode } from '../../types/graph'
import {
    getDefaultDetailGraphRelationshipTypes,
    useDetailGraphStore,
} from '../useDetailGraphStore'

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

const node = (uid: string): RelationshipGraphNode =>
    ({
        uid,
        name: uid,
        systemCode: null,
        systemLevel: 'Lvl1',
        systemType: null,
    }) as unknown as RelationshipGraphNode

const edge = (uid: string, source: string, target: string): RelationshipGraphEdge =>
    ({
        uid,
        source,
        target,
        relationship: 'IS_SPARE_FOR',
    }) as unknown as RelationshipGraphEdge

describe('useDetailGraphStore', () => {
    beforeEach(() => {
        resetStore()
    })

    it('starts with relationshipTypes === null (sentinel for "use default")', () => {
        expect(useDetailGraphStore.getState().relationshipTypes).toBeNull()
    })

    it('default helper returns all RELATIONSHIP_DEFINITIONS keys except HAS_SUBSYSTEM', () => {
        const defaults = getDefaultDetailGraphRelationshipTypes()
        expect(defaults).not.toContain('HAS_SUBSYSTEM')
        expect(defaults.length).toBeGreaterThan(0)
        expect(defaults).toContain('IS_SPARE_FOR')
    })

    it('setRelationshipTypes writes explicit list', () => {
        act(() => {
            useDetailGraphStore.getState().setRelationshipTypes(['IS_SPARE_FOR'])
        })
        expect(useDetailGraphStore.getState().relationshipTypes).toEqual(['IS_SPARE_FOR'])
    })

    it('setRelationshipTypes(null) restores sentinel for default', () => {
        act(() => {
            useDetailGraphStore.getState().setRelationshipTypes(['IS_SPARE_FOR'])
            useDetailGraphStore.getState().setRelationshipTypes(null)
        })
        expect(useDetailGraphStore.getState().relationshipTypes).toBeNull()
    })

    it('partialize persists only relationshipTypes + layoutMode', () => {
        act(() => {
            useDetailGraphStore.getState().setRelationshipTypes(['IS_SPARE_FOR'])
            useDetailGraphStore.getState().setLayoutMode(GRAPH_LAYOUT_MODES.HORIZONTAL)
            useDetailGraphStore.getState().addExpanded([node('a')], [edge('e1', 'a', 'b')])
        })
        const raw = localStorage.getItem(STORAGE_KEY)
        expect(raw).not.toBeNull()
        const persisted = JSON.parse(raw as string).state
        expect(persisted.relationshipTypes).toEqual(['IS_SPARE_FOR'])
        expect(persisted.layoutMode).toEqual(GRAPH_LAYOUT_MODES.HORIZONTAL)
        expect(persisted.expandedNodes).toBeUndefined()
        expect(persisted.expandedEdges).toBeUndefined()
    })

    it('addExpanded deduplicates by uid', () => {
        act(() => {
            useDetailGraphStore.getState().addExpanded([node('a'), node('b')], [edge('e1', 'a', 'b')])
            useDetailGraphStore.getState().addExpanded([node('a'), node('c')], [edge('e1', 'a', 'b'), edge('e2', 'b', 'c')])
        })
        const { expandedNodes, expandedEdges } = useDetailGraphStore.getState()
        expect(expandedNodes.map(n => n.uid)).toEqual(['a', 'b', 'c'])
        expect(expandedEdges.map(e => e.uid)).toEqual(['e1', 'e2'])
    })

    it('resetExpanded clears nodes + edges', () => {
        act(() => {
            useDetailGraphStore.getState().addExpanded([node('a')], [edge('e1', 'a', 'b')])
            useDetailGraphStore.getState().resetExpanded()
        })
        expect(useDetailGraphStore.getState().expandedNodes).toEqual([])
        expect(useDetailGraphStore.getState().expandedEdges).toEqual([])
    })
})
