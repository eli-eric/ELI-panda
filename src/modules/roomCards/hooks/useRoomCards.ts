import { useQueryState } from 'next-usequerystate'
import { toast } from 'react-hot-toast'

import { gql } from '@/types/gql'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'

export const roomCardsQuery = gql(`
  query RoomCardsQuery($where: RoomCardWhere) {
    roomCards(where: $where) {
      uid
      name
      purityClass
      status
      prescribedClothing
      entryToHvacTent
      cleaningScheduleDays
      additionalRequirements
      coolingWater
      indoorEnvironmentQuality
      compressedAirDistribution
      nitrogenCentralDistribution
      maxPressureInColdDistribution
      locations {
        code
        name
      }
    }
  }
`)

export const useRoomCards = () => {
  const [search] = useQueryState('search')
  const { data, isLoading, error, refetch } = useGraphQL(
    roomCardsQuery,
    {
      where: {
        name_CONTAINS: search || ''
      }
    },
    {
      onError: () => {
        toast.error('Error loading room cards')
      }
    }
  )

  return { roomCards: data?.roomCards, loading: isLoading, error, refetch }
}
