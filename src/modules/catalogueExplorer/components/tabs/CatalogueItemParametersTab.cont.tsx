import type { FC } from 'react'
import { useCallback, useMemo } from 'react'

import { InlineFieldInput, InlineFieldSelect } from '@/components/ui/inline-field'
import { useCatalogueItem } from '@/modules/catalogueItem/hooks/useItem'
import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

import { useCatalogueItemPatch } from '../../hooks/mutations/useCatalogueItemPatch'
import { parseRange } from '../../utils/formatPropertyValue'

interface Props {
    itemUid: string
    lastUpdateTime: string
    canEdit: boolean
}

const booleanOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
]

interface RowProps {
    detail: CatalogueItemDetail
    canEdit: boolean
    isPending: boolean
    onSave: (value: unknown) => Promise<void> | void
}

const PropertyRow: FC<RowProps> = ({ detail, canEdit, isPending, onSave }) => {
    const typeUid = detail.property.type?.uid
    const unit = detail.property.unit?.name
    const label = unit ? `${detail.property.name} [${unit}]` : detail.property.name

    if (typeUid === PROPERTY_TYPE.LIST) {
        const options = (detail.property.listOfValues ?? []).map(v => ({ value: v, label: v }))
        return (
            <InlineFieldSelect
                label={label}
                value={detail.value != null ? String(detail.value) : null}
                options={options}
                isPending={isPending}
                disabled={!canEdit}
                onSave={async v => {
                    await onSave(v)
                }}
            />
        )
    }

    if (typeUid === PROPERTY_TYPE.BOOLEAN) {
        return (
            <InlineFieldSelect
                label={label}
                value={detail.value != null ? String(detail.value) : null}
                options={booleanOptions}
                isPending={isPending}
                disabled={!canEdit}
                onSave={async v => {
                    await onSave(v)
                }}
            />
        )
    }

    if (typeUid === PROPERTY_TYPE.RANGE) {
        const { from, to } = parseRange(detail.value)
        return (
            <div className="grid grid-cols-2 gap-2">
                <InlineFieldInput
                    label={`${detail.property.name} (from)`}
                    value={from}
                    isPending={isPending}
                    disabled={!canEdit}
                    onSave={async v => {
                        await onSave(JSON.stringify({ from: v ?? '', to }))
                    }}
                />
                <InlineFieldInput
                    label={`${detail.property.name} (to)`}
                    value={to}
                    isPending={isPending}
                    disabled={!canEdit}
                    onSave={async v => {
                        await onSave(JSON.stringify({ from, to: v ?? '' }))
                    }}
                />
            </div>
        )
    }

    const numeric = typeUid === PROPERTY_TYPE.NUMBER
    return (
        <InlineFieldInput
            label={label}
            value={detail.value != null ? String(detail.value) : null}
            type={numeric ? 'number' : undefined}
            isPending={isPending}
            disabled={!canEdit}
            onSave={async v => {
                await onSave(v)
            }}
        />
    )
}

export const CatalogueItemParametersTab: FC<Props> = ({ itemUid, lastUpdateTime, canEdit }) => {
    const { item } = useCatalogueItem(itemUid)
    const { catalogueCategoryProperties } = useCategoryProperties(item?.category?.uid ?? undefined)
    const { patchDetail, isPending } = useCatalogueItemPatch(itemUid)

    const rows = useMemo(() => {
        const schema = catalogueCategoryProperties ?? []
        const values = new Map<string, CatalogueItemDetail>()
        item?.details?.forEach(d => {
            if (d.property?.uid) values.set(d.property.uid, d)
        })
        return schema.map(schemaDetail => {
            const existing = values.get(schemaDetail.property.uid)
            return {
                property: schemaDetail.property,
                propertyGroup: schemaDetail.propertyGroup,
                value: existing?.value ?? '',
            } as CatalogueItemDetail
        })
    }, [catalogueCategoryProperties, item])

    const grouped = useMemo(() => {
        const map = new Map<string, CatalogueItemDetail[]>()
        rows.forEach(row => {
            const key = row.propertyGroup || 'Other'
            if (!map.has(key)) map.set(key, [])
            map.get(key)!.push(row)
        })
        return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
    }, [rows])

    const handleSave = useCallback(
        (detail: CatalogueItemDetail) => async (value: unknown) => {
            await patchDetail(
                {
                    property: { uid: detail.property.uid },
                    propertyGroup: detail.propertyGroup,
                    value: value as string | number | boolean | null,
                },
                lastUpdateTime,
            )
        },
        [patchDetail, lastUpdateTime],
    )

    if (!item) {
        return <div className="p-4 text-sm text-muted-foreground">Loading parameters…</div>
    }

    if (rows.length === 0) {
        return (
            <div className="p-4 text-sm text-muted-foreground">
                No parameters defined for this category.
            </div>
        )
    }

    return (
        <div className="p-4 space-y-6">
            {grouped.map(([groupName, details]) => (
                <section key={groupName} className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {groupName}
                    </h3>
                    <div className="space-y-1">
                        {details.map(detail => (
                            <PropertyRow
                                key={detail.property.uid}
                                detail={detail}
                                canEdit={canEdit}
                                isPending={isPending}
                                onSave={handleSave(detail)}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}
