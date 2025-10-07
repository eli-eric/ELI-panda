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
  removeNewHallContact: (uuid: string) => void
  setNewTeam: (newTeam: Team) => void
  setDisconnectTeam: (disconnectTeam: Team) => void
  removeNewTeam: (uuid: string) => void
  setNewDeptContact: (newDeptContact: Employee) => void
  setDisconnectDeptContact: (disconnectDeptContact: Employee) => void
  removeNewDeptContact: (uuid: string) => void
  setNewLocation: (newLocation: Codebooktree) => void
  setDisconnectLocation: (disconnectLocation: Codebooktree) => void
  removeNewLocation: (uuid: string) => void
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
    set(state => ({
      newHallContacts: [...state.newHallContacts, newHallContact]
    })),
  setDeleteHallContact: (disconnectHallContact: HallContactPerson) =>
    set(state => ({
      deleteHallContacts: [...state.deleteHallContacts, disconnectHallContact]
    })),
  removeNewHallContact: (uuid: string) =>
    set(state => ({
      newHallContacts: state.newHallContacts.filter(
        contact => (contact as any).uuid !== uuid
      )
    })),
  setNewTeam: (newTeam: Team) =>
    set(state => ({ newTeams: [...state.newTeams, newTeam] })),
  setDisconnectTeam: (disconnectTeam: Team) =>
    set(state => ({
      disconnectTeams: [...state.disconnectTeams, disconnectTeam]
    })),
  removeNewTeam: (uuid: string) =>
    set(state => ({
      newTeams: state.newTeams.filter((team: any) => team.uuid !== uuid)
    })),
  setNewDeptContact: (newDeptContact: Employee) =>
    set(state => ({
      newDeptContacts: [...state.newDeptContacts, newDeptContact]
    })),
  setDisconnectDeptContact: (disconnectDeptContact: Employee) =>
    set(state => ({
      disconnectDeptContacts: [
        ...state.disconnectDeptContacts,
        disconnectDeptContact
      ]
    })),
  removeNewDeptContact: (uuid: string) =>
    set(state => ({
      newDeptContacts: state.newDeptContacts.filter(
        (contact: any) => contact.uuid !== uuid
      )
    })),
  setNewLocation: (newLocation: Codebooktree) =>
    set(state => ({ newLocations: [...state.newLocations, newLocation] })),
  setDisconnectLocation: (disconnectLocation: Codebooktree) =>
    set(state => ({
      disconnectLocations: [...state.disconnectLocations, disconnectLocation]
    })),
  removeNewLocation: (uuid: string) =>
    set(state => ({
      newLocations: state.newLocations.filter(
        (location: any) => location.uuid !== uuid
      )
    })),
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
