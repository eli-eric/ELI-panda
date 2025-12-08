import type { FC } from 'react'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useRoomCardLocations } from '../../hooks/useRoomCardContacts'
import { AddLocationButton } from './AddLocationButton'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  roomCardUid?: string
}

export const RoomCardLocationsCard: FC<Props> = ({ roomCardUid }) => {
  const { locationColumns } = useRoomCardsColumns(roomCardUid)
  const { locations } = useRoomCardLocations(roomCardUid)
  const editPermission = usePermission([ROLE.ROOM_CARD_EDIT])

  return (
    <div>
      <Heading
        customText="LOCATIONS"
        className="mb-0"
        textColor="text-orange-500"
        showBorder={false}
      >
        {editPermission && <AddLocationButton roomCardUid={roomCardUid} />}
      </Heading>
      <Table<any>
        {...{
          columns: locationColumns,
          rowClassName: 'relative group/row',
          data: locations
        }}
      />
    </div>
  )
}
