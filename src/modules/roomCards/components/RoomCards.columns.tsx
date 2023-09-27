import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { RoomCard } from '@/types/gql/graphql'

export const useRoomCardsColumns = () => {
  const columns = useMemo(
    (): ColumnDef<RoomCard, any>[] => [
      {
        header: 'Location',
        accessorFn: row => row?.location.name,
        id: 'location',
        size: 300,
        meta: { sticky: true }
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
        header: 'Cleaning shedule',
        accessorFn: row => row?.cleaningShedule,
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
        id: 'indoorEnvironmentQueality'
      },
      {
        header: 'Copressed air distribution',
        accessorFn: row => row?.copressedAirDistribution,
        id: 'copressedAirDistribution'
      },
      {
        header: 'Nitrogen central distribution',
        accessorFn: row => row?.nitrogenCentralDistribution,
        id: 'nitrogenCentralDistribution'
      },
      {
        header: 'Max pressure in cold distribution',
        accessorFn: row => row?.maxPressureInColdDistribution,
        id: 'maxPressureInColdDistribution'
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
