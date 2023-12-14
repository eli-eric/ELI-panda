import { gql, useQuery } from '@apollo/client'
import { toast } from 'react-hot-toast'

import type { Query } from '@/types/gql/graphql'

export const GET_ROOMCARD = gql`
  query RoomCards($where: RoomCardWhere) {
    roomCards(where: $where) {
      name
      status
      purityClass
      prescribedClothing
      entryToHvacTent
      cleaningScheduleDate
      cleaningScheduleDays
      additionalRequirements
      coolingWater
      indoorEnvironmentQuality
      compressedAirDistribution
      nitrogenCentralDistribution
      maxPressureInColdDistribution
      coolingWaterClient
      indoorEnvironmentQualityClient
      compressedAirDistributionClient
      nitrogenCentralDistributionClient
      maxPressureInColdDistributionClient
      contactPersonsHall {
        uid
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
      locations {
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
  const { data, error, loading } = useQuery<Query>(GET_ROOMCARD, {
    variables: { where: { uid: roomCardUid } },
    onError: () => {
      toast.error('Something went wrong during loading room card')
    }
  })
  return { roomCard: data?.roomCards[0], error, loading }
}
