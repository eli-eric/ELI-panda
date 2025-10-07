import type { ColumnDef } from '@tanstack/react-table'
import { memo, useMemo } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import { cn } from '@/lib/utils'
import { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'

import { CellWithDelete } from './CellWithDelete'
import { useEmployeeModal } from './hooks/useEmployeeModal'

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
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])
    const openEmployeeModal = useEmployeeModal({
      fieldName: name,
      onEmployeeAdded: setNewEmployee
    })

    const columnsOperators = useMemo(
      (): ColumnDef<{ fullName: string }, any>[] => [
        {
          header: () => {
            return (
              <div className="flex justify-between w-full items-center">
                <span className="text-sm font-semibold">{header}</span>
                {canEdit && (
                  <PlusButton type="button" onClick={openEmployeeModal} />
                )}
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
      [setDisconnectEmployee, header, name, canEdit, openEmployeeModal]
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
