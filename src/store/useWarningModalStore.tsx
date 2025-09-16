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
  exec?: { callback?: Function; callbackArgs?: any[] }
  setExec: (exec: { callback?: Function; callbackArgs?: any[] }) => void
  clearExec: () => void
  patchParams: (params: {}) => void
  resetParams: () => void
}

export const useWarningModalStore = create<WarningModalStore>(set => ({
  params: initialParams,
  exec: undefined,
  setExec: exec =>
    set(state => ({
      ...state,
      exec
    })),
  clearExec: () => set(state => ({ ...state, exec: undefined })),
  patchParams: (newParams: object) => {
    console.log('useWarningModalStore.patchParams', newParams)
    set(state => ({
      params: { ...state.params, ...newParams }
    }))
  },
  resetParams: () => set({ params: initialParams })
  // debug
  // Note: resetParams is a simple setter; we log in components/hooks where needed
}))
