import { toast } from 'react-hot-toast'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

export const roomCardQuery = gql(`
  query RoomCardQuery($where: RoomCardWhere) {
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
          phone1
          phone2
        }
      }
      contactPersonsDept {
        uid
        fullName
        phone1
        phone2
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
`)

export const useRoomCard = (roomCardUid?: string) => {
  const { data, error, isLoading } = useGraphQL(
    roomCardQuery,
    { where: { uid: roomCardUid } },
    {
      onError: () => {
        toast.error('Something went wrong during loading room card')
      }
    }
  )
  return { roomCard: data?.roomCards[0], error, loading: isLoading }
}
