import type { FC } from 'react'
import { useCallback } from 'react'

import { InlineFieldInput, InlineFieldModalSelect } from '@/components/ui/inline-field'
import { useSystemTypeSelectionModal } from '@/modules/shared/form/systemType/hooks/useSystemTypeSelectionModal'

import { useCatalogueCategoryFieldUpdate } from '../../hooks/mutations/useCatalogueCategoryFieldUpdate'
import { toCategoryCode } from '../../utils/toCategoryCode'

export interface CatalogueCategoryForDetail {
    uid: string
    name: string
    code: string
    systemType?: { uid: string; name: string } | null
}

interface Props {
    category: CatalogueCategoryForDetail
    canEdit: boolean
}

export const CategoryDetailTabContainer: FC<Props> = ({ category, canEdit }) => {
    const { openSystemTypeModal } = useSystemTypeSelectionModal()

    const { updateField, isPending } = useCatalogueCategoryFieldUpdate({
        name: category.name,
        code: category.code,
        systemType: category.systemType,
    })

    const saveName = useCallback(
        async (value: unknown) => {
            const newName = typeof value === 'string' ? value : String(value ?? '')
            const newCode = toCategoryCode(newName)
            await updateField(category.uid, 'name', newName, {
                previousValue: category.name,
                extraScalars: {
                    code: { value: newCode, previousValue: category.code },
                },
            })
        },
        [category.uid, category.name, category.code, updateField],
    )

    const saveRelation = useCallback(
        async (field: string, value: string | null, displayName?: string | null) => {
            await updateField(category.uid, field, value, { displayName })
        },
        [category.uid, updateField],
    )

    return (
        <div className="p-4 space-y-1">
            <InlineFieldInput
                label="Name"
                value={category.name}
                onSave={saveName}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldInput
                label="Code"
                value={category.code}
                onSave={() => Promise.resolve()}
                isPending={isPending}
                disabled
            />
            <InlineFieldModalSelect
                label="System Type"
                value={category.systemType?.uid ?? null}
                displayValue={category.systemType?.name ?? null}
                onSave={(v, displayName) => saveRelation('systemTypeUid', v, displayName)}
                isPending={isPending}
                disabled={!canEdit}
                onOpenModal={onSelect => openSystemTypeModal(onSelect)}
            />
        </div>
    )
}
