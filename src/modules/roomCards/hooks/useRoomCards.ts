import { gql, useQuery } from '@apollo/client'
import { useQueryState } from 'next-usequerystate'

import type { Query } from '@/types/gql/graphql'

const ROOM_CARDS = gql`
  query RoomCards($where: RoomCardWhere) {
    roomCards(where: $where) {
      uid
      purityClass
      prescribedClothing
      entryToHvacTent
      cleaningShedule
      additionalRequirements
      coolingWater
      indoorEnvironmentQueality
      copressedAirDistribution
      nitrogenCentralDistribution
      maxPressureInColdDistribution
      pressureInCoolingSystem
      roomTemperature
      humidity
      status
      location {
        code
        name
      }
    }
  }
`

export const useRoomCards = () => {
  const [search] = useQueryState('search')
  const { data, loading, error, refetch } = useQuery<Query>(ROOM_CARDS, {
    variables: {
      where: {
        AND: [
          {
            location: {
              name_CONTAINS: search || ''
            }
          }
        ]
      }
    }
  })

  return { roomCards: data?.roomCards, loading, error, refetch }
}
