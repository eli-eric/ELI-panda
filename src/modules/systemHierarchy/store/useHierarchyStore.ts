import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HierarchyStore {
    expandedNodes: string[]
    toggleNode: (uid: string) => void
    expandNode: (uid: string) => void
    collapseAll: () => void
}

export const useHierarchyStore = create<HierarchyStore>()(
    persist(
        (set, get) => ({
            expandedNodes: [],
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
            collapseAll: () => set({ expandedNodes: [] }),
        }),
        {
            name: 'hierarchy-expanded-nodes',
        },
    ),
)
