'use client'

import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { InlineFieldCombobox, InlineFieldList } from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'
import type { EmployeeAssignment } from '@/modules/shared/system/employee-assignment'
import { useEmployeeAssignmentModal } from '@/modules/shared/system/employee-assignment'
import { CODEBOOK } from '@/types/constants/codebook'
import { SystemLevel } from '@/types/constants/systemLevel'

import { toUidRef, useSystemFieldSave } from '../hooks/useSystemFieldSave'
import type { EmployeeRef, SystemDetail } from '../types'

const persons = message.systemHierarchy.persons

type EmployeeListField = 'operators' | 'maintainedBy'

// Operators / maintainers are tracked on assemblies, not on individual parts.
export const hasEmployeeAssignments = (system: Pick<SystemDetail, 'systemLevel'>) =>
    system.systemLevel !== SystemLevel.SubsystemsAndParts

const toUidRefs = (employees: EmployeeRef[]) => employees.map(({ uid }) => ({ uid }))

interface EmployeeListFieldProps {
    system: SystemDetail
    field: EmployeeListField
    label: string
}

/** Full-replace list editing — the PATCH body always carries the whole list. */
const EmployeeListFieldContainer: FC<EmployeeListFieldProps> = ({ system, field, label }) => {
    const { saveSystem, readOnly, isPending } = useSystemFieldSave(system.uid)
    const current = system[field]

    const handleAdd = useCallback(
        (employee: EmployeeAssignment) =>
            saveSystem({ [field]: [...toUidRefs(current), { uid: employee.uid }] }),
        [current, field, saveSystem],
    )

    const openEmployeeModal = useEmployeeAssignmentModal({
        existingEmployeeUids: current.map(employee => employee.uid),
        onEmployeeSelected: handleAdd,
        title: label,
    })

    const handleRemove = useCallback(
        (uid: string) =>
            saveSystem({ [field]: toUidRefs(current.filter(employee => employee.uid !== uid)) }),
        [current, field, saveSystem],
    )

    return (
        <InlineFieldList
            label={label}
            items={current.map(employee => ({ ...employee }))}
            onAdd={openEmployeeModal}
            onRemove={handleRemove}
            isPending={isPending}
            disabled={readOnly}
        />
    )
}

interface SystemPeopleFieldsProps {
    system: SystemDetail
}

/** Responsible person, team, owner (read-only) and — for assemblies — operators / maintainers. */
export const SystemPeopleFields: FC<SystemPeopleFieldsProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { saveSystem, readOnly, isPending } = useSystemFieldSave(system.uid)

    return (
        <>
            <InlineFieldCombobox
                label={fm({ id: persons.responsible })}
                value={system.responsible?.uid ?? null}
                displayValue={system.responsible?.name ?? null}
                codebook={CODEBOOK.EMPLOYEE}
                onSave={uid => saveSystem({ responsible: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.fields.team })}
                value={system.responsibleTeam?.uid ?? null}
                displayValue={system.responsibleTeam?.name ?? null}
                codebook={CODEBOOK.TEAM}
                onSave={uid => saveSystem({ responsibleTeam: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldCombobox
                label={fm({ id: persons.owner })}
                value={system.owner?.uid ?? null}
                displayValue={system.owner?.name ?? null}
                codebook={CODEBOOK.EMPLOYEE}
                onSave={uid => saveSystem({ owner: toUidRef(uid) })}
                isPending={isPending}
                // read-only, as before the REST migration (no owner edit flow yet)
                disabled
            />
            {hasEmployeeAssignments(system) && (
                <>
                    <EmployeeListFieldContainer
                        system={system}
                        field="operators"
                        label={fm({ id: persons.authorizedOperators })}
                    />
                    <EmployeeListFieldContainer
                        system={system}
                        field="maintainedBy"
                        label={fm({ id: persons.maintainedBy })}
                    />
                </>
            )}
        </>
    )
}
