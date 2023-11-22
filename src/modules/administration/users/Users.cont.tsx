import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { SearchBar, SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { useHoveringId } from '@/store/useHoveringId'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useRoomCardsColumns } from './components/RoomCards.columns'
import { useUsers } from './hooks/useUsers'

export const UsersContainer = () => {
  const tableId = 'users'
  const router = useRouter()
  const { users, loading, error, refetch } = useUsers()
  const { setHoveringId } = useHoveringId()

  const columns = useRoomCardsColumns()

  useEffect(() => {
    users?.forEach(roomCard => {
      router.prefetch(`${PATH.ROOM_CARD}/${roomCard.uid}`)
    })
  }, [users, router])

  return (
    <TableLayoutContainer>
      <SearchBar
        {...{
          left: (
            <SearchBarButtonsComponent
              handleAdd={() => {
                router.push(PATH.ADMIN_USER)
              }}
              handleRefresh={() => {
                refetch()
              }}
              editRole={ROLE.ADMIN}
            />
          ),
          tableId
        }}
      />
      <PandaTable
        {...{
          tableId,
          getRowProps: ({ id }) => ({
            onMouseEnter: () => {
              setHoveringId(id)
            },
            onMouseLeave: () => {
              setHoveringId(undefined)
            }
          }),
          loading,
          error,
          data: users,
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
