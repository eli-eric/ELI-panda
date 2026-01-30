import type { FC } from 'react'

import { Table } from '@/components/ui/table'

import {
    useRoomCardContactsDept,
    useRoomCardContactsHall,
    useRoomCardTeams,
} from '../../hooks/useRoomCardContacts'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
    roomCardUid?: string
}

export const RoomCardContactsCard: FC<Props> = ({ roomCardUid }) => {
    const { contactPersonsDept, isFetching: contactPersDeptFetching } =
        useRoomCardContactsDept(roomCardUid)
    const { contactPersonsHall, isFetching: contactPersonHallFetching } =
        useRoomCardContactsHall(roomCardUid)
    const { teams, isFetching: teamsFetching } = useRoomCardTeams(roomCardUid)

    const { columnsContactHall, columnsContactDept, columnsTeam } = useRoomCardsColumns(roomCardUid)

    return (
        <div className="flex gap-2">
            <div>
                <Table<any>
                    {...{
                        columns: columnsContactHall,
                        data: contactPersonsHall,
                        rowClassName: 'relative group/row',
                        enableSorting: false,
                        enableFiltering: false,
                        loading: contactPersonHallFetching,
                        skeletonRowCount: 3,
                    }}
                />
            </div>

            <div>
                <Table<any>
                    {...{
                        columns: columnsContactDept,
                        data: contactPersonsDept,
                        rowClassName: 'relative group/row',
                        enableSorting: false,
                        enableFiltering: false,
                        loading: contactPersDeptFetching,
                        skeletonRowCount: 3,
                    }}
                />
            </div>

            <div>
                <Table<any>
                    {...{
                        columns: columnsTeam,
                        data: teams,
                        rowClassName: 'relative group/row',
                        enableSorting: false,
                        enableFiltering: false,
                        loading: teamsFetching,
                        skeletonRowCount: 3,
                    }}
                />
            </div>
        </div>
    )
}
