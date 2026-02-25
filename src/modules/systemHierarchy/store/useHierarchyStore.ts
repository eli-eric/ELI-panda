import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { GraphLayoutMode } from '../types/graph'
import { GRAPH_LAYOUT_MODES } from '../types/graph'

interface HierarchyStore {
    expandedNodes: string[]
    graphLayoutMode: GraphLayoutMode
    toggleNode: (uid: string) => void
    expandNode: (uid: string) => void
    expandNodes: (uids: string[]) => void
    setExpandedNodes: (uids: string[]) => void
    collapseAll: () => void
    setGraphLayoutMode: (mode: GraphLayoutMode) => void
}

export const useHierarchyStore = create<HierarchyStore>()(
    persist(
        (set, get) => ({
            expandedNodes: [],
            graphLayoutMode: GRAPH_LAYOUT_MODES.VERTICAL as GraphLayoutMode,
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
        }),
        {
            name: 'hierarchy-expanded-nodes',
        },
    ),
)
