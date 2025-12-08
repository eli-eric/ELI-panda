import { type FC } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'

import { RoomCardBuildingMaintenanceCard } from './components/table/RoomCardBuildingMaintenanceCard'
import { RoomCardCleanRoomsCard } from './components/table/RoomCardCleanRoomsCard'
import { RoomCardContactsCard } from './components/table/RoomCardContactsCard'
import { RoomCardLocationsCard } from './components/table/RoomCardLocationsCard'

type Props = {
  roomCardUid?: string
  locations?: Codebooktree[]
}

export const RoomCardComponent: FC<Props> = ({ roomCardUid, locations }) => {
  return (
    <div className="space-y-6">
      <RoomCardContactsCard roomCardUid={roomCardUid} />

      <RoomCardLocationsCard locations={locations} />

      <RoomCardCleanRoomsCard />

      <RoomCardBuildingMaintenanceCard />
    </div>
  )
}
