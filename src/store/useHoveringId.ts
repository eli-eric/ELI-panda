import { createWithEqualityFn as create } from 'zustand/traditional'

type HoveringStore = {
    hoveringId: number | string | undefined
    setHoveringId: (hoveringId: number | string | undefined) => void
}

export const useHoveringId = create<HoveringStore>(set => ({
    hoveringId: undefined,
    setHoveringId: hoveringId => set({ hoveringId: hoveringId }),
}))
