import { type FC } from 'react'

import { RoomCardBuildingMaintenanceCard } from './components/table/RoomCardBuildingMaintenanceCard'
import { RoomCardCleanRoomsCard } from './components/table/RoomCardCleanRoomsCard'
import { RoomCardContactsCard } from './components/table/RoomCardContactsCard'
import { RoomCardLocationsCard } from './components/table/RoomCardLocationsCard'

type Props = {
  roomCardUid?: string
}

export const RoomCardComponent: FC<Props> = ({ roomCardUid }) => {
  return (
    <div className="space-y-6">
      <RoomCardContactsCard roomCardUid={roomCardUid} />

      <RoomCardLocationsCard roomCardUid={roomCardUid} />

      <RoomCardCleanRoomsCard />

      <RoomCardBuildingMaintenanceCard />
    </div>
  )
}
