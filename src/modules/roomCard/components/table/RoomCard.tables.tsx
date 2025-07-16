import type { FC } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'
import type { CodebookType } from '@/types/responses/codebook'

import type { ContactPersonsHall, EmployeeType } from '../../types/form'
import { cleanRooms, possibleParameters } from '../../utils/constants'
import { AddLocationButton } from './AddLocationButton'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  teams?: CodebookType[]
  locations?: Codebooktree[]
}

export const RoomCardTables: FC<Props> = ({
  contactPersonsDept,
  contactPersonsHall,
  teams,
  locations
}) => {
  const {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    buildingMaintenanceColumns,
    locationColumns
  } = useRoomCardsColumns()

  const editPersmission = usePermission([ROLE.ROOM_CARD_EDIT])

  // Safely ensure data is never undefined, always an array
  const safeContactPersonsHall = contactPersonsHall || []
  const safeContactPersonsDept = contactPersonsDept || []
  const safeTeams = teams || []
  const safeLocations = locations || []

  return (
    <Card className="pt-4">
      <div className="flex flex-col xl:flex-row xl:justify-between gap-2">
        <Table<any>
          {...{
            columns: columnsContactHall,
            data: safeContactPersonsHall,
            skipEmptyMessage: true,
            rowClassName: 'relative group/row',
            className: 'min-w-[450px]',
            enableSorting: false,
            enableFiltering: false
          }}
        />
        <Table<any>
          {...{
            columns: columnsContactDept,
            data: safeContactPersonsDept,
            skipEmptyMessage: true,
            rowClassName: 'relative group/row',
            className: 'min-w-[300px]',
            enableSorting: false,
            enableFiltering: false
          }}
        />
        <Table<any>
          {...{
            columns: columnsTeam,
            data: safeTeams,
            skipEmptyMessage: true,
            rowClassName: 'relative group/row',
            className: 'min-w-[300px]',
            enableSorting: false,
            enableFiltering: false
          }}
        />
      </div>
      <Heading
        customText="LOCATIONS"
        className="mb-0"
        textColor="text-orange-500"
        showBorder={false}
      >
        {editPersmission && <AddLocationButton />}
      </Heading>
      <Table<any>
        {...{
          columns: locationColumns,
          rowClassName: 'relative group/row',
          data: safeLocations
        }}
      />
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
      <Heading
        customText="BULDING MAINTENANCE - FM"
        className="mb-0"
        textColor="text-orange-500"
        showBorder={false}
      />
      <Table<any>
        {...{
          columns: buildingMaintenanceColumns,
          className: 'relative border-l pb-0 z-0',
          data: possibleParameters
        }}
      />
    </Card>
  )
}
