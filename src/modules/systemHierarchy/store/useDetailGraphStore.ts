import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { GraphLayoutMode, RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'
import { GRAPH_LAYOUT_MODES, RELATIONSHIP_DEFINITIONS } from '../types/graph'

interface DetailGraphStore {
    relationshipTypes: string[] | null
    layoutMode: GraphLayoutMode
    expandedNodes: RelationshipGraphNode[]
    expandedEdges: RelationshipGraphEdge[]
    setRelationshipTypes: (types: string[] | null) => void
    setLayoutMode: (mode: GraphLayoutMode) => void
    addExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    setExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    resetExpanded: () => void
}

export const useDetailGraphStore = create<DetailGraphStore>()(
    persist(
        (set, get) => ({
            relationshipTypes: null,
            layoutMode: GRAPH_LAYOUT_MODES.VERTICAL as GraphLayoutMode,
            expandedNodes: [],
            expandedEdges: [],
            setRelationshipTypes: types => set({ relationshipTypes: types }),
            setLayoutMode: mode => set({ layoutMode: mode }),
            addExpanded: (nodes, edges) => {
                const { expandedNodes, expandedEdges } = get()
                const seenNodes = new Set(expandedNodes.map(n => n.uid))
                const seenEdges = new Set(expandedEdges.map(e => e.uid))
                set({
                    expandedNodes: [
                        ...expandedNodes,
                        ...nodes.filter(n => !seenNodes.has(n.uid)),
                    ],
                    expandedEdges: [
                        ...expandedEdges,
                        ...edges.filter(e => !seenEdges.has(e.uid)),
                    ],
                })
            },
            setExpanded: (nodes, edges) =>
                set({ expandedNodes: nodes, expandedEdges: edges }),
            resetExpanded: () => set({ expandedNodes: [], expandedEdges: [] }),
        }),
        {
            name: 'systemHierarchy-detail-graph',
            partialize: state => ({
                relationshipTypes: state.relationshipTypes,
                layoutMode: state.layoutMode,
            }),
        },
    ),
)

export const getDefaultDetailGraphRelationshipTypes = (): string[] =>
    Object.keys(RELATIONSHIP_DEFINITIONS).filter(type => type !== 'HAS_SUBSYSTEM')
