import { create } from 'zustand'

import type { SystemDetail } from '@/types/responses/systems'

import { MOVE_TYPE } from '../types/constants'

type CodebookRef = {
    uid: string
    name: string
}

// System the wizard was opened from (move source / assign destination).
// Deliberately a plain data snapshot, not a uid to refetch — the opener
// (hierarchy detail, leaves table, ...) already has everything the wizard
// needs, so the wizard must not depend on any route param or async fetch.
// Structurally compatible with SystemLeaf (systemHierarchy).
export type WizardContextSystem = {
    uid: string
    name: string
    location?: CodebookRef | null
    physicalItem?: {
        uid?: string | null
        name?: string | null
        eun?: string | null
        serialNumber?: string | null
        catalogueNumber?: string | null
        itemUsage?: CodebookRef | null
        conditionStatus?: CodebookRef | null
        catalogueItem?: {
            uid?: string | null
            name?: string | null
            catalogueNumber?: string | null
        } | null
    } | null
}

type ModalWizard = {
    open: boolean
    isMovingToNewSystem: boolean | null
    selectedSystem: SystemDetail | null
    oldItemParentSystem: SystemDetail | null
    // Set by openItemMoveModal/openItemAssignModal; when null the wizard falls
    // back to fetching by router.query.uid (legacy /system/[uid] view).
    contextSystem: WizardContextSystem | null
    moveType: MOVE_TYPE
    setOpen: (open: boolean) => void
    setIsMovingToNewSystem: (isMovingToNewSystem: boolean | null) => void
    setSelectedSystem: (selectedSystem: SystemDetail | null) => void
    setOldItemParentSystem: (oldItemParentSystem: SystemDetail | null) => void
    setContextSystem: (contextSystem: WizardContextSystem | null) => void
    setMoveType: (moveType: MOVE_TYPE) => void
}

export const useModalWizardStore = create<ModalWizard>(set => ({
    open: false,
    isMovingToNewSystem: null,
    selectedSystem: null,
    oldItemParentSystem: null,
    contextSystem: null,
    moveType: MOVE_TYPE.DEFAULT,
    setMoveType: moveType => set({ moveType }),
    setOpen: open => set({ open }),
    setIsMovingToNewSystem: isMovingToNewSystem => set({ isMovingToNewSystem }),
    setSelectedSystem: selectedSystem => set({ selectedSystem }),
    setOldItemParentSystem: oldItemParentSystem => set({ oldItemParentSystem }),
    setContextSystem: contextSystem => set({ contextSystem }),
}))
