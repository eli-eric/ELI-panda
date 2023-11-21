import { createWithEqualityFn as create } from 'zustand/traditional'
export type WarningModalParams = {
  isOpen: boolean
  isConfirmed: boolean
  error: string
  message: string
}

const initialParams: WarningModalParams = {
  isOpen: false,
  isConfirmed: false,
  error: '',
  message: ''
}

type WarningModalStore = {
  params: WarningModalParams
  patchParams: (params: {}) => void
  resetParams: () => void
}

export const useWarningModalStore = create<WarningModalStore>(set => ({
  params: initialParams,
  patchParams: (newParams: object) =>
    set(state => ({
      params: { ...state.params, ...newParams }
    })),
  resetParams: () => set({ params: initialParams })
}))
