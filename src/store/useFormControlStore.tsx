import { createWithEqualityFn as create } from 'zustand/traditional'

type FormControlState = {
  fieldIdToSync: string[]
  setFieldIdToSync: (fieldId: string) => void
  clear: () => void
}

export const useFormControlStore = create<FormControlState>(set => ({
  fieldIdToSync: [],
  setFieldIdToSync: fieldId =>
    set(state => {
      if (!state.fieldIdToSync.includes(fieldId)) {
        return { fieldIdToSync: [...state.fieldIdToSync, fieldId] }
      }
      return state
    }),
  clear: () => set({ fieldIdToSync: [] })
}))
