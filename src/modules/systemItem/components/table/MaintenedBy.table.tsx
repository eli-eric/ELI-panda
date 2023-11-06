import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useSystemItemStore } from '../../store/useSystemItemStore'
import { CellWithDelete } from './CellWithDelete'
import { HeaderAddButton } from './HeaderAddButton'

export const MaintenedByTable = () => {
  const { setNewMaintenedBy, setDisconnectMaintenedBy } = useSystemItemStore()
  const { control } = useFormContext()
  const maintenedBy = useWatch({ control, name: 'maintenedBy' })

  const columnsOperators = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Authorized Operators',
        meta: { headerElement: <HeaderAddButton setEmployee={setNewMaintenedBy} name={'maintenedBy'} /> },

        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => <CellWithDelete {...props} name="maintenedBy" setDeleteItem={setDisconnectMaintenedBy} />,
            size: 563
          }
        ]
      }
    ],
    []
  )

  return (
    <PandaTable
      {...{
        tableId: 'systemMainteners',
        columns: columnsOperators,
        data: maintenedBy.length === 0 ? undefined : maintenedBy,
        className: 'border-l border-gray-400 mb-0 pb-0  w-full'
      }}
    />
  )
}
