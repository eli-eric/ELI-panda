'use client'

import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
    InlineFieldCombobox,
    InlineFieldInput,
    InlineFieldModalSelect,
    InlineFieldSelect,
    InlineFieldTextArea,
} from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'
import { useLocationSelectionModal } from '@/modules/shared/form/location/hooks/useLocationSelectionModal'
import { useSystemTypeSelectionModal } from '@/modules/shared/form/systemType/hooks/useSystemTypeSelectionModal'
import { CODEBOOK } from '@/types/constants/codebook'
import { SystemLevel } from '@/types/gql/graphql'

import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import type { SystemLeaf } from '../../types'
import { SystemCodeActions } from './SystemCodeActions.comp'

interface DetailTabProps {
    system: SystemLeaf
}

const SYSTEM_LEVEL_OPTIONS = [
    { value: SystemLevel.SystemDomain, label: 'System Domain' },
    { value: SystemLevel.KeySystems, label: 'Key Systems' },
    { value: SystemLevel.TechnologyUnit, label: 'Technology Unit' },
    { value: SystemLevel.SubsystemsAndParts, label: 'Subsystems and Parts' },
    { value: SystemLevel.Trash, label: 'Trash' },
]

export const DetailTabContainer: FC<DetailTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    // Pass current system for relationship disconnect
    const { updateField, isPending } = useSystemFieldUpdate({
        location: system.location,
        zone: system.zone,
        systemType: system.systemType,
    })
    const { openLocationModal } = useLocationSelectionModal()
    const { openSystemTypeModal } = useSystemTypeSelectionModal()

    const handleSaveField = useCallback(
        async (
            fieldName: string,
            value: unknown,
            options?: { displayName?: string | null; previousValue?: unknown },
        ) => {
            await updateField(system.uid, fieldName, value, options)
        },
        [system.uid, updateField],
    )

    return (
        <div className="p-4 space-y-1">
            <InlineFieldInput
                label={fm({ id: message.systemHierarchy.fields.name })}
                value={system.name}
                onSave={value => handleSaveField('name', value, { previousValue: system.name })}
                isPending={isPending}
            />

            <InlineFieldInput
                label={fm({ id: message.systemHierarchy.fields.systemCode })}
                value={system.systemCode ?? null}
                onSave={value =>
                    handleSaveField('systemCode', value, { previousValue: system.systemCode })
                }
                isPending={isPending}
                rightAction={<SystemCodeActions system={system} disabled={isPending} />}
            />

            <InlineFieldSelect
                label={fm({ id: message.systemHierarchy.fields.systemLevel })}
                value={system.systemLevel ?? null}
                options={SYSTEM_LEVEL_OPTIONS}
                onSave={value =>
                    handleSaveField('systemLevel', value, { previousValue: system.systemLevel })
                }
                isPending={isPending}
            />

            <InlineFieldModalSelect
                label={fm({ id: message.systemHierarchy.fields.systemType })}
                value={system.systemType?.uid ?? null}
                displayValue={system.systemType?.name ?? null}
                onOpenModal={onSelect => openSystemTypeModal(onSelect)}
                onSave={(uid, displayName) =>
                    handleSaveField('systemTypeUid', uid, { displayName })
                }
                isPending={isPending}
            />

            <InlineFieldModalSelect
                label={fm({ id: message.systemHierarchy.fields.location })}
                value={system.location?.uid ?? null}
                displayValue={system.location?.name ?? null}
                onOpenModal={onSelect => openLocationModal(onSelect)}
                onSave={(uid, displayName) => handleSaveField('locationUid', uid, { displayName })}
                isPending={isPending}
            />

            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.fields.zone })}
                value={system.zone?.uid ?? null}
                displayValue={system.zone?.name ?? null}
                codebook={CODEBOOK.ZONE}
                onSave={(uid, displayName) => handleSaveField('zoneUid', uid, { displayName })}
                isPending={isPending}
            />

            <InlineFieldTextArea
                label={fm({ id: message.systemHierarchy.fields.description })}
                value={system.description ?? null}
                onSave={value =>
                    handleSaveField('description', value, { previousValue: system.description })
                }
                isPending={isPending}
            />
        </div>
    )
}
