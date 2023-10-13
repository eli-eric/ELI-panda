import type { CellContext, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'

type RoomCardProperties = {
  name: string
  value?: string
  code: string
}

const CellInput = ({
  row: {
    original: { code }
  }
}: CellContext<RoomCardProperties, any>) => {
  const { register } = useFormContext()

  return <input className="w-full bg-inherit" {...register(code)} name={code} />
}

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
