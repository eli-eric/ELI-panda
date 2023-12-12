import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { v4 } from 'uuid'

import { Badge } from '@/components/visuals/Badge'
import type { RoomCard } from '@/types/gql/graphql'

import { LocationCell } from './LocationCell'

export const useRoomCardsColumns = () => {
  const columns = useMemo(
    (): ColumnDef<RoomCard, any>[] => [
      {
        header: 'Name',
        accessorFn: row => row?.name,
        cell: LocationCell,
        id: 'name',
        size: 300,
        meta: { sticky: true }
      },
      {
        header: 'Status',
        accessorFn: row => row?.status,
        id: 'status'
      },
      {
        header: 'Loactions',
        id: 'locations',
        accessorFn: row => row?.locations,
        cell: ({ getValue }) => <div>{getValue()?.map(location => <Badge key={v4()}>{location.code}</Badge>)}</div>
      },
      {
        header: 'Purity class',
        accessorFn: row => row?.purityClass,
        id: 'purityClass'
      },
      {
        header: 'Prescribed clothing',
        accessorFn: row => row?.prescribedClothing,
        id: 'prescribedClothing'
      },
      {
        header: 'Entry to HVAC tent',
        accessorFn: row => row?.entryToHvacTent,
        id: 'entryToHvacTent'
      },
      {
        header: 'Cleaning schedule',
        accessorFn: row => row?.cleaningScheduleDate,
        id: 'cleaningShedule'
      },
      {
        header: 'Additional requirements',
        accessorFn: row => row?.additionalRequirements,
        id: 'additionalRequirements'
      },
      {
        header: 'Cooling water',
        accessorFn: row => row?.coolingWater,
        id: 'coolingWater'
      },
      {
        header: 'Indoor environment queality',
        accessorFn: row => row?.indoorEnvironmentQuality,
        id: 'indoorEnvironmentQuality',
        size: 250
      },
      {
        header: 'Copressed air distribution',
        accessorFn: row => row?.compressedAirDistribution,
        id: 'compressedAirDistribution'
      },
      {
        header: 'Nitrogen central distribution',
        accessorFn: row => row?.nitrogenCentralDistribution,
        id: 'nitrogenCentralDistribution',
        size: 250
      },
      {
        header: 'Max pressure in cold distribution',
        accessorFn: row => row?.maxPressureInColdDistribution,
        id: 'maxPressureInColdDistribution',
        size: 250
      },
      {
        header: 'Pressure in cooling system',
        accessorFn: row => row?.pressureInCoolingSystem,
        id: 'pressureInCoolingSystem'
      },
      {
        header: 'Room temperature',
        accessorFn: row => row?.roomTemperature,
        id: 'roomTemperature'
      },
      {
        header: 'Humidity',
        accessorFn: row => row?.humidity,
        id: 'humidity'
      }
    ],
    []
  )

  return columns
}
