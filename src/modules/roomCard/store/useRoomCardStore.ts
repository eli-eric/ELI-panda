import { create } from 'zustand'

import type { Employee, HallContactPerson, Team } from '@/types/gql/graphql'

type RoomCardStore = {
  newHallContacts: HallContactPerson[]
  deleteHallContacts: HallContactPerson[]
  newTeams: Team[]
  disconnectTeams: Team[]
  newDeptContacts: Employee[]
  disconnectDeptContacts: Employee[]
  setNewHallContact: (newHallContact: HallContactPerson) => void
  setDeleteHallContact: (disconnectHallContact: HallContactPerson) => void
  setNewTeam: (newTeam: Team) => void
  setDisconnectTeam: (disconnectTeam: Team) => void
  setNewDeptContact: (newDeptContact: Employee) => void
  setDisconnectDeptContact: (disconnectDeptContact: Employee) => void
  clear: () => void
}

export const useRoomCardStore = create<RoomCardStore>(set => ({
  newHallContacts: [],
  deleteHallContacts: [],
  newTeams: [],
  disconnectTeams: [],
  newDeptContacts: [],
  disconnectDeptContacts: [],
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
  clear: () =>
    set(() => ({
      newHallContacts: [],
      deleteHallContacts: [],
      newTeams: [],
      disconnectTeams: [],
      newDeptContacts: [],
      disconnectDeptContacts: []
    }))
}))
