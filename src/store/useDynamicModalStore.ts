import { create } from 'zustand'

import type { ModalSize } from '@/components/ui/dialog'

/**
 * New dynamic modal system with unlimited modals and automatic z-index management
 *
 * Key features:
 * - Map-based architecture for unlimited modals
 * - Automatic ID generation or custom IDs
 * - Dynamic z-index calculation based on open order (FIFO)
 * - Type-aware rendering (sheet vs dialog)
 * - Bring to front functionality
 */

export interface ModalInstance {
    id: string
    type: 'sheet' | 'dialog'
    component: React.ComponentType<any>
    props?: Record<string, any> & {
        title?: string
        description?: string
        size?: ModalSize
        side?: 'top' | 'right' | 'bottom' | 'left'
    }
    onSubmit?: (...args: any[]) => void
    onClose?: () => void
    parentTriggerFn?: (...args: any[]) => void
    onCloseAttempt?: () => boolean
    zIndex: number
    openedAt: number
}

export interface ModalConfig {
    id?: string // Optional custom ID, auto-generated if not provided
    component: React.ComponentType<any>
    props?: Record<string, any> & {
        title?: string
        description?: string
        size?: ModalSize
        side?: 'top' | 'right' | 'bottom' | 'left'
    }
    onSubmit?: (...args: any[]) => void
    onClose?: () => void
    parentTriggerFn?: (...args: any[]) => void
    onCloseAttempt?: () => boolean
}

export interface ModalState {
    modals: Record<string, ModalInstance>
    modalOrder: string[]
    baseZIndex: number
    openModal: (type: 'sheet' | 'dialog', config: ModalConfig) => string
    closeModal: (id: string) => void
    closeAllModals: () => void
    bringToFront: (id: string) => void
    getModalById: (id: string) => ModalInstance | undefined
}

/**
 * Generate unique modal ID
 * Format: {type}-{timestamp}-{random}
 * Example: "sheet-1699123456789-k3j9x2a"
 */
const generateModalId = (type: 'sheet' | 'dialog'): string => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 9)
    return `${type}-${timestamp}-${random}`
}

/**
 * Recalculate z-indices for all modals based on their order
 * Returns updated modals object with new z-indices
 */
const recalculateZIndices = (
    modals: Record<string, ModalInstance>,
    modalOrder: string[],
    baseZIndex: number,
): Record<string, ModalInstance> => {
    const updated = { ...modals }
    modalOrder.forEach((modalId, index) => {
        if (updated[modalId]) {
            updated[modalId] = {
                ...updated[modalId],
                zIndex: baseZIndex + index * 2,
            }
        }
    })
    return updated
}

export const useDynamicModalStore = create<ModalState>((set, get) => ({
    modals: {},
    modalOrder: [],
    baseZIndex: 50,

    openModal: (type, config) => {
        const id = config.id || generateModalId(type)
        const state = get()

        // If modal with this ID already exists, bring it to front instead
        if (state.modals[id]) {
            //eslint-disable-next-line
            console.warn(`Modal with id "${id}" already exists. Bringing to front instead.`)
            get().bringToFront(id)
            return id
        }

        // Calculate z-index based on current modal count
        const zIndex = state.baseZIndex + state.modalOrder.length * 2

        const newModal: ModalInstance = {
            id,
            type,
            component: config.component,
            props: config.props,
            onSubmit: config.onSubmit,
            onClose: config.onClose,
            parentTriggerFn: config.parentTriggerFn,
            onCloseAttempt: config.onCloseAttempt,
            zIndex,
            openedAt: Date.now(),
        }

        set({
            modals: {
                ...state.modals,
                [id]: newModal,
            },
            modalOrder: [...state.modalOrder, id],
        })

        return id
    },

    closeModal: id => {
        const state = get()
        const modal = state.modals[id]

        if (!modal) {
            //eslint-disable-next-line
            console.warn(`Modal with id "${id}" not found`)
            return
        }

        // Call onClose callback if exists
        if (modal.onClose) {
            modal.onClose()
        }

        // Remove from modals and order
        const remainingModals = { ...state.modals }
        delete remainingModals[id]
        const newOrder = state.modalOrder.filter(modalId => modalId !== id)

        // Recalculate z-indices for remaining modals
        const recalculatedModals = recalculateZIndices(remainingModals, newOrder, state.baseZIndex)

        set({
            modals: recalculatedModals,
            modalOrder: newOrder,
        })
    },

    closeAllModals: () => {
        const state = get()

        // Call onClose for all modals
        Object.values(state.modals).forEach(modal => {
            if (modal.onClose) {
                modal.onClose()
            }
        })

        set({ modals: {}, modalOrder: [] })
    },

    bringToFront: id => {
        const state = get()
        const modal = state.modals[id]

        if (!modal) {
            //eslint-disable-next-line
            console.warn(`Modal with id "${id}" not found`)
            return
        }

        // Remove from current position and add to end (highest z-index)
        const newOrder = state.modalOrder.filter(modalId => modalId !== id)
        newOrder.push(id)

        // Recalculate all z-indices
        const updatedModals = recalculateZIndices(state.modals, newOrder, state.baseZIndex)

        set({
            modals: updatedModals,
            modalOrder: newOrder,
        })
    },

    getModalById: id => {
        return get().modals[id]
    },
}))
