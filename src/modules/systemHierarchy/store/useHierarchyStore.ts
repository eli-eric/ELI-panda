import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HierarchyStore {
    expandedNodes: string[]
    copiedSystemUid: string | null
    toggleNode: (uid: string) => void
    expandNode: (uid: string) => void
    expandNodes: (uids: string[]) => void
    setExpandedNodes: (uids: string[]) => void
    collapseAll: () => void
    setCopiedSystemUid: (uid: string | null) => void
}

export const useHierarchyStore = create<HierarchyStore>()(
    persist(
        (set, get) => ({
            expandedNodes: [],
            copiedSystemUid: null,
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
            setCopiedSystemUid: (uid: string | null) => set({ copiedSystemUid: uid }),
        }),
        {
            name: 'hierarchy-expanded-nodes',
            partialize: state => ({
                expandedNodes: state.expandedNodes,
            }),
        },
    ),
)
