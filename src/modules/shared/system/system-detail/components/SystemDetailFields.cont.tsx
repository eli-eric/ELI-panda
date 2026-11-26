'use client'

import type { FC } from 'react'
import { useMemo } from 'react'
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
import { isSystemLevel, SYSTEM_LEVELS } from '@/types/constants/systemLevel'

import { toNullableText, toUidRef, useSystemFieldSave } from '../hooks/useSystemFieldSave'
import type { SystemDetail } from '../types'
import { SystemCodeActions } from './SystemCodeActions.cont'

interface SystemFieldProps {
    system: SystemDetail
    className?: string
}

const fields = message.systemHierarchy.fields

const rejectEmptyName = () => Promise.reject(new Error('System name cannot be empty'))

export const SystemNameField: FC<SystemFieldProps> = ({ system, className }) => {
    const { formatMessage: fm } = useIntl()
    const { saveSystem, readOnly, isPending } = useSystemFieldSave(system.uid)

    return (
        <InlineFieldInput
            label={fm({ id: fields.name })}
            value={system.name}
            onSave={value => {
                const name = value.trim()
                return name ? saveSystem({ name }) : rejectEmptyName()
            }}
            isPending={isPending}
            disabled={readOnly}
            className={className}
        />
    )
}

export const SystemDescriptionField: FC<SystemFieldProps> = ({ system, className }) => {
    const { formatMessage: fm } = useIntl()
    const { saveSystem, readOnly, isPending } = useSystemFieldSave(system.uid)

    return (
        <InlineFieldTextArea
            label={fm({ id: fields.description })}
            value={system.description}
            onSave={value => saveSystem({ description: toNullableText(value) })}
            isPending={isPending}
            disabled={readOnly}
            className={className}
        />
    )
}

/** System code (with generate / release), level, type, location, zone. */
export const SystemClassificationFields: FC<SystemFieldProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const { saveSystem, readOnly, isPending } = useSystemFieldSave(system.uid)
    const { openLocationModal } = useLocationSelectionModal()
    const { openSystemTypeModal } = useSystemTypeSelectionModal()

    const levelOptions = useMemo(
        () =>
            SYSTEM_LEVELS.map(level => ({
                value: level,
                label: fm({ id: message.systemHierarchy.systemLevels[level] }),
            })),
        [fm],
    )

    return (
        <>
            <InlineFieldInput
                label={fm({ id: fields.systemCode })}
                value={system.systemCode}
                onSave={value => saveSystem({ systemCode: toNullableText(value) })}
                isPending={isPending}
                disabled={readOnly}
                rightAction={<SystemCodeActions system={system} disabled={readOnly || isPending} />}
            />
            <InlineFieldSelect
                label={fm({ id: fields.systemLevel })}
                value={system.systemLevel}
                options={levelOptions}
                onSave={value => saveSystem({ systemLevel: isSystemLevel(value) ? value : null })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldModalSelect
                label={fm({ id: fields.systemType })}
                value={system.systemType?.uid ?? null}
                displayValue={system.systemType?.name ?? null}
                onOpenModal={onSelect => openSystemTypeModal(onSelect)}
                onSave={uid => saveSystem({ systemType: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldModalSelect
                label={fm({ id: fields.location })}
                value={system.location?.uid ?? null}
                displayValue={system.location?.name ?? null}
                onOpenModal={onSelect => openLocationModal(onSelect)}
                onSave={uid => saveSystem({ location: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldCombobox
                label={fm({ id: fields.zone })}
                value={system.zone?.uid ?? null}
                displayValue={system.zone?.name ?? null}
                codebook={CODEBOOK.ZONE}
                onSave={uid => saveSystem({ zone: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
        </>
    )
}
