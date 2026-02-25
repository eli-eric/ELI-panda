import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { GraphLayoutMode, RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'
import { GRAPH_LAYOUT_MODES } from '../types/graph'

interface HierarchyStore {
    expandedNodes: string[]
    graphLayoutMode: GraphLayoutMode
    graphExpandedNodes: RelationshipGraphNode[]
    graphExpandedEdges: RelationshipGraphEdge[]
    toggleNode: (uid: string) => void
    expandNode: (uid: string) => void
    expandNodes: (uids: string[]) => void
    setExpandedNodes: (uids: string[]) => void
    collapseAll: () => void
    setGraphLayoutMode: (mode: GraphLayoutMode) => void
    addGraphExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    resetGraphExpanded: () => void
}

export const useHierarchyStore = create<HierarchyStore>()(
    persist(
        (set, get) => ({
            expandedNodes: [],
            graphLayoutMode: GRAPH_LAYOUT_MODES.VERTICAL as GraphLayoutMode,
            graphExpandedNodes: [],
            graphExpandedEdges: [],
            toggleNode: (uid: string) => {
                const current = get().expandedNodes
                const isExpanded = current.includes(uid)
                set({
                    expandedNodes: isExpanded
                        ? current.filter(id => id !== uid)
                        : [...current, uid],
                })
            },
            expandNode: (uid: string) => {
                const current = get().expandedNodes
                if (!current.includes(uid)) {
                    set({ expandedNodes: [...current, uid] })
                }
            },
            expandNodes: (uids: string[]) => {
                const current = get().expandedNodes
                const newNodes = uids.filter(uid => !current.includes(uid))
                if (newNodes.length > 0) {
                    set({ expandedNodes: [...current, ...newNodes] })
                }
            },
            setExpandedNodes: (uids: string[]) => {
                set({ expandedNodes: uids })
            },
            collapseAll: () => set({ expandedNodes: [] }),
            setGraphLayoutMode: (mode: GraphLayoutMode) => set({ graphLayoutMode: mode }),
            addGraphExpanded: (nodes, edges) => {
                const { graphExpandedNodes, graphExpandedEdges } = get()
                const seenNodes = new Set(graphExpandedNodes.map(n => n.uid))
                const seenEdges = new Set(graphExpandedEdges.map(e => e.uid))
                set({
                    graphExpandedNodes: [...graphExpandedNodes, ...nodes.filter(n => !seenNodes.has(n.uid))],
                    graphExpandedEdges: [...graphExpandedEdges, ...edges.filter(e => !seenEdges.has(e.uid))],
                })
            },
            resetGraphExpanded: () => set({ graphExpandedNodes: [], graphExpandedEdges: [] }),
        }),
        {
            name: 'hierarchy-expanded-nodes',
            partialize: (state) => ({
                expandedNodes: state.expandedNodes,
                graphLayoutMode: state.graphLayoutMode,
            }),
        },
    ),
)
