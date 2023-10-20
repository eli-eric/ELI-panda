import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { useHoveringId } from '@/store/useHoveringId'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { classNames } from '@/utils'

import { statusColorMapping } from '../roomCard/utils/constants'
import { PandaTable } from '../shared/table/pandaTable/PandaTable'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { useRoomCardsColumns } from './components/RoomCards.columns'
import { useRoomCards } from './hooks/useRoomCards'

export const RoomCardsContainer = () => {
  const tableId = 'roomCards'
  const router = useRouter()
  const { roomCards, loading, error, refetch } = useRoomCards()
  const { setHoveringId } = useHoveringId()

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
          getRowProps: ({ original: { status }, id }) => ({
            className: classNames(...statusColorMapping(status)),
            onMouseEnter: () => {
              setHoveringId(id)
            },
            onMouseLeave: () => {
              setHoveringId(undefined)
            }
          }),
          loading,
          error,
          data: roomCards,
          settings: {
            enableSorting: true,
            manualSorting: false
          },
          columns,
          className: 'relative overflow-x-auto scrollbar-style'
        }}
      />
    </TableLayoutContainer>
  )
}
