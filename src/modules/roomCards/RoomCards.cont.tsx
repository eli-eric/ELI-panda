import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { TableLayoutContainer } from '@/components/layout/TableLayoutContainer'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import type { RoomCard } from '@/types/gql/graphql'

import { ColumnVisibilityDropdown } from '../shared/table/ColumnVisibilityDropdown.comp'
import { usePandaTable } from '../shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '../shared/table/pandaTableV2/PandaTableV2'
import { SearchBar, SearchBarButtonsComponent } from '../shared/table/SearchBar'
import { useRoomCardsColumns } from './components/RoomCards.columns'
import { useRoomCards } from './hooks/useRoomCards'

export const RoomCardsContainer = () => {
    const tableId = 'roomCards'
    const router = useRouter()
    const { roomCards, loading, refetch } = useRoomCards()

    const columns = useRoomCardsColumns()

    const table = usePandaTable({
        tableId,
        columns,
        data: (roomCards || []) as RoomCard[],
        settings: {
            enableSorting: true,
            manualSorting: false,
            enableColumnReordering: false,
            enableColumnHiding: false,
        },
    })

    useEffect(() => {
        roomCards?.forEach(roomCard => {
            router.prefetch(`${PATH.ROOM_CARD}/${roomCard.uid}`)
        })
    }, [roomCards, router])

    return (
        <TableLayoutContainer deps={[roomCards]}>
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
                    right: <ColumnVisibilityDropdown table={table} />,
                    tableId,
                }}
            />
            <PandaTableV2
                table={table}
                tableId={tableId}
                loading={loading}
                data={roomCards as RoomCard[]}
                skeletonRowCount={50}
                settings={{
                    enableSorting: true,
                    manualSorting: false,
                    enableColumnReordering: false,
                    enableColumnHiding: false,
                    enablePagination: true,
                }}
                className="relative overflow-x-auto scrollbar-style"
            />
        </TableLayoutContainer>
    )
}
