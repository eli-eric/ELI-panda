import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import type { HallContactPerson, Team } from '@/types/gql/graphql'

import { CellInput } from './CellInput'
import { CellWithDelete } from './CellWithDelete'
import { ContactDeptButton } from './ContactDeptButton'
import { ContactHallButton } from './ContactHallButton'
import { TeamButton } from './TeamButton'

export type RoomCardProperties = {
  name: string
  value?: string
  code: string
}

export const useRoomCardsColumns = () => {
  const columnsContactHall = useMemo(
    (): ColumnDef<HallContactPerson, any>[] => [
      {
        header: 'Contact - Hall',
        meta: { headerElement: <ContactHallButton /> },
        columns: [
          {
            accessorFn: ({ role }) => role?.name,
            id: 'role',
            meta: { noHeader: true },
            size: 200
          },
          {
            accessorFn: ({ employee: { fullName } }) => fullName,
            id: 'fullName',
            meta: { noHeader: true }
          },
          {
            accessorFn: ({ employee: { phoneNumber } }) => phoneNumber,
            id: 'phone',
            cell: props => <CellWithDelete {...props} formName="contactPersonsHall" />,
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsContactDept = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Contact - Dept. 99',
        meta: { headerElement: <ContactDeptButton /> },

        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'phone',
            cell: props => <CellWithDelete {...props} formName="contactPersonsDept" />,
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsTeam = useMemo(
    (): ColumnDef<Team, any>[] => [
      {
        header: 'Team',
        meta: { headerElement: <TeamButton /> },
        accessorKey: 'name',
        cell: props => <CellWithDelete {...props} formName="teams" />
      }
    ],
    []
  )

  const columnsCleanRooms = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: "Clean Room's parameters",
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true },
            cell: CellInput
          }
        ]
      }
    ],
    []
  )
  const columnsPossibleParameters = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: 'Possible Parameters',
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true },
            cell: CellInput
          }
        ]
      }
    ],
    []
  )

  const columnsClientRequirements = useMemo(
    (): ColumnDef<RoomCardProperties, any>[] => [
      {
        header: 'Client Requirements',
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true },
            cell: CellInput
          }
        ]
      }
    ],
    []
  )

  return {
    columnsContactHall,
    columnsContactDept,
    columnsTeam,
    columnsCleanRooms,
    columnsPossibleParameters,
    columnsClientRequirements
  }
}
