import type { ColumnDef } from '@tanstack/react-table'
import { memo, useMemo } from 'react'

import { Table } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'

import { HeaderAddButton } from '../../../roomCard/components/table/HeaderAddButton'
import { CellWithDelete } from './CellWithDelete'

const MemoizedHeaderButton = memo(HeaderAddButton)

interface Props {
  name: string
  header: string
  setNewEmployee: (employee: Employee) => void
  setDisconnectEmployee: (employee: Employee) => void
  data: Employee[]
  className?: string
}

export const EmployeeTable = memo(
  ({
    name,
    header,
    setNewEmployee,
    setDisconnectEmployee,
    data,
    className
  }: Props) => {
    const columnsOperators = useMemo(
      (): ColumnDef<{ fullName: string }, any>[] => [
        {
          header: () => {
            return (
              <div className="flex justify-between w-full items-center">
                <span className="text-sm font-semibold">{header}</span>
                <MemoizedHeaderButton
                  setEmployee={setNewEmployee}
                  name={name}
                  editPersmissionRole={ROLE.SYSTEM_EDIT}
                />
              </div>
            )
          },
          accessorKey: 'fullName',
          enableSorting: false,
          cell: props => (
            <CellWithDelete
              {...props}
              name={name}
              setDeleteItem={setDisconnectEmployee}
            />
          ),
          size: 563
        }
      ],
      [setNewEmployee, setDisconnectEmployee, header, name]
    )

    return (
      <Table<any>
        columns={columnsOperators}
        skipEmptyMessage={true}
        data={data}
        headerClassName="whitespace-nowrap sticky"
        rowClassName="whitespace-nowrap group/row"
        className={cn(className, 'overflow-x-auto overflow-y-auto')}
      />
    )
  }
)

EmployeeTable.displayName = 'EmployeeTable'
