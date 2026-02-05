import type { FC } from 'react'

import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'

import { possibleParameters } from '../../utils/constants'
import { useRoomCardsColumns } from './RoomCard.columns'

export const RoomCardBuildingMaintenanceCard: FC = () => {
    const { buildingMaintenanceColumns } = useRoomCardsColumns()

    return (
        <div>
            <Heading
                customText="BUILDING MAINTENANCE - FM"
                className="mb-0"
                textColor="text-orange-500"
                showBorder={false}
            />
            <Table<any>
                {...{
                    columns: buildingMaintenanceColumns,
                    className: 'relative border-l pb-0 z-0',
                    data: possibleParameters,
                }}
            />
        </div>
    )
}
