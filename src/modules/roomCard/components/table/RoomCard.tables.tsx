import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useRoomCardsColumns } from './RoomCard.columns'

const cleanRooms = [
  {
    name: 'PURITY CLASS',
    code: 'purityClass'
  },
  {
    name: 'PRESCRIBED CLOTHING',
    code: 'prescribedClothing'
  },
  {
    name: 'ENTRY TO HVAC TENT',
    code: 'entryToHvacTent'
  },
  {
    name: 'CLEANING SCHEDULE',
    code: 'cleaningSchedule'
  },
  {
    name: 'ADDITIONAL REQUIREMENTS',
    code: 'additionalRequirements'
  }
]

const possibleParameters = [
  {
    name: 'COOLING WATER',
    code: 'coolingWater',
    value: 'DEMI water - centrally 16°C'
  },
  {
    name: 'INDOOR ENVIRONMENT QUALITY',
    code: 'indoorEnvironmentQuality',
    value: 'temperature 20°C +/- 1°C; humidity 50% +/- 5%'
  },
  {
    name: 'COMPRESSED AIR DISTRIBUTION',
    code: 'compressedAirDistribution',
    value: '7bar - 8bar'
  },
  {
    name: 'NITROGEN CENTRAL DISTRIBUTION',
    code: 'nitrogenCentralDistribution',
    value: '1,9bar - 2,5bar depending on the outdoor temperature'
  },
  {
    name: 'MAX. PRESSURE IN COLD DISTRIBUTION',
    code: 'maxPressureInColdDistribution',
    value: '6bar'
  }
]
const clientRequirements = [
  {
    name: 'PRESSURE IN COOLING SYSTEM',
    code: 'pressureInCoolingSystem',
    value: '6bar'
  },
  {
    name: 'ROOM TEMPERATURE',
    code: 'roomTemperature',
    value: '20°C +/- 1°C'
  },
  {
    name: 'HUMIDITY',
    code: 'humidity',
    value: '50% +/- 5%'
  }
]

interface Props {
  contactPersonsHall?: any[]
  contactPersonsDept?: any[]
  teams?: any[]
}

export const RoomCardTables = ({ contactPersonsDept, contactPersonsHall, teams }: Props) => {
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
