import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import {
    getDefaultDetailGraphRelationshipTypes,
    useDetailGraphStore,
} from '../useDetailGraphStore'

beforeEach(() => {
    useDetailGraphStore.setState({
        relationshipTypes: null,
        layoutMode: GRAPH_LAYOUT_MODES.VERTICAL,
        expandedNodes: [],
        expandedEdges: [],
    })
})

describe('useDetailGraphStore', () => {
    it('defaults: relationshipTypes=null, layoutMode=VERTICAL, empty expanded', () => {
        const state = useDetailGraphStore.getState()
        expect(state.relationshipTypes).toBeNull()
        expect(state.layoutMode).toBe(GRAPH_LAYOUT_MODES.VERTICAL)
        expect(state.expandedNodes).toEqual([])
        expect(state.expandedEdges).toEqual([])
    })

    it('setRelationshipTypes + setLayoutMode update state', () => {
        useDetailGraphStore.getState().setRelationshipTypes(['HAS_SUBSYSTEM'])
        useDetailGraphStore.getState().setLayoutMode(GRAPH_LAYOUT_MODES.HORIZONTAL)
        const state = useDetailGraphStore.getState()
        expect(state.relationshipTypes).toEqual(['HAS_SUBSYSTEM'])
        expect(state.layoutMode).toBe(GRAPH_LAYOUT_MODES.HORIZONTAL)
    })

    it('addExpanded appends nodes + edges deduping by uid', () => {
        const { addExpanded } = useDetailGraphStore.getState()
        addExpanded(
            [{ uid: 'a' } as any, { uid: 'b' } as any],
            [{ uid: 'e1' } as any],
        )
        addExpanded(
            [{ uid: 'b' } as any, { uid: 'c' } as any],
            [{ uid: 'e1' } as any, { uid: 'e2' } as any],
        )
        const state = useDetailGraphStore.getState()
        expect(state.expandedNodes.map(n => n.uid)).toEqual(['a', 'b', 'c'])
        expect(state.expandedEdges.map(e => e.uid)).toEqual(['e1', 'e2'])
    })

    it('setExpanded replaces nodes + edges', () => {
        useDetailGraphStore.getState().setExpanded(
            [{ uid: 'a' } as any],
            [{ uid: 'e1' } as any],
        )
        useDetailGraphStore.getState().setExpanded(
            [{ uid: 'b' } as any],
            [{ uid: 'e2' } as any],
        )
        expect(useDetailGraphStore.getState().expandedNodes.map(n => n.uid)).toEqual(['b'])
        expect(useDetailGraphStore.getState().expandedEdges.map(e => e.uid)).toEqual(['e2'])
    })

    it('resetExpanded clears expanded state', () => {
        useDetailGraphStore.getState().setExpanded(
            [{ uid: 'a' } as any],
            [{ uid: 'e' } as any],
        )
        useDetailGraphStore.getState().resetExpanded()
        const state = useDetailGraphStore.getState()
        expect(state.expandedNodes).toEqual([])
        expect(state.expandedEdges).toEqual([])
    })

    it('getDefaultDetailGraphRelationshipTypes excludes HAS_SUBSYSTEM', () => {
        const defaults = getDefaultDetailGraphRelationshipTypes()
        expect(defaults.length).toBeGreaterThan(0)
        expect(defaults).not.toContain('HAS_SUBSYSTEM')
    })
})
