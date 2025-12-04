import { type FC } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import type { CodebookType } from '@/types/responses/codebook'

import { RoomCardBuildingMaintenanceCard } from './components/table/RoomCardBuildingMaintenanceCard'
import { RoomCardCleanRoomsCard } from './components/table/RoomCardCleanRoomsCard'
import { RoomCardContactsCard } from './components/table/RoomCardContactsCard'
import { RoomCardLocationsCard } from './components/table/RoomCardLocationsCard'
import type { ContactPersonsHall, EmployeeType } from './types/form'

type Props = {
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  teams: CodebookType[]
  locations?: Codebooktree[]
}

export const RoomCardComponent: FC<Props> = ({
  contactPersonsHall,
  contactPersonsDept,
  teams,
  locations
}) => {
  return (
    <div className="space-y-6">
      <RoomCardContactsCard
        contactPersonsHall={contactPersonsHall}
        contactPersonsDept={contactPersonsDept}
        teams={teams}
      />

      <RoomCardLocationsCard locations={locations} />

      <RoomCardCleanRoomsCard />

      <RoomCardBuildingMaintenanceCard />
    </div>
  )
}

