import type { FC } from 'react'

import type { Codebooktree } from '@/components/form/shared/CodebookTreeModalGraphql'
import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import type { Team } from '@/types/gql/graphql'

import type { ContactPersonsHall, EmployeeType } from '../../types/form'
import { cleanRooms, possibleParameters } from '../../utils/constants'
import { AddLocationButton } from './AddLocationButton'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  teams?: Team[]
  locations?: Codebooktree[]
}

export const RoomCardTables: FC<Props> = ({ contactPersonsDept, contactPersonsHall, teams, locations }) => {
  const {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    buildingMaintenanceColumns,
    locationColumns
  } = useRoomCardsColumns()

  console.log(locations)
  return (
    <Card className="pt-4">
      <div className="lg:flex justify-between">
        <PandaTable
          {...{
            tableId: 'roomCard-Contact',
            columns: columnsContactHall,
            data: contactPersonsHall?.length === 0 ? undefined : contactPersonsHall,
            className: 'relative border-l pb-0 sm:mb-4 z-0'
          }}
        />
        <PandaTable
          {...{
            tableId: 'roomCard-Contact-dept',
            columns: columnsContactDept,
            data: contactPersonsDept?.length === 0 ? undefined : contactPersonsDept,
            className: 'relative border-l pb-0 sm:mb-4 z-0'
          }}
        />
        <PandaTable
          {...{
            tableId: 'roomCard-team',
            columns: columnsTeam,
            data: teams?.length === 0 ? undefined : teams,
            className: 'relative border-l pb-0 sm:mb-4 z-0'
          }}
        />
      </div>
      <Heading customText="CLEAN ROOMS" className="mb-0" textColor="text-primary-500" />
      <PandaTable
        {...{
          tableId: 'roomCard-cleanRooms',
          columns: columnsCleanRooms,
          data: cleanRooms,
          className: 'relative border-l pb-0 z-0'
        }}
      />
      <Heading customText="BULDING MAINTENANCE - FM" className="mb-0" textColor="text-primary-500" />
      <PandaTable
        {...{
          tableId: 'roomCard-buildingMaintenance',
          columns: buildingMaintenanceColumns,
          className: 'relative border-l pb-0 z-0',
          data: possibleParameters
        }}
      />
      <Heading customText="LOCATIONS" className="mb-0" textColor="text-primary-500">
        <AddLocationButton />
      </Heading>
      <PandaTable
        {...{
          tableId: 'roomCard-locations',
          columns: locationColumns,
          className: 'relative border-l pb-0 z-0',
          data: locations
        }}
      />
    </Card>
  )
}
