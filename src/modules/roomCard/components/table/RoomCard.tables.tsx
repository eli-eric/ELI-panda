import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useRoomCardsColumns } from './RoomCard.columns'

interface Props {
  contactPersonHall?: any[]
  contactPersonDept?: any[]
  team?: any[]
  cleanRooms?: any[]
  possibleParameters?: any[]
  clientRequirements?: any[]
}

export const RoomCardTables = ({
  cleanRooms,
  clientRequirements,
  contactPersonDept,
  contactPersonHall,
  team,
  possibleParameters
}: Props) => {
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
            data: contactPersonHall,
            className: 'border-l pb-0 sm:mb-4'
          }}
        />
        <PandaTable
          {...{
            tableId: 'roomCard-Contact-dept',
            columns: columnsContactDept,
            data: contactPersonDept,
            className: 'border-l pb-0 sm:mb-4'
          }}
        />
        <PandaTable
          {...{
            tableId: 'roomCard-team',
            columns: columnsTeam,
            data: team,
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
