import { createWithEqualityFn as create } from 'zustand/traditional'

import type { Employee } from '@/types/gql/graphql'

type SystemStore = {
  newOperators: Employee[]
  disconnectOperators: Employee[]
  setNewOperator: (employee: Employee) => void
  setDisconnectOperator: (employee: Employee) => void
  newMaintainedBy: Employee[]
  disconnectMaintainedBy: Employee[]
  setNewMaintainedBy: (employee: Employee) => void
  setDisconnectMaintainedBy: (employee: Employee) => void
  clear: () => void
}

export const useSystemItemStore = create<SystemStore>(set => ({
  newOperators: [],
  disconnectOperators: [],
  newMaintainedBy: [],
  disconnectMaintainedBy: [],
  setNewOperator: (employee: Employee) => set(state => ({ newOperators: [...state.newOperators, employee] })),
  setDisconnectOperator: (employee: Employee) =>
    set(state => ({ disconnectOperators: [...state.disconnectOperators, employee] })),
  setNewMaintainedBy: (employee: Employee) => set(state => ({ newMaintainedBy: [...state.newMaintainedBy, employee] })),
  setDisconnectMaintainedBy: (employee: Employee) =>
    set(state => ({ disconnectMaintainedBy: [...state.disconnectMaintainedBy, employee] })),

  clear: () =>
    set(() => ({ disconnectOperators: [], disconnectMaintainedBy: [], newMaintainedBy: [], newOperators: [] }))
}))
