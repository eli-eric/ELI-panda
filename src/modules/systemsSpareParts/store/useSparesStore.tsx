import { createWithEqualityFn as create } from 'zustand/traditional'

type SpareStore = {
  selectedUidForSystem?: string
  setSelectedUidForSystem: (uid?: string) => void
}

export const useSparesStore = create<SpareStore>(set => ({
  selectedUidForSystem: undefined,
  setSelectedUidForSystem: (uid?: string) =>
    set(() => ({ selectedUidForSystem: uid }))
}))
