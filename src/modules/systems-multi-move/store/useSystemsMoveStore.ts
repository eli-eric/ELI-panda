import { create } from 'zustand'

import type { SystemDetail } from '@/types/responses/systems'

interface SystemsMoveStore {
  movingSystems: SystemDetail[]
  destinationSystemsTableId: string
  movingSystemsTableId: string
  addMovingSystem: (system: SystemDetail) => void
  removeMovingSystem: (uid: string) => void
  destinationSystem: SystemDetail | null
  setDestinationSystem: (system: SystemDetail) => void
  removeDestinationSystem: () => void
  reset: () => void
}

export const useSystemsMoveStore = create<SystemsMoveStore>(set => ({
  movingSystems: [],
  destinationSystemsTableId: 'destination-systems',
  movingSystemsTableId: 'moving-systems',
  destinationSystem: null,
  addMovingSystem: system =>
    set(state => ({ movingSystems: [...state.movingSystems, system] })),
  removeMovingSystem: uid =>
    set(state => ({
      movingSystems: state.movingSystems.filter(system => system.uid !== uid)
    })),
  setDestinationSystem: system => set({ destinationSystem: system }),
  removeDestinationSystem: () => set({ destinationSystem: null }),
  reset: () => set({ movingSystems: [], destinationSystem: null })
}))
