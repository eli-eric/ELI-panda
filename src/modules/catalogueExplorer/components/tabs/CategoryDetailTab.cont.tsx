import type { FC } from 'react'
import { useCallback } from 'react'

import { InlineFieldInput, InlineFieldModalSelect } from '@/components/ui/inline-field'
import { useSystemTypeSelectionModal } from '@/modules/shared/form/systemType/hooks/useSystemTypeSelectionModal'

import { useCatalogueCategoryPatch } from '../../hooks/mutations/useCatalogueCategoryPatch'
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
    const { patchCategory, isPending } = useCatalogueCategoryPatch(category.uid)

    const saveName = useCallback(
        async (value: unknown) => {
            const newName = typeof value === 'string' ? value : String(value ?? '')
            if (!newName.trim()) return
            await patchCategory({ name: newName, code: toCategoryCode(newName) })
        },
        [patchCategory],
    )

    const saveSystemType = useCallback(
        async (uid: string | null, displayName?: string | null) => {
            if (!uid) {
                await patchCategory({ systemType: null })
                return
            }
            await patchCategory({
                systemType: { uid, ...(displayName ? { name: displayName } : {}) },
            })
        },
        [patchCategory],
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
                onSave={(v, displayName) => saveSystemType(v, displayName)}
                isPending={isPending}
                disabled={!canEdit}
                onOpenModal={onSelect => openSystemTypeModal(onSelect)}
            />
        </div>
    )
}
