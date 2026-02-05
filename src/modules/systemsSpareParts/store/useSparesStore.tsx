import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn as create } from 'zustand/traditional'

type SpareStore = {
    selectedUidForSystem?: string
    setSelectedUidForSystem: (uid?: string) => void
}

export const useSparesStore = create<SpareStore>()(
    persist(
        set => ({
            selectedUidForSystem: undefined,
            setSelectedUidForSystem: (uid?: string) => {
                set(() => ({ selectedUidForSystem: uid }))
            },
        }),
        {
            name: 'spares-store',
            storage: createJSONStorage(() =>
                typeof window !== 'undefined' ? sessionStorage : (undefined as any),
            ),
        },
    ),
)
