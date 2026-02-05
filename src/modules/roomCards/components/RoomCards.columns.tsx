import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { Tooltip } from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { RoomCard } from '@/types/gql/graphql'

import {
    getOperationalStateDotColor,
    getOperationalStateLabel,
    getStatusBadgeColor,
    getStatusLabel,
} from '../../roomCard/utils/statusColors'
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
                meta: { sticky: true },
            },
            {
                header: 'Status',
                accessorFn: row => row?.status,
                id: 'status',
                size: 150,
                cell: ({ getValue }) => {
                    const status = getValue()
                    return (
                        <Badge
                            className={cn(
                                'text-gray-900 dark:text-white',
                                getStatusBadgeColor(status),
                            )}
                        >
                            {getStatusLabel(status)}
                        </Badge>
                    )
                },
            },
            {
                header: 'Operational State',
                accessorFn: row => row?.operationalState,
                id: 'operationalState',
                size: 300,
                cell: ({ getValue }) => {
                    const state = getValue()
                    if (!state) return '-'
                    return (
                        <Badge
                            className={cn(
                                'text-gray-900 dark:text-white',
                                getOperationalStateDotColor(state?.code),
                            )}
                        >
                            {getOperationalStateLabel(state)}
                        </Badge>
                    )
                },
            },
            {
                header: 'Loactions',
                id: 'locations',
                accessorFn: row => row?.locations,
                size: 300,
                cell: ({ getValue }) => (
                    <div>
                        {getValue()?.map(location => (
                            <Tooltip key={location.code} content={location.name}>
                                <Badge
                                    key={location.code}
                                    className="mb-1 mr-1 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
                                >
                                    {location.code}
                                </Badge>
                            </Tooltip>
                        ))}
                    </div>
                ),
            },
            {
                header: 'Purity class',
                accessorFn: row => row?.purityClass,
                id: 'purityClass',
            },
            {
                header: 'Prescribed clothing',
                accessorFn: row => row?.prescribedClothing,
                size: 400,
                id: 'prescribedClothing',
                cell: ({ getValue }) => {
                    const value = getValue()

                    return (
                        <div>
                            {value?.map((item: string, index: number) => (
                                <Badge
                                    key={index}
                                    className="mb-1 mr-1 bg-blue-200 dark:bg-blue-600 text-gray-900 dark:text-white"
                                >
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    )
                },
            },
            {
                header: 'Entry to HVAC tent',
                accessorFn: row => row?.entryToHvacTent,
                id: 'entryToHvacTent',
            },
            {
                header: 'Cleaning schedule',
                accessorFn: row => row?.cleaningScheduleDays,
                id: 'cleaningShedule',
                size: 300,
                cell: ({ getValue }) => {
                    const value = getValue()
                    return (
                        <div>
                            {value?.map((item: string, index: number) => (
                                <Badge
                                    key={index}
                                    className="mb-1 mr-1 bg-purple-200 dark:bg-purple-600 text-gray-900 dark:text-white"
                                >
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    )
                },
            },
            {
                header: 'Additional requirements',
                accessorFn: row => row?.additionalRequirements,
                size: 200,
                id: 'additionalRequirements',
            },
            {
                header: 'Cooling water',
                accessorFn: row => row?.coolingWater,
                id: 'coolingWater',
            },
            {
                header: 'Indoor environment queality',
                accessorFn: row => row?.indoorEnvironmentQuality,
                id: 'indoorEnvironmentQuality',
                size: 250,
            },
            {
                header: 'Copressed air distribution',
                accessorFn: row => row?.compressedAirDistribution,
                size: 250,
                id: 'compressedAirDistribution',
            },
            {
                header: 'Nitrogen central distribution',
                accessorFn: row => row?.nitrogenCentralDistribution,
                id: 'nitrogenCentralDistribution',
                size: 250,
            },
            {
                header: 'Max pressure in cold distribution',
                accessorFn: row => row?.maxPressureInColdDistribution,
                id: 'maxPressureInColdDistribution',
                size: 250,
            },
        ],
        [],
    )

    return columns
}
