'use client'

import { ArrowRight, Plus } from 'lucide-react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
    InlineFieldAction,
    InlineFieldCombobox,
    InlineFieldInput,
    InlineFieldRow,
    InlineFieldTextArea,
    InlineFieldValue,
} from '@/components/ui/inline-field'
import { message } from '@/i18n/src/messages'
import { openItemAssignModal } from '@/modules/shared/form/itemAssign/item-assign.modal'
import { openItemMoveModal } from '@/modules/shared/form/itemMoving/item-move.modal'
import { CODEBOOK } from '@/types/constants/codebook'

import { useItemFieldUpdate } from '../../hooks/mutations/useItemFieldUpdate'
import type { SystemLeaf } from '../../types'

interface PhysicalItemTabProps {
    system: SystemLeaf
}

export const PhysicalItemTabContainer: FC<PhysicalItemTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const physicalItem = system.physicalItem

    const { updateField, isPending } = useItemFieldUpdate({
        itemUsage: physicalItem?.itemUsage,
        conditionStatus: physicalItem?.conditionStatus,
    })

    const handleSaveField = useCallback(
        async (fieldName: string, value: unknown) => {
            if (!physicalItem?.uid) return
            await updateField(physicalItem.uid, fieldName, value)
        },
        [physicalItem?.uid, updateField],
    )

    if (!physicalItem) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                {fm({ id: message.systemHierarchy.physicalItem.noItem })}
            </div>
        )
    }

    return (
        <div className="p-4 space-y-1">
            <InlineFieldRow
                label={fm({ id: message.systemsPage.systemDetail.form.physicalItem.eun.label })}
                disabled
            >
                <InlineFieldValue value={physicalItem.eun ?? null} disabled />
            </InlineFieldRow>

            <InlineFieldRow
                label={fm({
                    id: message.systemsPage.systemDetail.form.physicalItem.partNumber.label,
                })}
                disabled
            >
                <InlineFieldValue value={physicalItem.catalogueNumber ?? null} disabled />
            </InlineFieldRow>

            <InlineFieldInput
                label={fm({
                    id: message.systemsPage.systemDetail.form.physicalItem.serialNumber.label,
                })}
                value={physicalItem.serialNumber ?? null}
                onSave={value => handleSaveField('serialNumber', value)}
                isPending={isPending}
            />

            <InlineFieldCombobox
                label={fm({
                    id: message.systemsPage.systemDetail.form.physicalItem.itemUsage.label,
                })}
                value={physicalItem.itemUsage?.uid ?? null}
                displayValue={physicalItem.itemUsage?.name ?? null}
                codebook={CODEBOOK.ITEM_USAGE}
                onSave={uid => handleSaveField('itemUsageUid', uid)}
                isPending={isPending}
            />

            <InlineFieldCombobox
                label={fm({
                    id: message.systemsPage.systemDetail.form.physicalItem.conditionStatus.label,
                })}
                value={physicalItem.conditionStatus?.uid ?? null}
                displayValue={physicalItem.conditionStatus?.name ?? null}
                codebook={CODEBOOK.ITEM_CONDITION_STATUS}
                onSave={uid => handleSaveField('conditionStatusUid', uid)}
                isPending={isPending}
            />

            <InlineFieldTextArea
                label={fm({ id: message.systemsPage.systemDetail.form.physicalItem.notes.label })}
                value={physicalItem.notes ?? null}
                onSave={value => handleSaveField('notes', value)}
                isPending={isPending}
            />

            <div className="pt-4 border-t mt-4">
                <InlineFieldAction
                    label={fm({ id: message.systemHierarchy.detail.moveItem })}
                    buttonLabel={fm({ id: message.systemHierarchy.detail.moveItem })}
                    onClick={openItemMoveModal}
                    icon={ArrowRight}
                />

                <InlineFieldAction
                    label={fm({ id: message.systemHierarchy.detail.assignItem })}
                    buttonLabel={fm({ id: message.systemHierarchy.detail.assignItem })}
                    onClick={openItemAssignModal}
                    icon={Plus}
                />
            </div>
        </div>
    )
}
