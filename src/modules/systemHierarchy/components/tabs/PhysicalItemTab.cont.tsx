'use client'

import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
    InlineFieldCombobox,
    InlineFieldInput,
    InlineFieldRow,
    InlineFieldTextArea,
    InlineFieldValue,
} from '@/components/ui/inline-field'
import { Separator } from '@/components/ui/separator'
import { useItemPropertiesData } from '@/hooks/useItemPropertiesData'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import { useItemFieldUpdate } from '../../hooks/mutations/useItemFieldUpdate'
import { useSystemDetail } from '../../hooks/queries/useSystemDetail'
import { useSystemEditPermission } from '../../hooks/useSystemEditPermission'
import type { SystemLeaf } from '../../types'
import { PhysicalItemProperties } from '../physical-item/PhysicalItemProperties.comp'

interface PhysicalItemTabProps {
    system: SystemLeaf
}

export const PhysicalItemTabContainer: FC<PhysicalItemTabProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const physicalItem = system.physicalItem

    const { canEdit } = useSystemEditPermission(system.uid)

    const { updateField, isPending } = useItemFieldUpdate(system.uid, {
        itemUsage: physicalItem?.itemUsage,
        conditionStatus: physicalItem?.conditionStatus,
    })

    // Re-reads the already-cached detail query to access the catalogue/service-item
    // fragments (stripped from SystemLeaf), then derives override-aware properties.
    const { physicalItem: itemDetail } = useSystemDetail(system.uid)
    const { groupedProperties, hasOverriddenProperties, hasProperties } = useItemPropertiesData({
        catalogueItem: itemDetail?.catalogueItem,
        serviceItems: itemDetail?.serviceItemsConnection?.edges,
    })

    const handleSaveField = useCallback(
        async (
            fieldName: string,
            value: unknown,
            options?: { displayName?: string | null; previousValue?: unknown },
        ) => {
            if (!canEdit || !physicalItem?.uid) return
            await updateField(physicalItem.uid, fieldName, value, options)
        },
        [canEdit, physicalItem?.uid, updateField],
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
                onSave={value =>
                    handleSaveField('serialNumber', value, {
                        previousValue: physicalItem.serialNumber,
                    })
                }
                isPending={isPending}
                disabled={!canEdit}
            />

            <InlineFieldCombobox
                label={fm({
                    id: message.systemsPage.systemDetail.form.physicalItem.itemUsage.label,
                })}
                value={physicalItem.itemUsage?.uid ?? null}
                displayValue={physicalItem.itemUsage?.name ?? null}
                codebook={CODEBOOK.ITEM_USAGE}
                onSave={(uid, displayName) =>
                    handleSaveField('itemUsageUid', uid, { displayName })
                }
                isPending={isPending}
                disabled={!canEdit}
            />

            <InlineFieldCombobox
                label={fm({
                    id: message.systemsPage.systemDetail.form.physicalItem.conditionStatus.label,
                })}
                value={physicalItem.conditionStatus?.uid ?? null}
                displayValue={physicalItem.conditionStatus?.name ?? null}
                codebook={CODEBOOK.ITEM_CONDITION_STATUS}
                onSave={(uid, displayName) =>
                    handleSaveField('conditionStatusUid', uid, { displayName })
                }
                isPending={isPending}
                disabled={!canEdit}
            />

            <InlineFieldTextArea
                label={fm({ id: message.systemsPage.systemDetail.form.physicalItem.notes.label })}
                value={physicalItem.notes ?? null}
                onSave={value =>
                    handleSaveField('notes', value, { previousValue: physicalItem.notes })
                }
                isPending={isPending}
                disabled={!canEdit}
            />

            {hasProperties && (
                <>
                    <Separator className="my-2" />
                    <PhysicalItemProperties
                        groupedProperties={groupedProperties}
                        hasOverriddenProperties={hasOverriddenProperties}
                    />
                </>
            )}
        </div>
    )
}
