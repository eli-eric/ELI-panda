import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CatalogueTreeStore {
    expandedNodes: string[]
    copiedCategoryUid: string | null
    copiedItemUid: string | null
    toggleNode: (uid: string) => void
    expandNode: (uid: string) => void
    expandNodes: (uids: string[]) => void
    setExpandedNodes: (uids: string[]) => void
    collapseAll: () => void
    setCopiedCategoryUid: (uid: string | null) => void
    setCopiedItemUid: (uid: string | null) => void
}

export const useCatalogueTreeStore = create<CatalogueTreeStore>()(
    persist(
        (set, get) => ({
            expandedNodes: [],
            copiedCategoryUid: null,
            copiedItemUid: null,
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
            setExpandedNodes: (uids: string[]) => set({ expandedNodes: uids }),
            collapseAll: () => set({ expandedNodes: [] }),
            setCopiedCategoryUid: (uid: string | null) => set({ copiedCategoryUid: uid }),
            setCopiedItemUid: (uid: string | null) => set({ copiedItemUid: uid }),
        }),
        {
            name: 'catalogue-tree-expanded',
            partialize: state => ({ expandedNodes: state.expandedNodes }),
        },
    ),
)
