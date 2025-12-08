import type { FC } from 'react'

import { Table } from '@/components/ui/table'

import {
  useRoomCardContactsDept,
  useRoomCardContactsHall,
  useRoomCardTeams
} from '../../hooks/useRoomCardContacts'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  roomCardUid?: string
}

export const RoomCardContactsCard: FC<Props> = ({ roomCardUid }) => {
  const { contactPersonsDept } = useRoomCardContactsDept(roomCardUid)
  const { contactPersonsHall } = useRoomCardContactsHall(roomCardUid)
  const { teams } = useRoomCardTeams(roomCardUid)

  const { columnsContactHall, columnsContactDept, columnsTeam } =
    useRoomCardsColumns(roomCardUid)

  return (
    <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
      <Table<any>
        {...{
          columns: columnsContactHall,
          data: contactPersonsHall,
          skipEmptyMessage: true,
          rowClassName: 'relative group/row',
          className: 'min-w-[450px]',
          enableSorting: false,
          enableFiltering: false
        }}
      />
      <Table<any>
        {...{
          columns: columnsContactDept,
          data: contactPersonsDept,
          skipEmptyMessage: true,
          rowClassName: 'relative group/row',
          className: 'min-w-[300px]',
          enableSorting: false,
          enableFiltering: false
        }}
      />
      <Table<any>
        {...{
          columns: columnsTeam,
          data: teams,
          skipEmptyMessage: true,
          rowClassName: 'relative group/row',
          className: 'min-w-[300px]',
          enableSorting: false,
          enableFiltering: false
        }}
      />
    </div>
  )
}
