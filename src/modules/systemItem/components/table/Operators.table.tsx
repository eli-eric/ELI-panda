import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'

import { useSystemItemStore } from '../../store/useSystemItemStore'
import { CellWithDelete } from './CellWithDelete'
import { HeaderAddButton } from './HeaderAddButton'

export const OperatorsTable = () => {
  const { setNewOperator, setDisconnectOperator } = useSystemItemStore()
  const { control } = useFormContext()

  const operators = useWatch({ control, name: 'operators' })

  const columnsOperators = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: 'Authorized Operators',
        meta: { headerElement: <HeaderAddButton setEmployee={setNewOperator} name={'operators'} /> },

        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => <CellWithDelete {...props} name="operators" setDeleteItem={setDisconnectOperator} />,
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
        tableId: 'systemOperators',
        columns: columnsOperators,
        data: operators.length === 0 ? undefined : operators,
        className: 'border-l border-gray-400 mb-0 pb-0  w-full'
      }}
    />
  )
}
