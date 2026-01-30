import { create } from 'zustand'

import type { SystemDetail } from '@/types/responses/systems'

interface SystemsMoveStore {
    movingSystems: SystemDetail[]
    destinationSystemsTableId: string
    movingSystemsTableId: string
    setMovingSystems: (systems: SystemDetail[]) => void
    addMovingSystem: (system: SystemDetail) => void
    removeMovingSystem: (uid: string) => void
    destinationSystem: SystemDetail | null
    setDestinationSystem: (system: SystemDetail) => void
    removeDestinationSystem: () => void
    resetMovingSystems: () => void
    reset: () => void
}

export const useSystemsMoveStore = create<SystemsMoveStore>(set => ({
    movingSystems: [],
    destinationSystemsTableId: 'destinationSystems',
    movingSystemsTableId: 'movingSystems',
    destinationSystem: null,
    setMovingSystems: systems => set({ movingSystems: systems }),
    addMovingSystem: system => set(state => ({ movingSystems: [...state.movingSystems, system] })),
    removeMovingSystem: uid =>
        set(state => ({
            movingSystems: state.movingSystems.filter(system => system.uid !== uid),
        })),
    setDestinationSystem: system => set({ destinationSystem: system }),
    removeDestinationSystem: () => set({ destinationSystem: null }),
    reset: () => set({ movingSystems: [], destinationSystem: null }),
    resetMovingSystems: () => set({ movingSystems: [] }),
}))
