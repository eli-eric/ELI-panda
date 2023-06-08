import { create } from 'zustand'

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

const useWarningModalStore = create<WarningModalStore>(set => ({
  params: initialParams,
  patchParams: (newParams: object) =>
    set(state => ({
      params: { ...state.params, ...newParams }
    })),
  resetParams: () => set({ params: initialParams })
}))

export default useWarningModalStore
