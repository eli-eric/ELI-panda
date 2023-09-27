import { gql, useQuery } from '@apollo/client'
import { useQueryState } from 'next-usequerystate'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import type { Query } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar } from '../shared/table/SearchBar'
import { useRoomCardsColumns } from './components/RoomCards.columns'

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

export const RoomCardsContainer = () => {
  const tableId = 'roomCards'
  const [search] = useQueryState('search')
  const { data, loading, error } = useQuery<Query>(ROOM_CARDS, {
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
  const columns = useRoomCardsColumns()

  return (
    <TableLayoutContainer>
      <SearchBar
        {...{
          tableId
        }}
      />
      <PandaTable
        {...{
          tableId,
          getRowProps: ({ original: { status } }) => ({
            className: classNames(
              status === 'DIRTY_MODE' && 'bg-red-100',
              status === 'CLEAN_MODE' && 'bg-green-100',
              status === 'IN_PREPARATION_MODE' && 'bg-yellow-100'
            )
          }),
          loading,
          error,
          data: data?.roomCards,
          columns,
          className: 'relative overflow-x-auto scrollbar-style'
        }}
      />
    </TableLayoutContainer>
  )
}
