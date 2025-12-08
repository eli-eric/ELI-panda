import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

/**
 * Query for fetching department contacts for a room card
 */
const roomCardContactsDeptQuery = gql(`
  query RoomCardContactsDeptQuery($where: RoomCardWhere) {
    roomCards(where: $where) {
      contactPersonsDept {
        uid
        fullName
        phone1
        phone2
      }
    }
  }
`)

/**
 * Query for fetching hall contacts for a room card
 */
const roomCardContactsHallQuery = gql(`
  query RoomCardContactsHallQuery($where: RoomCardWhere) {
    roomCards(where: $where) {
      contactPersonsHall {
        uid
        role {
          uid
          name
        }
        employee {
          uid
          fullName
          phone1
          phone2
        }
      }
    }
  }
`)

/**
 * Query for fetching teams for a room card
 */
const roomCardTeamsQuery = gql(`
  query RoomCardTeamsQuery($where: RoomCardWhere) {
    roomCards(where: $where) {
      teams {
        uid
        name
      }
    }
  }
`)

/**
 * Hook for fetching department contacts for a room card.
 * Used by RoomCardContactsCard to display Dept contacts table.
 */
export const useRoomCardContactsDept = (roomCardUid?: string) => {
  const { data, refetch, isLoading } = useGraphQL(roomCardContactsDeptQuery, {
    variables: { where: { uid: roomCardUid } },
    enabled: !!roomCardUid
  })

  return {
    contactPersonsDept: data?.roomCards[0]?.contactPersonsDept || [],
    refetch,
    isLoading
  }
}

/**
 * Hook for fetching hall contacts for a room card.
 * Used by RoomCardContactsCard to display Hall contacts table.
 */
export const useRoomCardContactsHall = (roomCardUid?: string) => {
  const { data, refetch, isLoading } = useGraphQL(roomCardContactsHallQuery, {
    variables: { where: { uid: roomCardUid } },
    enabled: !!roomCardUid
  })

  return {
    contactPersonsHall: data?.roomCards[0]?.contactPersonsHall || [],
    refetch,
    isLoading
  }
}

/**
 * Hook for fetching teams for a room card.
 * Used by RoomCardContactsCard to display Teams table.
 */
export const useRoomCardTeams = (roomCardUid?: string) => {
  const { data, refetch, isLoading } = useGraphQL(roomCardTeamsQuery, {
    variables: { where: { uid: roomCardUid } },
    enabled: !!roomCardUid
  })

  return {
    teams: data?.roomCards[0]?.teams || [],
    refetch,
    isLoading
  }
}
