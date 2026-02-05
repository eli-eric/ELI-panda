import { create } from 'zustand'

interface ModalFormState {
    isDirty: boolean
    setIsDirty: (dirty: boolean) => void
    reset: () => void
}

export const useModalFormStateStore = create<ModalFormState>(set => ({
    isDirty: false,
    setIsDirty: (dirty: boolean) => set({ isDirty: dirty }),
    reset: () => set({ isDirty: false }),
}))
