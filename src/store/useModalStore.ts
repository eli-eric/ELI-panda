import { create } from 'zustand'

export type ModalParams = {
    isOpen: boolean
    isConfirmed: boolean
    children?: React.ReactNode
    submit?: boolean
    error: string
}

const initialParams: ModalParams = {
    isOpen: false,
    isConfirmed: false,
    children: null,
    submit: undefined,
    error: '',
}

type ModalStore = {
    params: ModalParams
    patchParams: (params: {}) => void
    resetParams: () => void
}

export const useModalStore = create<ModalStore>(set => ({
    params: initialParams,
    patchParams: (newParams: object) =>
        set(state => ({
            params: { ...state.params, ...newParams },
        })),
    resetParams: () => set({ params: initialParams }),
}))
