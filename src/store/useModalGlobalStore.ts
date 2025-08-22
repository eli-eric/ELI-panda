import { create } from 'zustand'

import type { ModalSize } from '@/components/ui/dialog'

export type ModalSlotType = 'sheet' | 'dialog1' | 'dialog2'

export interface ModalSlot {
  isOpen: boolean
  component: React.ComponentType<any> | null
  props?: Record<string, any> & {
    title?: string
    description?: string
    size?: ModalSize
  }
  onSubmit?: (...args: any[]) => void
  onClose?: () => void
  parentTriggerFn?: (...args: any[]) => void
  priority: number // 0 = Sheet, 1 = Dialog1, 2 = Dialog2
}

export interface ModalGlobalState {
  sheet: ModalSlot
  dialog1: ModalSlot
  dialog2: ModalSlot
  openModal: (
    slot: ModalSlotType,
    config: Omit<ModalSlot, 'priority' | 'isOpen'>
  ) => void
  closeModal: (slot: ModalSlotType) => void
  bringToFront: (slot: ModalSlotType) => void
  resetAll: () => void
}

const initialSlot = (priority: number): ModalSlot => ({
  isOpen: false,
  component: null,
  props: {},
  onSubmit: undefined,
  onClose: undefined,
  parentTriggerFn: undefined,
  priority
})

export const useModalGlobalStore = create<ModalGlobalState>((set, get) => ({
  sheet: initialSlot(0),
  dialog1: initialSlot(1),
  dialog2: initialSlot(2),
  openModal: (slot, config) => {
    set(state => ({
      ...state,
      [slot]: {
        ...state[slot],
        ...config,
        isOpen: true
      }
    }))
  },

  closeModal: slot => {
    set(state => ({
      ...state,
      [slot]: {
        ...state[slot],
        isOpen: false
      }
    }))
  },

  bringToFront: slot => {
    // For now, just a placeholder. Overlay order logic can be implemented here if needed.
    // Could swap priorities or manage a stack if more complex overlaying is needed.
  },

  resetAll: () => {
    set({
      sheet: initialSlot(0),
      dialog1: initialSlot(1),
      dialog2: initialSlot(2)
    })
  }
}))
