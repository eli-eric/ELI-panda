'use client'

import { useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { InlineFieldCombobox } from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'
import { useSystemEditPermission } from '@/modules/shared/system/edit-permission'
import {
    EmployeeAssignmentTable,
    useAddSystemEmployeeAssignment,
    useRemoveSystemEmployeeAssignment,
} from '@/modules/shared/system/employee-assignment'
import { CODEBOOK } from '@/types/constants/codebook'
import { SystemLevel } from '@/types/gql/graphql'

import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import type { SystemLeaf } from '../../types'
import { SYSTEM_DETAIL_QUERY_KEY } from '../../types/constants'

interface PersonsTabProps {
    system: SystemLeaf
}

export const PersonsTabContainer: FC<PersonsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const queryClient = useQueryClient()
    const { canEdit } = useSystemEditPermission(system.uid)

    const refreshSystemDetail = useCallback(() => {
        void queryClient.invalidateQueries({ queryKey: [SYSTEM_DETAIL_QUERY_KEY] })
    }, [queryClient])

    // Pass current system for relationship disconnect
    const { updateField, isPending } = useSystemFieldUpdate({
        responsible: system.responsible,
        owner: system.owner,
        responsibleTeam: system.responsibleTeam,
    })

    const { addEmployee: addOperator, isAdding: isAddingOperator } = useAddSystemEmployeeAssignment(
        system.uid,
        'operators',
        {
            onSuccess: refreshSystemDetail,
        },
    )
    const { removeEmployee: removeOperator, isRemoving: isRemovingOperator } =
        useRemoveSystemEmployeeAssignment(system.uid, 'operators', {
            onSuccess: refreshSystemDetail,
        })

    const { addEmployee: addMaintainedBy, isAdding: isAddingMaintainedBy } =
        useAddSystemEmployeeAssignment(system.uid, 'maintainedBy', {
            onSuccess: refreshSystemDetail,
        })
    const { removeEmployee: removeMaintainedBy, isRemoving: isRemovingMaintainedBy } =
        useRemoveSystemEmployeeAssignment(system.uid, 'maintainedBy', {
            onSuccess: refreshSystemDetail,
        })

    const handleSaveField = useCallback(
        async (
            fieldName: string,
            value: unknown,
            options?: { displayName?: string | null; previousValue?: unknown },
        ) => {
            if (!canEdit) return
            await updateField(system.uid, fieldName, value, options)
        },
        [canEdit, system.uid, updateField],
    )

    const operators = system.operators ?? []
    const maintainedBy = system.maintainedBy ?? []
    const showEmployeeTables = system.systemLevel !== SystemLevel.SubsystemsAndParts
    const isEmployeeMutationPending =
        isAddingOperator || isRemovingOperator || isAddingMaintainedBy || isRemovingMaintainedBy

    return (
        <div className="p-4 space-y-1">
            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.persons.responsible })}
                value={system.responsible?.uid ?? null}
                displayValue={system.responsible?.name ?? null}
                codebook={CODEBOOK.EMPLOYEE}
                onSave={(uid, displayName) =>
                    handleSaveField('responsibleUid', uid, { displayName })
                }
                isPending={isPending}
                disabled={!canEdit}
            />

            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.persons.owner })}
                value={system.owner?.uid ?? null}
                displayValue={system.owner?.name ?? null}
                codebook={CODEBOOK.EMPLOYEE}
                onSave={(uid, displayName) => handleSaveField('ownerUid', uid, { displayName })}
                isPending={isPending}
                disabled
            />

            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.fields.team })}
                value={system.responsibleTeam?.uid ?? null}
                displayValue={system.responsibleTeam?.name ?? null}
                codebook={CODEBOOK.TEAM}
                onSave={(uid, displayName) =>
                    handleSaveField('responsibleTeamUid', uid, { displayName })
                }
                isPending={isPending}
                disabled={!canEdit}
            />

            {showEmployeeTables && (
                <div className="space-y-4 pt-3">
                    <EmployeeAssignmentTable
                        className="w-full"
                        data={operators}
                        header={fm({ id: message.systemHierarchy.persons.authorizedOperators })}
                        onAdd={async employee => addOperator(employee.uid)}
                        onRemove={removeOperator}
                        isLoading={isEmployeeMutationPending}
                        canEdit={canEdit}
                    />

                    <EmployeeAssignmentTable
                        className="w-full"
                        data={maintainedBy}
                        header={fm({ id: message.systemHierarchy.persons.maintainedBy })}
                        onAdd={async employee => addMaintainedBy(employee.uid)}
                        onRemove={removeMaintainedBy}
                        isLoading={isEmployeeMutationPending}
                        canEdit={canEdit}
                    />
                </div>
            )}
        </div>
    )
}
