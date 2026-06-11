import { createWithEqualityFn as create } from 'zustand/traditional'

import type { SystemDetail } from '@/types/responses/systems'

type SystemStore = {
    selectedPhysicalSystem?: SystemDetail
    setSelectedPhysicalSystem: (system?: SystemDetail) => void
    clear: () => void
}

/**
 * @deprecated The systemItem module is deprecated — system detail lives in
 * src/modules/systemHierarchy (/systems/hierarchy?leaf=<uid>). See
 * src/modules/systemItem/DEPRECATED.md.
 */
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
