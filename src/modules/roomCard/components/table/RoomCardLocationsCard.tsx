import type { FC } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { AddLocationButton } from './AddLocationButton'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  locations?: Codebooktree[]
}

export const RoomCardLocationsCard: FC<Props> = ({ locations }) => {
  const { locationColumns } = useRoomCardsColumns()
  const editPermission = usePermission([ROLE.ROOM_CARD_EDIT])

  const safeLocations = locations || []

  return (
    <div>
      <Heading
        customText="LOCATIONS"
        className="mb-0"
        textColor="text-orange-500"
        showBorder={false}
      >
        {editPermission && <AddLocationButton />}
      </Heading>
      <Table<any>
        {...{
          columns: locationColumns,
          rowClassName: 'relative group/row',
          data: safeLocations
        }}
      />
    </div>
  )
}
