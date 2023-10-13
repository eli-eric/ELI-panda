import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { classNames } from '@/utils'

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
              editRole={ROLE.BASICS}
            />
          ),
          tableId
        }}
      />
      <PandaTable
        {...{
          tableId,
          getRowProps: ({ original: { status, uid } }) => ({
            className: classNames(
              status === 'DIRTY_MODE' && 'bg-red-200',
              status === 'CLEAN_MODE' && 'bg-lime-200',
              status === 'IN_PREPARATION_MODE' && 'bg-orange-200',
              'cursor-pointer',
              'hover:text-blue-500'
            ),
            onClick: () => {
              router.push(`${PATH.ROOM_CARD}/${uid}`)
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
