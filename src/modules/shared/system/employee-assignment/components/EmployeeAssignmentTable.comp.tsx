import type { ColumnDef } from '@tanstack/react-table'
import { memo, useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { PlusButton, TableDeleteButton } from '@/components/Buttons'
import { Table } from '@/components/ui/table'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { ROLE } from '@/types/constants/roles'

import { useEmployeeAssignmentModal } from '../hooks/useEmployeeAssignmentModal'
import type { EmployeeAssignment } from '../types'

interface EmployeeAssignmentTableProps {
    header: string
    data: EmployeeAssignment[]
    onAdd: (employee: EmployeeAssignment) => void | Promise<void>
    onRemove: (employeeUid: string) => void | Promise<void>
    existingEmployeeUids?: string[]
    isLoading?: boolean
    className?: string
}

export const EmployeeAssignmentTable = memo(
    ({
        header,
        data,
        onAdd,
        onRemove,
        existingEmployeeUids,
        isLoading = false,
        className,
    }: EmployeeAssignmentTableProps) => {
        const { formatMessage: fm } = useIntl()
        const canEdit = usePermission([ROLE.SYSTEM_EDIT])
        const withWarningModal = useWarningModal()

        const allExistingUids = useMemo(() => {
            const dataUids = data.map(e => e.uid).filter(Boolean) as string[]
            return [...new Set([...dataUids, ...(existingEmployeeUids ?? [])])]
        }, [data, existingEmployeeUids])

        const openEmployeeModal = useEmployeeAssignmentModal({
            existingEmployeeUids: allExistingUids,
            onEmployeeSelected: onAdd,
        })

        const handleDelete = useCallback(
            (employee: EmployeeAssignment) => {
                const employeeName = employee.fullName || employee.name || employee.uid
                const warningMessage = fm(
                    { id: message.common.employeeAssignment.removeConfirm },
                    { employeeName },
                )
                withWarningModal(() => onRemove(employee.uid), warningMessage)()
            },
            [fm, withWarningModal, onRemove],
        )

        const columns = useMemo(
            (): ColumnDef<EmployeeAssignment>[] => [
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
                    cell: ({ row, getValue }) => {
                        const value = getValue<string | null | undefined>()
                        const displayName = value || row.original.name || row.original.uid

                        return (
                            <div className="flex items-center w-full justify-between pr-3">
                                <span>{displayName}</span>
                                {canEdit && (
                                    <TableDeleteButton
                                        className="text-orange-400 dark:text-orange-500"
                                        onClick={() => handleDelete(row.original)}
                                    />
                                )}
                            </div>
                        )
                    },
                    size: 563,
                },
            ],
            [header, canEdit, openEmployeeModal, isLoading, handleDelete],
        )

        return (
            <Table<EmployeeAssignment>
                columns={columns}
                skipEmptyMessage
                data={data}
                headerClassName="whitespace-nowrap sticky"
                rowClassName="whitespace-nowrap group/row"
                className={cn(className, 'overflow-x-auto overflow-y-auto')}
            />
        )
    },
)

EmployeeAssignmentTable.displayName = 'EmployeeAssignmentTable'
