import type { FC } from 'react'

import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import type { Employee, HallContactPerson, Team } from '@/types/gql/graphql'

import { cleanRooms, clientRequirements, possibleParameters } from '../../utils/constants'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  contactPersonsHall?: HallContactPerson[]
  contactPersonsDept?: Employee[]
  teams?: Team[]
}

export const RoomCardTables: FC<Props> = ({ contactPersonsDept, contactPersonsHall, teams }) => {
  const {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    columnsPossibleParameters,
    columnsClientRequirements
  } = useRoomCardsColumns()

  return (
    <Card className="pt-4">
      <div className="lg:flex justify-between">
        <PandaTable
          {...{
            tableId: 'roomCard-Contact',
            columns: columnsContactHall,
            data: contactPersonsHall?.length === 0 ? undefined : contactPersonsHall,
            className: 'border-l pb-0 sm:mb-4'
          }}
        />
        <PandaTable
          {...{
            tableId: 'roomCard-Contact-dept',
            columns: columnsContactDept,
            data: contactPersonsDept?.length === 0 ? undefined : contactPersonsDept,
            className: 'border-l pb-0 sm:mb-4'
          }}
        />
        <PandaTable
          {...{
            tableId: 'roomCard-team',
            columns: columnsTeam,
            data: teams?.length === 0 ? undefined : teams,
            className: 'border-l pb-0 sm:mb-4'
          }}
        />
      </div>
      <Heading customText="CLEAN ROOMS" className="mb-0" textColor="text-primary-500" />
      <PandaTable
        {...{
          tableId: 'roomCard-cleanRooms',
          columns: columnsCleanRooms,
          data: cleanRooms,
          className: 'border-l pb-0'
        }}
      />
      <Heading customText="BULDING MAINTENANCE - FM" className="mb-0" textColor="text-primary-500" />
      <PandaTable
        {...{
          tableId: 'roomCard-possibleParamsHeader',
          columns: columnsPossibleParameters,
          className: 'border-l pb-0',
          data: possibleParameters
        }}
      />
      <PandaTable
        {...{
          tableId: 'roomCard-clientRequirementsHead',
          columns: columnsClientRequirements,
          className: 'border-l pb-0',
          data: clientRequirements
        }}
      />
    </Card>
  )
}
