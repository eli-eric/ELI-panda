import { create } from 'zustand'

import type { SystemDetail } from '@/types/responses/systems'

type ModalWizard = {
  open: boolean
  isMovingToNewSystem: boolean | null
  selectedSystem: SystemDetail | null
  setOpen: (open: boolean) => void
  setIsMovingToNewSystem: (isMovingToNewSystem: boolean | null) => void
  setSelectedSystem: (selectedSystem: SystemDetail | null) => void
}

export const useModalWizardStore = create<ModalWizard>(set => ({
  open: false,
  isMovingToNewSystem: null,
  selectedSystem: null,
  setOpen: open => set({ open }),
  setIsMovingToNewSystem: isMovingToNewSystem => set({ isMovingToNewSystem }),
  setSelectedSystem: selectedSystem => set({ selectedSystem })
}))
