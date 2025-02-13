import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { cx } from '@/utils'

import { statusColorMapping } from '../roomCard/utils/constants'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { useRoomCardsColumns } from './components/RoomCards.columns'
import { useRoomCards } from './hooks/useRoomCards'

export const RoomCardsContainer = () => {
  const tableId = 'roomCards'
  const router = useRouter()
  const { roomCards, loading, error, refetch } = useRoomCards()

  const columns = useRoomCardsColumns()

  useEffect(() => {
    roomCards?.forEach(roomCard => {
      router.prefetch(`${PATH.ROOM_CARD}/${roomCard.uid}`)
    })
  }, [roomCards, router])

  return (
    <TableLayoutContainer>
      <SearchBar
        {...{
          left: (
            <SearchBarButtonsComponent
              handleAdd={() => {
                router.push(PATH.ROOM_CARD)
              }}
              handleRefresh={() => {
                refetch()
              }}
              editRole={ROLE.ROOM_CARD_EDIT}
            />
          ),
          tableId
        }}
      />
      <PandaTable
        {...{
          tableId,
          getRowProps: ({ original: { status } }) => ({
            className: cx(...statusColorMapping(status))
          }),
          loading,
          error,
          data: roomCards,
          settings: {
            enableSorting: true,
            manualSorting: false,
            enableColumnReordering: false,
            enableColumnHiding: true
          },
          columns,
          className: 'relative overflow-x-auto scrollbar-style'
        }}
      />
    </TableLayoutContainer>
  )
}
