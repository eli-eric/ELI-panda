import { create } from 'zustand'

import type { SystemDetail } from '@/modules/systems/types/responses'

interface SystemsMovingType extends SystemDetail {
  tableId: string
}

type SystemMovingStoreType = {
  childSystem?: SystemsMovingType
  parentSystem?: SystemsMovingType
  tableIdLeft: string
  tableIdRight: string
  setChildSystem: (childSystem: SystemsMovingType) => void
  setParentSystem: (parentSystem: SystemsMovingType) => void
  clear: () => void
}

export const useSystemMovingStore = create<SystemMovingStoreType>(set => ({
  childSystem: undefined,
  parentSystem: undefined,
  tableIdLeft: 'systems-left',
  tableIdRight: 'systems-right',
  setChildSystem: (childSystem: SystemsMovingType) => set(() => ({ childSystem })),
  setParentSystem: (parentSystem: SystemsMovingType) => set(() => ({ parentSystem })),
  clear: () =>
    set(() => ({
      childSystem: undefined,
      parentSystem: undefined
    }))
}))
