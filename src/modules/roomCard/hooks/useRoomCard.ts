import { gql, useQuery } from '@apollo/client'

import type { Query } from '@/types/gql/graphql'

const GET_ROOMCARD = gql`
  query RoomCards($where: RoomCardWhere) {
    roomCards(where: $where) {
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
`

export const useRoomCard = (roomCardUid?: string) => {
  const { data, error } = useQuery<Query>(GET_ROOMCARD, {
    variables: { where: { uid: roomCardUid } }
  })
  return { roomCard: data?.roomCards[0], error }
}
