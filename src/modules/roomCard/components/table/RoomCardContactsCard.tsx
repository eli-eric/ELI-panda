import type { FC } from 'react'

import { Table } from '@/components/ui/table'
import type { CodebookType } from '@/types/responses/codebook'

import type { ContactPersonsHall, EmployeeType } from '../../types/form'
import { useRoomCardsColumns } from './RoomCard.columns'

type Props = {
  contactPersonsHall: ContactPersonsHall[]
  contactPersonsDept: EmployeeType[]
  teams?: CodebookType[]
}

export const RoomCardContactsCard: FC<Props> = ({
  contactPersonsHall,
  contactPersonsDept,
  teams
}) => {
  const { columnsContactHall, columnsContactDept, columnsTeam } =
    useRoomCardsColumns()

  // Safely ensure data is never undefined, always an array
  const safeContactPersonsHall = contactPersonsHall || []
  const safeContactPersonsDept = contactPersonsDept || []
  const safeTeams = teams || []

  return (
        <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
          <Table<any>
            {...{
              columns: columnsContactHall,
              data: safeContactPersonsHall,
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
              data: safeContactPersonsDept,
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
              data: safeTeams,
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
