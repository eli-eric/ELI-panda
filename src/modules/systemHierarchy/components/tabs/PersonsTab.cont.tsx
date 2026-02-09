'use client'

import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { InlineFieldCombobox } from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import type { SystemLeaf } from '../../types'

interface PersonsTabProps {
    system: SystemLeaf
}

export const PersonsTabContainer: FC<PersonsTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    // Pass current system for relationship disconnect
    const { updateField, isPending } = useSystemFieldUpdate({
        responsible: system.responsible,
        owner: system.owner,
        responsibleTeam: system.responsibleTeam,
    })

    const handleSaveField = useCallback(
        async (fieldName: string, value: unknown) => {
            await updateField(system.uid, fieldName, value)
        },
        [system.uid, updateField],
    )

    return (
        <div className="p-4 space-y-1">
            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.persons.responsible })}
                value={system.responsible?.uid ?? null}
                displayValue={system.responsible?.name ?? null}
                codebook={CODEBOOK.EMPLOYEE}
                onSave={uid => handleSaveField('responsibleUid', uid)}
                isPending={isPending}
            />

            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.persons.owner })}
                value={system.owner?.uid ?? null}
                displayValue={system.owner?.name ?? null}
                codebook={CODEBOOK.EMPLOYEE}
                onSave={uid => handleSaveField('ownerUid', uid)}
                isPending={isPending}
                disabled
            />

            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.fields.team })}
                value={system.responsibleTeam?.uid ?? null}
                displayValue={system.responsibleTeam?.name ?? null}
                codebook={CODEBOOK.TEAM}
                onSave={uid => handleSaveField('responsibleTeamUid', uid)}
                isPending={isPending}
            />
        </div>
    )
}
