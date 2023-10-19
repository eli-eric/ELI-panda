import type { ApolloCache, DefaultContext, MutationTuple, OperationVariables } from '@apollo/client'
import { gql, useMutation } from '@apollo/client'

import type { Mutation } from '../../../types/gql/graphql'
import { useRoomCardStore } from '../store/useRoomCardStore'

const UPDATE_ROOM_CARD = gql`
  mutation Mutation($where: RoomCardWhere, $update: RoomCardUpdateInput) {
    updateRoomCards(where: $where, update: $update) {
      roomCards {
        purityClass
        prescribedClothing
        entryToHvacTent
        cleaningSchedule
        additionalRequirements
        coolingWater
        indoorEnvironmentQuality
        compressedAirDistribution
        nitrogenCentralDistribution
        maxPressureInColdDistribution
        pressureInCoolingSystem
        roomTemperature
        humidity
        status
        contactPersonsHall {
          role {
            uid
            name
          }
          employee {
            uid
            fullName
            phoneNumber
          }
        }
        contactPersonsDept {
          uid
          fullName
          phoneNumber
        }
        location {
          code
          uid
          name
        }
        teams {
          name
          uid
        }
      }
    }
  }
`

export const useRoomCardUpdate = (): MutationTuple<Mutation, OperationVariables, DefaultContext, ApolloCache<any>> => {
  const { clear } = useRoomCardStore()
  const mutate = useMutation<Mutation>(UPDATE_ROOM_CARD, {
    onCompleted: clear,
    refetchQueries: ['RoomCards', 'RoomCard']
  })

  return mutate
}
