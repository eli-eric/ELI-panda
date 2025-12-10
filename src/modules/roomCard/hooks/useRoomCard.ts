import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

export const roomCardQuery = gql(`
  query RoomCardQuery($where: RoomCardWhere) {
    roomCards(where: $where) {
      name
      status
      operationalState {
        name
        uid
        code
      }
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
    }
  }
`)

export const useRoomCard = (roomCardUid?: string) => {
  const { data, error, isLoading, refetch } = useGraphQL(roomCardQuery, {
    variables: {
      where: { uid: roomCardUid }
    }
  })

  useEffect(() => {
    if (error) {
      toast.error('Failed to fetch room card')
    }
  }, [error])

  return { roomCard: data?.roomCards[0], error, loading: isLoading, refetch }
}
