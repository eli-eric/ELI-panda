import { create } from 'zustand'

import type { Employee } from '@/types/gql/graphql'

type SystemStore = {
  newOperators: Employee[]
  disconnectOperators: Employee[]
  setNewOperator: (employee: Employee) => void
  setDisconnectOperator: (employee: Employee) => void
  newMaintenedBy: Employee[]
  disconnectMaintenedBy: Employee[]
  setNewMaintenedBy: (employee: Employee) => void
  setDisconnectMaintenedBy: (employee: Employee) => void
  clear: () => void
}

export const useSystemItemStore = create<SystemStore>(set => ({
  newOperators: [],
  disconnectOperators: [],
  newMaintenedBy: [],
  disconnectMaintenedBy: [],
  setNewOperator: (employee: Employee) => set(state => ({ newOperators: [...state.newOperators, employee] })),
  setDisconnectOperator: (employee: Employee) =>
    set(state => ({ disconnectOperators: [...state.disconnectOperators, employee] })),
  setNewMaintenedBy: (employee: Employee) => set(state => ({ newMaintenedBy: [...state.newMaintenedBy, employee] })),
  setDisconnectMaintenedBy: (employee: Employee) =>
    set(state => ({ disconnectMaintenedBy: [...state.disconnectMaintenedBy, employee] })),

  clear: () => set(() => ({ disconnectOperators: [], disconnectMaintenedBy: [], newMaintenedBy: [], newOperators: [] }))
}))
