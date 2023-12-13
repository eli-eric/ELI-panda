import { createWithEqualityFn as create } from 'zustand/traditional'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { ContactPersonRole, Employee, Team } from '@/types/gql/graphql'

export type HallContactPerson = {
  employee: Employee
  role: ContactPersonRole
  uid?: string
}

type RoomCardStore = {
  newHallContacts: HallContactPerson[]
  deleteHallContacts: HallContactPerson[]
  newTeams: Team[]
  disconnectTeams: Team[]
  newDeptContacts: Employee[]
  disconnectDeptContacts: Employee[]
  newLocations: Codebooktree[]
  disconnectLocations: Codebooktree[]
  setNewHallContact: (newHallContact: HallContactPerson) => void
  setDeleteHallContact: (disconnectHallContact: HallContactPerson) => void
  setNewTeam: (newTeam: Team) => void
  setDisconnectTeam: (disconnectTeam: Team) => void
  setNewDeptContact: (newDeptContact: Employee) => void
  setDisconnectDeptContact: (disconnectDeptContact: Employee) => void
  setNewLocation: (newLocation: Codebooktree) => void
  setDisconnectLocation: (disconnectLocation: Codebooktree) => void
  clear: () => void
}

export const useRoomCardStore = create<RoomCardStore>(set => ({
  newHallContacts: [],
  deleteHallContacts: [],
  newTeams: [],
  disconnectTeams: [],
  newDeptContacts: [],
  disconnectDeptContacts: [],
  newLocations: [],
  disconnectLocations: [],
  setNewHallContact: (newHallContact: HallContactPerson) =>
    set(state => ({ newHallContacts: [...state.newHallContacts, newHallContact] })),
  setDeleteHallContact: (disconnectHallContact: HallContactPerson) =>
    set(state => ({ deleteHallContacts: [...state.deleteHallContacts, disconnectHallContact] })),
  setNewTeam: (newTeam: Team) => set(state => ({ newTeams: [...state.newTeams, newTeam] })),
  setDisconnectTeam: (disconnectTeam: Team) =>
    set(state => ({ disconnectTeams: [...state.disconnectTeams, disconnectTeam] })),
  setNewDeptContact: (newDeptContact: Employee) =>
    set(state => ({ newDeptContacts: [...state.newDeptContacts, newDeptContact] })),
  setDisconnectDeptContact: (disconnectDeptContact: Employee) =>
    set(state => ({ disconnectDeptContacts: [...state.disconnectDeptContacts, disconnectDeptContact] })),
  setNewLocation: (newLocation: Codebooktree) => set(state => ({ newLocations: [...state.newLocations, newLocation] })),
  setDisconnectLocation: (disconnectLocation: Codebooktree) =>
    set(state => ({ disconnectLocations: [...state.disconnectLocations, disconnectLocation] })),
  clear: () =>
    set(() => ({
      newHallContacts: [],
      deleteHallContacts: [],
      newTeams: [],
      disconnectTeams: [],
      newDeptContacts: [],
      disconnectDeptContacts: [],
      newLocations: [],
      disconnectLocations: []
    }))
}))
