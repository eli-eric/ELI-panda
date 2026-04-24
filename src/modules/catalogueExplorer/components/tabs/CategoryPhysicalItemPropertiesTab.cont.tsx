import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

import {
    type CreatePhysicalPropertyBody,
    useCategoryPhysicalPropertyMutations,
} from '../../hooks/mutations/useCategoryPhysicalPropertyMutations'
import type { CategoryProperty } from '../../hooks/mutations/useCategoryPropertyMutations'
import type { CatalogueCategoryProperty } from '../../types'
import { PropertyRow } from './groups/PropertyRow.comp'

interface Props {
    categoryUid: string
    properties: CatalogueCategoryProperty[]
    canEdit: boolean
}

const toCategoryProperty = (p: CatalogueCategoryProperty): CategoryProperty => ({
    uid: p.uid ?? '',
    name: p.name,
    type: p.type ? { uid: p.type.uid, name: p.type.name } : null,
    unit: p.unit ? { uid: p.unit.uid, name: p.unit.name } : null,
    defaultValue: p.defaultValue ?? null,
    listOfValues: p.listOfValues ?? null,
    order: (p as { order?: number }).order,
})

export const CategoryPhysicalItemPropertiesTab: FC<Props> = ({
    categoryUid,
    properties,
    canEdit,
}) => {
    const { formatMessage: fm } = useIntl()
    const {
        createPhysicalProperty,
        updatePhysicalProperty,
        deletePhysicalProperty,
        isPending,
    } = useCategoryPhysicalPropertyMutations(categoryUid)

    const sorted = useMemo(
        () =>
            [...properties]
                .map(toCategoryProperty)
                .sort((a, b) => {
                    const oa = a.order ?? 0
                    const ob = b.order ?? 0
                    if (oa !== ob) return oa - ob
                    return a.name.localeCompare(b.name)
                }),
        [properties],
    )

    const handleMove = (index: number, direction: -1 | 1) => {
        const target = sorted[index + direction]
        const current = sorted[index]
        if (!target || !current) return
        const newOrder = (target.order ?? (index + 1 + direction) * 10) + direction * -1
        void updatePhysicalProperty(current.uid, { order: newOrder })
    }

    return (
        <div className="p-4 space-y-2 text-sm">
            {sorted.length === 0 && (
                <div className="text-muted-foreground text-xs">
                    {fm({ id: message.catalogue.category.physicalProperties })}
                </div>
            )}
            {sorted.map((p, i) => (
                <PropertyRow
                    key={p.uid || `phys-${i}`}
                    property={p}
                    canEdit={canEdit}
                    isPending={isPending}
                    onUpdate={patch => {
                        // Physical property doesn't support groupUid — strip it
                        const { groupUid: _ignored, ...rest } = patch
                        void _ignored
                        return updatePhysicalProperty(p.uid, rest)
                    }}
                    onDelete={() => deletePhysicalProperty(p.uid)}
                    onMoveUp={() => handleMove(i, -1)}
                    onMoveDown={() => handleMove(i, 1)}
                    canMoveUp={i > 0}
                    canMoveDown={i < sorted.length - 1}
                />
            ))}
            {canEdit && (
                <AddPhysicalPropertyRow
                    onAdd={body => createPhysicalProperty(body)}
                    isPending={isPending}
                />
            )}
        </div>
    )
}

const AddPhysicalPropertyRow: FC<{
    onAdd: (body: CreatePhysicalPropertyBody) => Promise<unknown>
    isPending: boolean
}> = ({ onAdd, isPending }) => {
    const { formatMessage: fm } = useIntl()
    const [name, setName] = useState('')
    const [type, setType] = useState<{ uid: string; name: string } | null>(null)
    const [typeOpen, setTypeOpen] = useState(false)
    const { data: typeOptions } = useCodebook(CODEBOOK.CATALOGUE_PROPERTY_TYPE)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim() || !type) return
        await onAdd({ name: name.trim(), type: { uid: type.uid, name: type.name } })
        setName('')
        setType(null)
    }

    const isValid = name.trim().length > 0 && !!type

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border border-dashed border-border rounded-md p-2"
        >
            <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={fm({ id: message.catalogue.category.newPropertyPlaceholder })}
                className="h-8 text-sm flex-1"
                disabled={isPending}
            />
            <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="min-w-[7rem] justify-start"
                        disabled={isPending}
                    >
                        {type?.name ?? fm({ id: message.catalogue.category.selectType })}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[220px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={fm({ id: message.catalogue.category.selectType })} />
                        <CommandList>
                            <CommandEmpty>—</CommandEmpty>
                            <CommandGroup>
                                {(typeOptions?.data ?? []).map(o => (
                                    <CommandItem
                                        key={o.uid}
                                        value={o.name}
                                        onSelect={() => {
                                            setType({ uid: o.uid, name: o.name })
                                            setTypeOpen(false)
                                        }}
                                    >
                                        {o.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button type="submit" size="sm" disabled={!isValid || isPending}>
                <Plus className="size-3.5" />
                {fm({ id: message.catalogue.category.addPhysicalProperty })}
            </Button>
        </form>
    )
}
