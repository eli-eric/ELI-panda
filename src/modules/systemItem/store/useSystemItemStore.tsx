import { createWithEqualityFn as create } from 'zustand/traditional'

import type { SystemDetail } from '@/types/responses/systems'

type SystemStore = {
    selectedPhysicalSystem?: SystemDetail
    setSelectedPhysicalSystem: (system?: SystemDetail) => void
    clear: () => void
}

export const useSystemItemStore = create<SystemStore>(set => ({
    selectedPhysicalSystem: undefined,

    setSelectedPhysicalSystem: (system?: SystemDetail) =>
        set(() => ({ selectedPhysicalSystem: system })),

    clear: () => {
        set(() => ({
            selectedPhysicalSystem: undefined,
        }))
    },
}))
