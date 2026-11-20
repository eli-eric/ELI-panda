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

import { useCatalogueItemPatch } from '../../hooks/mutations/useCatalogueItemPatch'

export interface CatalogueItemForDetail {
    uid: string
    name: string
    catalogueNumber: string
    description?: string | null
    manufacturerUrl?: string | null
    lastUpdateTime?: string | null
    catalogueCategory?: { uid: string; name: string } | null
    supplier?: { uid: string; name: string } | null
}

interface Props {
    item: CatalogueItemForDetail
    canEdit: boolean
}

const toNullable = (v: unknown): string | null => {
    if (v === null || v === undefined) return null
    if (typeof v === 'string') return v === '' ? null : v
    return String(v)
}

export const CatalogueItemDetailTabContainer: FC<Props> = ({ item, canEdit }) => {
    const { openCodebookTreeModal } = useCodebookTreeModal()
    const { patchItem, isPending } = useCatalogueItemPatch(item.uid)
    const lastUpdateTime = item.lastUpdateTime ?? ''

    const saveName = useCallback(
        async (v: unknown) => {
            const next = toNullable(v)
            if (!next) return
            await patchItem({ lastUpdateTime, name: next })
        },
        [patchItem, lastUpdateTime],
    )

    const saveCatalogueNumber = useCallback(
        async (v: unknown) => {
            const next = toNullable(v)
            if (!next) return
            await patchItem({ lastUpdateTime, catalogueNumber: next })
        },
        [patchItem, lastUpdateTime],
    )

    const saveDescription = useCallback(
        async (v: unknown) => {
            await patchItem({ lastUpdateTime, description: toNullable(v) })
        },
        [patchItem, lastUpdateTime],
    )

    const saveManufacturerUrl = useCallback(
        async (v: unknown) => {
            await patchItem({ lastUpdateTime, manufacturerUrl: toNullable(v) })
        },
        [patchItem, lastUpdateTime],
    )

    const saveCategory = useCallback(
        async (uid: string | null, displayName?: string | null) => {
            if (!uid) return
            await patchItem({
                lastUpdateTime,
                category: { uid, ...(displayName ? { name: displayName } : {}) },
            })
        },
        [patchItem, lastUpdateTime],
    )

    const saveSupplier = useCallback(
        async (uid: string | null, displayName?: string | null) => {
            if (!uid) {
                await patchItem({ lastUpdateTime, supplier: null })
                return
            }
            await patchItem({
                lastUpdateTime,
                supplier: { uid, ...(displayName ? { name: displayName } : {}) },
            })
        },
        [patchItem, lastUpdateTime],
    )

    return (
        <div className="p-4 space-y-1">
            <InlineFieldInput
                label="Name"
                value={item.name}
                onSave={saveName}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldInput
                label="Part Number"
                value={item.catalogueNumber}
                onSave={saveCatalogueNumber}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldModalSelect
                label="Category"
                value={item.catalogueCategory?.uid ?? null}
                displayValue={item.catalogueCategory?.name ?? null}
                onSave={(v, displayName) => saveCategory(v, displayName)}
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
                onSave={(v, displayName) => saveSupplier(v, displayName)}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldInput
                label="Manufacturer URL"
                value={item.manufacturerUrl ?? null}
                onSave={saveManufacturerUrl}
                isPending={isPending}
                disabled={!canEdit}
            />
            <InlineFieldTextArea
                label="Description"
                value={item.description ?? null}
                onSave={saveDescription}
                isPending={isPending}
                disabled={!canEdit}
            />
        </div>
    )
}
