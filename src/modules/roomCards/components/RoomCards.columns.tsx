import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { RoomCard } from '@/types/gql/graphql'

import { LocationCell } from './LocationCell'

export const useRoomCardsColumns = () => {
  const columns = useMemo(
    (): ColumnDef<RoomCard, any>[] => [
      {
        header: 'Location',
        accessorFn: row => row?.location.name,
        cell: props => <LocationCell {...props} />,
        id: 'location',
        size: 300,
        meta: { sticky: true }
      },
      {
        header: 'Code',
        accessorFn: row => row?.location.code,
        id: 'code',
        size: 100
      },
      {
        header: 'Status',
        accessorFn: row => row?.status,
        id: 'status'
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
        accessorFn: row => row?.cleaningSchedule,
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
        accessorFn: row => row?.indoorEnvironmentQueality,
        id: 'indoorEnvironmentQuality',
        size: 250
      },
      {
        header: 'Copressed air distribution',
        accessorFn: row => row?.copressedAirDistribution,
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
