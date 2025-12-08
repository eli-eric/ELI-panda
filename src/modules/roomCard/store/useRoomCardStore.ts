import { createWithEqualityFn as create } from 'zustand/traditional'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'

/**
 * RoomCard store - now only handles locations.
 * Contacts (Hall, Dept, Teams) are now managed via direct GraphQL mutations.
 */
type RoomCardStore = {
  newLocations: Codebooktree[]
  disconnectLocations: Codebooktree[]
  setNewLocation: (newLocation: Codebooktree) => void
  setDisconnectLocation: (disconnectLocation: Codebooktree) => void
  removeNewLocation: (uuid: string) => void
  clear: () => void
}

export const useRoomCardStore = create<RoomCardStore>(set => ({
  newLocations: [],
  disconnectLocations: [],
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
      newLocations: [],
      disconnectLocations: []
    }))
}))
