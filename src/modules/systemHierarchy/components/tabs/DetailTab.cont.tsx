'use client'

import { Wand2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
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

interface DetailTabProps {
    system: SystemLeaf
}

const SYSTEM_LEVEL_OPTIONS = [
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
        async (fieldName: string, value: unknown) => {
            await updateField(system.uid, fieldName, value)
        },
        [system.uid, updateField],
    )

    const handleGenerateCode = useCallback(() => {
        // TODO: Implement code generation logic
    }, [])

    return (
        <div className="p-4 space-y-1">
            <InlineFieldInput
                label={fm({ id: message.systemHierarchy.fields.name })}
                value={system.name}
                onSave={(value) => handleSaveField('name', value)}
                isPending={isPending}
            />

            <InlineFieldInput
                label={fm({ id: message.systemHierarchy.fields.systemCode })}
                value={system.systemCode ?? null}
                onSave={(value) => handleSaveField('systemCode', value)}
                isPending={isPending}
                rightAction={
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateCode}
                        className="shrink-0"
                    >
                        <Wand2 className="size-4 mr-1" />
                        {fm({ id: message.common.buttons.generate })}
                    </Button>
                }
            />

            <InlineFieldSelect
                label={fm({ id: message.systemHierarchy.fields.systemLevel })}
                value={system.systemLevel ?? null}
                options={SYSTEM_LEVEL_OPTIONS}
                onSave={(value) => handleSaveField('systemLevel', value)}
                isPending={isPending}
            />

            <InlineFieldModalSelect
                label={fm({ id: message.systemHierarchy.fields.systemType })}
                value={system.systemType?.uid ?? null}
                displayValue={system.systemType?.name ?? null}
                onOpenModal={(onSelect) => openSystemTypeModal(onSelect)}
                onSave={(uid) => handleSaveField('systemTypeUid', uid)}
                isPending={isPending}
            />

            <InlineFieldModalSelect
                label={fm({ id: message.systemHierarchy.fields.location })}
                value={system.location?.uid ?? null}
                displayValue={system.location?.name ?? null}
                onOpenModal={(onSelect) => openLocationModal(onSelect)}
                onSave={(uid) => handleSaveField('locationUid', uid)}
                isPending={isPending}
            />

            <InlineFieldCombobox
                label={fm({ id: message.systemHierarchy.fields.zone })}
                value={system.zone?.uid ?? null}
                displayValue={system.zone?.name ?? null}
                codebook={CODEBOOK.ZONE}
                onSave={(uid) => handleSaveField('zoneUid', uid)}
                isPending={isPending}
            />

            <InlineFieldTextArea
                label={fm({ id: message.systemHierarchy.fields.description })}
                value={system.description ?? null}
                onSave={(value) => handleSaveField('description', value)}
                isPending={isPending}
            />
        </div>
    )
}
