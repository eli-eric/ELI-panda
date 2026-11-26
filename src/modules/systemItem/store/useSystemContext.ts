import { create } from 'zustand'

interface SystemContext {
    blockedEdit: boolean
    setBlockedEdit: (blockedEdit: boolean) => void
}

const defaultState = {
    blockedEdit: false,
}

/** @deprecated systemItem is deprecated (see modules/systemItem/DEPRECATED.md) and this has no live consumer — use modules/shared/system/system-detail. */
export const useSystemContext = create<SystemContext>(set => ({
    ...defaultState,
    setBlockedEdit: blockedEdit => set(() => ({ blockedEdit })),
}))
