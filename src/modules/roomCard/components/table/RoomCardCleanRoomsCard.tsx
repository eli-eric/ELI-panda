import type { FC } from 'react'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'

import { cleanRooms } from '../../utils/constants'
import { useRoomCardsColumns } from './RoomCard.columns'

export const RoomCardCleanRoomsCard: FC = () => {
  const { columnsCleanRooms } = useRoomCardsColumns()

  return (
    <div>
      <Heading
        customText="CLEAN ROOMS"
        className="mb-0"
        textColor="text-orange-500"
        showBorder={false}
      />
      <Table<any>
        {...{
          columns: columnsCleanRooms,
          data: cleanRooms,
          className: 'relative border-l pb-0 z-0'
        }}
      />
    </div>
  )
}
