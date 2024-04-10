import { createWithEqualityFn as create } from 'zustand/traditional'

import type { Employee } from '@/types/gql/graphql'
import type { SystemDetail } from '@/modules/systems/types/responses'

type SystemStore = {
  newOperators: Employee[]
  selectedPhysicalSystem?: SystemDetail
  disconnectOperators: Employee[]
  setNewOperator: (employee: Employee) => void
  setDisconnectOperator: (employee: Employee) => void
  newMaintainedBy: Employee[]
  disconnectMaintainedBy: Employee[]
  setNewMaintainedBy: (employee: Employee) => void
  setDisconnectMaintainedBy: (employee: Employee) => void
  setSelectedPhysicalSystem: (system?: SystemDetail) => void
  clear: () => void
}

export const useSystemItemStore = create<SystemStore>(set => ({
  newOperators: [],
  disconnectOperators: [],
  selectedPhysicalSystem: undefined,
  newMaintainedBy: [],
  disconnectMaintainedBy: [],
  setNewOperator: (employee: Employee) => set(state => ({ newOperators: [...state.newOperators, employee] })),
  setSelectedPhysicalSystem: (system?: SystemDetail) => set(() => ({ selectedPhysicalSystem: system })),
  setDisconnectOperator: (employee: Employee) =>
    set(state => ({ disconnectOperators: [...state.disconnectOperators, employee] })),
  setNewMaintainedBy: (employee: Employee) => set(state => ({ newMaintainedBy: [...state.newMaintainedBy, employee] })),
  setDisconnectMaintainedBy: (employee: Employee) =>
    set(state => ({ disconnectMaintainedBy: [...state.disconnectMaintainedBy, employee] })),

  clear: () =>
    set(() => ({ disconnectOperators: [], disconnectMaintainedBy: [], newMaintainedBy: [], newOperators: [] }))
}))
