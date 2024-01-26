import { createWithEqualityFn as create } from 'zustand/traditional'

type FormControlState = {
  fieldIdToSync: string[]
  customFieldIdToSync: string[]
  deleteCustom: boolean
  setFieldIdToSync: (fieldId: string) => void
  setDeletCustom: () => void
  setCustomFieldIdToSync: (fieldId: string) => void
  clearFieldToSync: () => void
  clearCustomFieldToSync: () => void
}

export const useFormControlStore = create<FormControlState>(set => ({
  fieldIdToSync: [],
  customFieldIdToSync: [],
  deleteCustom: false,
  setDeletCustom: () => set(state => ({ deleteCustom: !state.deleteCustom })),
  setFieldIdToSync: fieldId =>
    set(state => {
      if (!state.fieldIdToSync.includes(fieldId)) {
        return { fieldIdToSync: [...state.fieldIdToSync, fieldId] }
      }
      return state
    }),
  setCustomFieldIdToSync: fieldId =>
    set(state => {
      if (!state.customFieldIdToSync.includes(fieldId)) {
        return { customFieldIdToSync: [...state.customFieldIdToSync, fieldId] }
      }
      return state
    }),
  clearFieldToSync: () => set({ fieldIdToSync: [] }),
  clearCustomFieldToSync: () => set({ customFieldIdToSync: [], deleteCustom: false })
}))
