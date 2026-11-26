'use client'

import type { FC } from 'react'
import { useIntl } from 'react-intl'

import {
    InlineFieldCombobox,
    InlineFieldInput,
    InlineFieldRow,
    InlineFieldTextArea,
    InlineFieldValue,
} from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { toNullableText, toUidRef, useSystemFieldSave } from '../hooks/useSystemFieldSave'
import type { SystemDetail, SystemDetailPhysicalItem } from '../types'

const itemForm = message.systemsPage.systemDetail.form.physicalItem

interface PhysicalItemFieldsProps {
    systemUid: SystemDetail['uid']
    physicalItem: SystemDetailPhysicalItem
}

/** EUN + part number (read-only), serial, usage, condition, notes (inline PATCH). */
export const PhysicalItemFields: FC<PhysicalItemFieldsProps> = ({ systemUid, physicalItem }) => {
    const { formatMessage: fm } = useIntl()
    const { savePhysicalItem, readOnly, isPending } = useSystemFieldSave(systemUid)

    return (
        <>
            <InlineFieldRow label={fm({ id: itemForm.eun.label })} disabled>
                <InlineFieldValue value={physicalItem.eun} disabled />
            </InlineFieldRow>
            <InlineFieldRow label={fm({ id: itemForm.partNumber.label })} disabled>
                <InlineFieldValue
                    value={physicalItem.catalogueItem?.catalogueNumber ?? null}
                    disabled
                />
            </InlineFieldRow>
            <InlineFieldInput
                label={fm({ id: itemForm.serialNumber.label })}
                value={physicalItem.serialNumber}
                onSave={value => savePhysicalItem({ serialNumber: toNullableText(value) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldCombobox
                label={fm({ id: itemForm.itemUsage.label })}
                value={physicalItem.itemUsage?.uid ?? null}
                displayValue={physicalItem.itemUsage?.name ?? null}
                codebook={CODEBOOK.ITEM_USAGE}
                onSave={uid => savePhysicalItem({ itemUsage: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldCombobox
                label={fm({ id: itemForm.conditionStatus.label })}
                value={physicalItem.conditionStatus?.uid ?? null}
                displayValue={physicalItem.conditionStatus?.name ?? null}
                codebook={CODEBOOK.ITEM_CONDITION_STATUS}
                onSave={uid => savePhysicalItem({ conditionStatus: toUidRef(uid) })}
                isPending={isPending}
                disabled={readOnly}
            />
            <InlineFieldTextArea
                label={fm({ id: itemForm.notes.label })}
                value={physicalItem.notes}
                onSave={value => savePhysicalItem({ notes: toNullableText(value) })}
                isPending={isPending}
                disabled={readOnly}
            />
        </>
    )
}
