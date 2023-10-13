import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { PlusButton } from '@/components/Buttons'

import { CellInput } from './CellInput'
import { ContactDeptButton } from './ContactDeptButton'
import { ContactHallButton } from './ContactHallButton'

export type RoomCardProperties = {
  name: string
  value?: string
  code: string
}

export const useRoomCardsColumns = () => {
  const columnsContactHall = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Contact - Hall',
        meta: { headerElement: <ContactHallButton /> },
        columns: [
          {
            accessorKey: 'role',
            meta: { noHeader: true },
            size: 200
          },
          {
            accessorKey: 'fullName',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'phone',
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
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsTeam = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Team',
        meta: { headerElement: <PlusButton primary /> },
        accessorKey: 'teamName'
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
