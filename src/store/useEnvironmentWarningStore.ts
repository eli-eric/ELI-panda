import { create } from 'zustand'

export type EnvironmentWarningStore = {
    hasConfirmedEnvironment: boolean
    confirmEnvironment: () => void
}

export const useEnvironmentWarningStore = create<EnvironmentWarningStore>(set => ({
    hasConfirmedEnvironment: false,
    confirmEnvironment: () => set({ hasConfirmedEnvironment: true }),
}))
