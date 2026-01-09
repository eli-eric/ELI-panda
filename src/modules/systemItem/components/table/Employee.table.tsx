import type { ColumnDef } from '@tanstack/react-table'
import { memo, useCallback, useMemo } from 'react'

import { PlusButton, TableDeleteButton } from '@/components/Buttons'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { cn } from '@/lib/utils'
import { ROLE } from '@/types/constants/roles'
import type { Employee } from '@/types/gql/graphql'

import { useEmployeeModal } from './hooks/useEmployeeModal'

interface EmployeeTableProps {
  header: string
  data: Employee[]
  onAdd: (employee: Employee) => void | Promise<void>
  onRemove: (employeeUid: string) => void | Promise<void>
  existingEmployeeUids?: string[]
  isLoading?: boolean
  className?: string
}

export const EmployeeTable = memo(
  ({
    header,
    data,
    onAdd,
    onRemove,
    existingEmployeeUids,
    isLoading = false,
    className
  }: EmployeeTableProps) => {
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])
    const withWarningModal = useWarningModal()

    const allExistingUids = useMemo(() => {
      const dataUids = data.map(e => e.uid).filter(Boolean) as string[]
      return [...new Set([...dataUids, ...(existingEmployeeUids ?? [])])]
    }, [data, existingEmployeeUids])

    const openEmployeeModal = useEmployeeModal({
      existingEmployeeUids: allExistingUids,
      onEmployeeSelected: onAdd
    })

    const handleDelete = useCallback(
      (employee: Employee) => {
        const message = `Are you sure you want to remove ${employee.fullName}?`
        withWarningModal(() => onRemove(employee.uid), message)()
      },
      [withWarningModal, onRemove]
    )

    const columns = useMemo(
      (): ColumnDef<Employee>[] => [
        {
          header: () => (
            <div className="flex justify-between w-full items-center">
              <span className="text-sm font-semibold">{header}</span>
              {canEdit && (
                <PlusButton
                  type="button"
                  onClick={openEmployeeModal}
                  disabled={isLoading}
                />
              )}
            </div>
          ),
          accessorKey: 'fullName',
          enableSorting: false,
          cell: ({ row, getValue }) => (
            <div className="flex items-center w-full justify-between pr-3">
              <span>{getValue<string>()}</span>
              {canEdit && (
                <TableDeleteButton
                  className="text-orange-400 dark:text-orange-500"
                  onClick={() => handleDelete(row.original)}
                />
              )}
            </div>
          ),
          size: 563
        }
      ],
      [header, canEdit, openEmployeeModal, isLoading, handleDelete]
    )

    return (
      <Table<Employee>
        columns={columns}
        skipEmptyMessage
        data={data}
        headerClassName="whitespace-nowrap sticky"
        rowClassName="whitespace-nowrap group/row"
        className={cn(className, 'overflow-x-auto overflow-y-auto')}
      />
    )
  }
)

EmployeeTable.displayName = 'EmployeeTable'
