import type { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { PandaTable } from '@/modules/shared/table/pandaTable/PandaTable'
import { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'
import { classNames } from '@/utils'

import { HeaderAddButton } from '../../../roomCard/components/table/HeaderAddButton'
import { CellWithDelete } from './CellWithDelete'

interface Props {
  name: string
  header: string
  tableId: string
  setNewEmployee: (employee: Employee) => void
  setDisconnectEmployee: (employee: Employee) => void
  data: Employee[]
  className?: string
}

export const EmployeeTable = ({
  name,
  header,
  tableId,
  setNewEmployee,
  setDisconnectEmployee,
  data,
  className
}: Props) => {
  const columnsOperators = useMemo(
    (): ColumnDef<any, any>[] => [
      {
        header: header,
        meta: {
          headerElement: (
            <HeaderAddButton
              setEmployee={setNewEmployee}
              name={name}
              editPersmissionRole={ROLE.SYSTEM_EDIT}
            />
          )
        },
        columns: [
          {
            accessorKey: 'fullName',
            meta: { noHeader: true },
            cell: props => (
              <CellWithDelete
                {...props}
                name={name}
                setDeleteItem={setDisconnectEmployee}
              />
            ),
            size: 563
          }
        ]
      }
    ],
    [setNewEmployee, setDisconnectEmployee, header, name]
  )

  return (
    <PandaTable
      {...{
        tableId,
        columns: columnsOperators,
        data: data?.length === 0 ? undefined : data,
        className: classNames(
          'border-l border-r border-gray-400 mb-0 pb-0 h-fit overflow-hidden',
          className
        )
      }}
    />
  )
}
