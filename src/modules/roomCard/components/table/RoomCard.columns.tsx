import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { PlusButton } from '@/components/Buttons'

export const useRoomCardsColumns = () => {
  const columnsContactHall = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Contact - Hall',
        meta: { headerElement: <PlusButton primary /> },
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
        meta: { headerElement: <PlusButton primary /> },

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
    (): ColumnDef<any, any>[] => [
      {
        header: "Clean Room's parameters",
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )
  const columnsPossibleParameters = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Possible Parameters',
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true }
          }
        ]
      }
    ],
    []
  )

  const columnsClientRequirements = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Client Requirements',
        columns: [
          {
            accessorKey: 'name',
            meta: { noHeader: true }
          },
          {
            accessorKey: 'value',
            meta: { noHeader: true }
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
