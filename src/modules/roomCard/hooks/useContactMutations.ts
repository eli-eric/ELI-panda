import { useQueryClient } from '@tanstack/react-query'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'
import { whereN } from '@/utils/graphql/mutations'

// Mutation for connecting/disconnecting dept contacts
const updateDeptContactMutation = gql(`
  mutation UpdateDeptContact(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        uid
        contactPersonsDept {
          uid
          fullName
        }
      }
    }
  }
`)

// Mutation for connecting/disconnecting teams
const updateTeamMutation = gql(`
  mutation UpdateTeam(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        uid
        teams {
          uid
          name
        }
      }
    }
  }
`)

// Mutation for creating/deleting hall contacts
const updateHallContactMutation = gql(`
  mutation UpdateHallContact(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        uid
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
  }
`)

// Mutation for connecting/disconnecting locations
const updateLocationMutation = gql(`
  mutation UpdateLocation(
    $where: RoomCardWhere
    $update: RoomCardUpdateInput
  ) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        uid
        locations {
          uid
          code
          name
        }
      }
    }
  }
`)

/**
 * Hook for connecting a department contact to a room card
 */
export const useConnectDeptContact = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(
    updateDeptContactMutation
  )

  const connectDeptContact = async (employeeUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        contactPersonsDept: [
          {
            connect: [whereN(employeeUid)]
          }
        ]
      }
    })

    // Invalidate the dept contacts query to refetch fresh data
    queryClient.invalidateQueries({
      queryKey: ['RoomCardContactsDeptQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { connectDeptContact, isPending }
}

/**
 * Hook for disconnecting a department contact from a room card
 */
export const useDisconnectDeptContact = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(
    updateDeptContactMutation
  )

  const disconnectDeptContact = async (employeeUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        contactPersonsDept: [
          {
            disconnect: [whereN(employeeUid)]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardContactsDeptQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { disconnectDeptContact, isPending }
}

/**
 * Hook for connecting a team to a room card
 */
export const useConnectTeam = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(updateTeamMutation)

  const connectTeam = async (teamUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        teams: [
          {
            connect: [whereN(teamUid)]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardTeamsQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { connectTeam, isPending }
}

/**
 * Hook for disconnecting a team from a room card
 */
export const useDisconnectTeam = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(updateTeamMutation)

  const disconnectTeam = async (teamUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        teams: [
          {
            disconnect: [whereN(teamUid)]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardTeamsQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { disconnectTeam, isPending }
}

/**
 * Hook for creating a hall contact (employee + role) for a room card
 */
export const useCreateHallContact = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(
    updateHallContactMutation
  )

  const createHallContact = async (employeeUid: string, roleUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        contactPersonsHall: [
          {
            create: [
              {
                node: {
                  employee: {
                    connect: whereN(employeeUid)
                  },
                  role: {
                    connect: whereN(roleUid)
                  }
                }
              }
            ]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardContactsHallQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { createHallContact, isPending }
}

/**
 * Hook for deleting a hall contact from a room card
 */
export const useDeleteHallContact = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(
    updateHallContactMutation
  )

  const deleteHallContact = async (hallContactUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        contactPersonsHall: [
          {
            delete: [whereN(hallContactUid)]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardContactsHallQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { deleteHallContact, isPending }
}

/**
 * Hook for connecting a location to a room card
 */
export const useConnectLocation = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(updateLocationMutation)

  const connectLocation = async (locationUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        locations: [
          {
            connect: [whereN(locationUid)]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardLocationsQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { connectLocation, isPending }
}

/**
 * Hook for disconnecting a location from a room card
 */
export const useDisconnectLocation = (roomCardUid: string) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useGraphQLMutation(updateLocationMutation)

  const disconnectLocation = async (locationUid: string) => {
    await mutateAsync({
      where: { uid: roomCardUid },
      update: {
        locations: [
          {
            disconnect: [whereN(locationUid)]
          }
        ]
      }
    })

    queryClient.invalidateQueries({
      queryKey: ['RoomCardLocationsQuery', { where: { uid: roomCardUid } }]
    })
  }

  return { disconnectLocation, isPending }
}
