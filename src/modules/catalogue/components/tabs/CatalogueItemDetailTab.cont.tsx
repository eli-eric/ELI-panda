import type { FC } from 'react'
import { useCallback } from 'react'

import { useCodebookTreeModal } from '@/components/form/shared/hooks/useCodebookTreeModal'
import {
    InlineFieldCombobox,
    InlineFieldInput,
    InlineFieldModalSelect,
    InlineFieldTextArea,
} from '@/components/ui/inline-field'
import { CODEBOOK } from '@/types/constants/codebook'

import { useCatalogueItemFieldUpdate } from '../../hooks/mutations/useCatalogueItemFieldUpdate'

export interface CatalogueItemForDetail {
    uid: string
    name: string
    catalogueNumber: string
    description?: string | null
    manufacturerUrl?: string | null
    catalogueCategory?: { uid: string; name: string } | null
    supplier?: { uid: string; name: string } | null
}

interface Props {
    item: CatalogueItemForDetail
    canEdit: boolean
}

export const CatalogueItemDetailTabContainer: FC<Props> = ({ item, canEdit }) => {
    const { openCodebookTreeModal } = useCodebookTreeModal()

    const { updateField, isPending } = useCatalogueItemFieldUpdate({
        name: item.name,
        catalogueNumber: item.catalogueNumber,
        description: item.description ?? null,
        manufacturerUrl: item.manufacturerUrl ?? null,
        catalogueCategory: item.catalogueCategory,
        supplier: item.supplier,
    })

    const saveScalar = useCallback(
        async (field: string, value: unknown, previousValue: unknown) => {
            await updateField(item.uid, field, value, { previousValue })
        },
        [item.uid, updateField],
    )

    const saveRelation = useCallback(
        async (field: string, value: string | null, displayName?: string | null) => {
            await updateField(item.uid, field, value, { displayName })
        },
        [item.uid, updateField],
    )

    return (
        <div className="p-4 space-y-1">
            <InlineFieldInput
                label="Name"
                value={item.name}
                onSave={v => saveScalar('name', v, item.name)}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldInput
                label="Part Number"
                value={item.catalogueNumber}
                onSave={v => saveScalar('catalogueNumber', v, item.catalogueNumber)}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldModalSelect
                label="Category"
                value={item.catalogueCategory?.uid ?? null}
                displayValue={item.catalogueCategory?.name ?? null}
                onSave={(v, displayName) => saveRelation('categoryUid', v, displayName)}
                isPending={isPending}
                disabled={!canEdit}
                onOpenModal={onSelect => {
                    openCodebookTreeModal({
                        codebook: CODEBOOK.CATALOGUE_CATEGORY,
                        name: 'catalogueCategory',
                        title: 'Select Category',
                        onSubmit: selected => {
                            if (selected?.uid) {
                                onSelect({ uid: selected.uid, name: selected.name })
                            }
                        },
                    })
                }}
            />
            <InlineFieldCombobox
                label="Supplier"
                value={item.supplier?.uid ?? null}
                displayValue={item.supplier?.name ?? null}
                codebook={CODEBOOK.SUPPLIER}
                onSave={(v, displayName) => saveRelation('supplierUid', v, displayName)}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldInput
                label="Manufacturer URL"
                value={item.manufacturerUrl ?? null}
                onSave={v => saveScalar('manufacturerUrl', v, item.manufacturerUrl ?? null)}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldTextArea
                label="Description"
                value={item.description ?? null}
                onSave={v => saveScalar('description', v, item.description ?? null)}
                isPending={isPending}
                disabled={!canEdit}
            />
        </div>
    )
}
