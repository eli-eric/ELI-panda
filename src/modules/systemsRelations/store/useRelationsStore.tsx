import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn as create } from 'zustand/traditional'

import type { RelationshipType } from '@/modules/systemHierarchy/types/graph'

type RelationsStore = {
    selectedUidForSystem?: string
    setSelectedUidForSystem: (uid?: string) => void
    selectedRelationshipType?: RelationshipType
    setSelectedRelationshipType: (type?: RelationshipType) => void
}

export const useRelationsStore = create<RelationsStore>()(
    persist(
        set => ({
            selectedUidForSystem: undefined,
            setSelectedUidForSystem: (uid?: string) => {
                set(() => ({ selectedUidForSystem: uid }))
            },
            selectedRelationshipType: undefined,
            setSelectedRelationshipType: (type?: RelationshipType) => {
                set(() => ({ selectedRelationshipType: type }))
            },
        }),
        {
            name: 'relations-store',
            storage: createJSONStorage(() =>
                typeof window !== 'undefined' ? sessionStorage : (undefined as any),
            ),
        },
    ),
)
