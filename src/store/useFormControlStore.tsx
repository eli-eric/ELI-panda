import { createWithEqualityFn as create } from 'zustand/traditional'

type FormControlState = {
  instances?: Record<string, string[]>
  setInstance: (instance: string, fieldId: string) => void
  clear: (instance: string) => void
}

export const useFormControlStore = create<FormControlState>(set => ({
  instances: {},
  setInstance: (instance, fieldId) =>
    set(state => {
      const newInstances = { ...state.instances }
      if (!newInstances[instance]) {
        newInstances[instance] = []
      }
      newInstances[instance].push(fieldId)
      return {
        ...state,
        instances: newInstances
      }
    }),
  clear: instance =>
    set(state => ({
      ...state,
      [instance]: []
    }))
}))
