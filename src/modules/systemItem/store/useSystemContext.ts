import { create } from 'zustand'

interface SystemContext {
    blockedEdit: boolean
    setBlockedEdit: (blockedEdit: boolean) => void
}

const defaultState = {
    blockedEdit: false,
}

export const useSystemContext = create<SystemContext>(set => ({
    ...defaultState,
    setBlockedEdit: blockedEdit => set(() => ({ blockedEdit })),
}))
