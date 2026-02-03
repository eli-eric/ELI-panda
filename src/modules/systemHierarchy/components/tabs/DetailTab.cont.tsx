import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { useSystemFieldUpdate } from '../../hooks/mutations/useSystemFieldUpdate'
import type { SystemLeaf } from '../../types'
import { AutoSaveInlineInput } from '../auto-save-fields/AutoSaveInlineInput'
import { AutoSaveInlineTextArea } from '../auto-save-fields/AutoSaveInlineTextArea'

interface DetailTabProps {
    system: SystemLeaf
}

export const DetailTabContainer: FC<DetailTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { updateField } = useSystemFieldUpdate()

    const handleSave = useCallback(
        async (uid: string, fieldName: string, value: unknown) => {
            await updateField(uid, fieldName, value)
        },
        [updateField],
    )

    return (
        <div className="p-4 space-y-2">
            <AutoSaveInlineInput
                uid={system.uid}
                fieldName="name"
                label={fm({ id: message.systemHierarchy.fields.name })}
                value={system.name}
                onSave={handleSave}
            />
            <AutoSaveInlineInput
                uid={system.uid}
                fieldName="systemCode"
                label={fm({ id: message.systemHierarchy.fields.systemCode })}
                value={system.systemCode ?? null}
                disabled
                onSave={handleSave}
            />
            <AutoSaveInlineInput
                uid={system.uid}
                fieldName="systemLevel"
                label={fm({ id: message.systemHierarchy.fields.systemLevel })}
                value={system.systemLevel ?? null}
                disabled
                onSave={handleSave}
            />
            <AutoSaveInlineTextArea
                uid={system.uid}
                fieldName="description"
                label={fm({ id: message.systemHierarchy.fields.description })}
                value={system.description ?? null}
                onSave={handleSave}
            />
        </div>
    )
}
