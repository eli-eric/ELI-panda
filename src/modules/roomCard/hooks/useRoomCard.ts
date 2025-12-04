import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

export const roomCardQuery = gql(`
  query RoomCardQuery($where: RoomCardWhere) {
    roomCards(where: $where) {
      name
      status
      operationalState
      operationalStateLastUpdated
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
  const { data, error, isLoading } = useGraphQL(roomCardQuery, {
    variables: {
      where: { uid: roomCardUid }
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch room card')
    }
  }, [error])

  return { roomCard: data?.roomCards[0], error, loading: isLoading }
}
