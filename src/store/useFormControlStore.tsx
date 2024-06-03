import { create } from 'zustand'

type FormControlState = {
  fieldIdToSync: Set<string>
  customFieldIdToSync: Set<string>
  deleteCustom: boolean
  toggleDeleteCustom: () => void
  addFieldIdToSync: (fieldId: string) => void
  addCustomFieldIdToSync: (fieldId: string) => void
  addCustomFieldIdsToSync: (fieldIds: string[]) => void
  clearFieldToSync: () => void
  clearCustomFieldToSync: () => void
}

export const useFormControlStore = create<FormControlState>(set => ({
  fieldIdToSync: new Set(),
  customFieldIdToSync: new Set(),
  deleteCustom: false,
  toggleDeleteCustom: () =>
    set(state => ({ deleteCustom: !state.deleteCustom })),
  addFieldIdToSync: fieldId =>
    set(state => ({
      fieldIdToSync: new Set(state.fieldIdToSync).add(fieldId)
    })),
  addCustomFieldIdToSync: fieldId =>
    set(state => {
      const newSet = new Set(state.customFieldIdToSync).add(fieldId)
      return {
        customFieldIdToSync: newSet
      }
    }),
  addCustomFieldIdsToSync: fieldIds =>
    set(() => {
      const newSet = new Set<string>(fieldIds)
      return {
        customFieldIdToSync: newSet
      }
    }),
  clearFieldToSync: () => set({ fieldIdToSync: new Set() }),
  clearCustomFieldToSync: () =>
    set({ customFieldIdToSync: new Set(), deleteCustom: false })
}))
