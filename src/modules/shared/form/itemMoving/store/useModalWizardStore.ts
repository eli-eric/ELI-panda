import { create } from 'zustand'

import type { SystemDetail } from '@/types/responses/systems'

import { MOVE_TYPE } from '../types/constants'

type ModalWizard = {
    open: boolean
    isMovingToNewSystem: boolean | null
    selectedSystem: SystemDetail | null
    oldItemParentSystem: SystemDetail | null
    moveType: MOVE_TYPE
    setOpen: (open: boolean) => void
    setIsMovingToNewSystem: (isMovingToNewSystem: boolean | null) => void
    setSelectedSystem: (selectedSystem: SystemDetail | null) => void
    setOldItemParentSystem: (oldItemParentSystem: SystemDetail | null) => void
    setMoveType: (moveType: MOVE_TYPE) => void
}

export const useModalWizardStore = create<ModalWizard>(set => ({
    open: false,
    isMovingToNewSystem: null,
    selectedSystem: null,
    oldItemParentSystem: null,
    moveType: MOVE_TYPE.DEFAULT,
    setMoveType: moveType => set({ moveType }),
    setOpen: open => set({ open }),
    setIsMovingToNewSystem: isMovingToNewSystem => set({ isMovingToNewSystem }),
    setSelectedSystem: selectedSystem => set({ selectedSystem }),
    setOldItemParentSystem: oldItemParentSystem => set({ oldItemParentSystem }),
}))
