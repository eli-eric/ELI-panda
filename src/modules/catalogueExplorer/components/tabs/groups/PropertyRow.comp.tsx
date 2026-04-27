import { ChevronDown, ChevronUp, MoveRight, Plus, Trash2, X } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useCodebook } from '@/hooks/fetch/useCodebook'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import { CODEBOOK } from '@/types/constants/codebook'

import type { CategoryProperty } from '../../../hooks/mutations/useCategoryPropertyMutations'

export interface PropertyRowProps {
    property: CategoryProperty
    canEdit: boolean
    isPending: boolean
    onUpdate: (patch: {
        name?: string
        type?: { uid: string; name?: string }
        unit?: { uid: string; name?: string } | null
        defaultValue?: string | null
        listOfValues?: string[] | null
        order?: number
        groupUid?: string
    }) => Promise<unknown>
    onDelete: () => Promise<unknown> | void
    onMoveUp?: () => void
    onMoveDown?: () => void
    canMoveUp?: boolean
    canMoveDown?: boolean
    /** Other groups in the same category, for move-to-group dropdown */
    otherGroups?: Array<{ uid: string; name: string }>
}

/** Compact bare input without label wrapper — commits on blur/Enter. */
const CompactInput: FC<{
    value: string | null
    onSave: (v: string) => Promise<void> | void
    placeholder?: string
    disabled?: boolean
    type?: 'text' | 'number'
}> = ({ value, onSave, placeholder, disabled, type = 'text' }) => {
    const [local, setLocal] = useState(value ?? '')
    useEffect(() => setLocal(value ?? ''), [value])

    const commit = async () => {
        if (local === (value ?? '')) return
        await onSave(local)
    }

    return (
        <Input
            value={local}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => setLocal(e.target.value)}
            onBlur={commit}
            onKeyDown={e => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    ;(e.target as HTMLInputElement).blur()
                } else if (e.key === 'Escape') {
                    setLocal(value ?? '')
                    ;(e.target as HTMLInputElement).blur()
                }
            }}
            className="h-8 text-sm"
        />
    )
}

/** Compact codebook picker (Popover + Command), no label wrapper. */
const CompactCodebookPicker: FC<{
    codebook: CODEBOOK
    value: string | null
    displayValue: string | null
    placeholder: string
    clearable?: boolean
    disabled?: boolean
    onSelect: (uid: string | null, name?: string) => void
}> = ({ codebook, value, displayValue, placeholder, clearable, disabled, onSelect }) => {
    const [open, setOpen] = useState(false)
    const { data } = useCodebook(codebook)
    const options = data?.data ?? []

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full justify-start h-8 font-normal"
                    disabled={disabled}
                >
                    <span className={displayValue ? '' : 'text-muted-foreground'}>
                        {displayValue ?? placeholder}
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>—</CommandEmpty>
                        <CommandGroup>
                            {clearable && value && (
                                <CommandItem
                                    value="__clear__"
                                    onSelect={() => {
                                        onSelect(null)
                                        setOpen(false)
                                    }}
                                    className="text-muted-foreground"
                                >
                                    <X className="size-3.5 mr-2" />—
                                </CommandItem>
                            )}
                            {options.map(o => (
                                <CommandItem
                                    key={o.uid}
                                    value={o.name}
                                    onSelect={() => {
                                        onSelect(o.uid, o.name)
                                        setOpen(false)
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
    )
}

export const PropertyRow: FC<PropertyRowProps> = ({
    property,
    canEdit,
    isPending,
    onUpdate,
    onDelete,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
    otherGroups,
}) => {
    const { formatMessage: fm } = useIntl()
    const withWarn = useWarningModal(fm({ id: message.catalogue.category.confirmDeleteProperty }))
    const [showListValues, setShowListValues] = useState(false)
    const isListType = property.type?.uid === PROPERTY_TYPE.LIST

    const handleDelete = useCallback(() => {
        withWarn(() => {
            void onDelete()
        })()
    }, [onDelete, withWarn])

    return (
        <div className="border border-border rounded-md bg-background p-2 space-y-2">
            <div className="flex items-center gap-2">
                <div className="flex-1">
                    <CompactInput
                        value={property.name}
                        disabled={!canEdit || isPending}
                        placeholder={fm({ id: message.catalogue.category.propertyName })}
                        onSave={async v => {
                            if (v) await onUpdate({ name: v })
                        }}
                    />
                </div>
                <div className="flex items-center gap-1 shrink-0">
                    {canEdit && onMoveUp && (
                        <Tooltip content={fm({ id: message.catalogue.category.moveUp })}>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                disabled={!canMoveUp || isPending}
                                onClick={onMoveUp}
                                aria-label={fm({ id: message.catalogue.category.moveUp })}
                            >
                                <ChevronUp className="size-4" />
                            </Button>
                        </Tooltip>
                    )}
                    {canEdit && onMoveDown && (
                        <Tooltip content={fm({ id: message.catalogue.category.moveDown })}>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                disabled={!canMoveDown || isPending}
                                onClick={onMoveDown}
                                aria-label={fm({ id: message.catalogue.category.moveDown })}
                            >
                                <ChevronDown className="size-4" />
                            </Button>
                        </Tooltip>
                    )}
                    {canEdit && otherGroups && otherGroups.length > 0 && (
                        <DropdownMenu>
                            <Tooltip content={fm({ id: message.catalogue.category.moveToGroup })}>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        aria-label={fm({
                                            id: message.catalogue.category.moveToGroup,
                                        })}
                                    >
                                        <MoveRight className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </Tooltip>
                            <DropdownMenuContent align="end">
                                {otherGroups.map(g => (
                                    <DropdownMenuItem
                                        key={g.uid}
                                        onSelect={() => onUpdate({ groupUid: g.uid })}
                                    >
                                        {g.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {canEdit && (
                        <Tooltip content={fm({ id: message.catalogue.category.propertyRemove })}>
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={handleDelete}
                                disabled={isPending}
                                className="text-destructive hover:text-destructive"
                                aria-label={fm({ id: message.catalogue.category.propertyRemove })}
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <CompactCodebookPicker
                    codebook={CODEBOOK.CATALOGUE_PROPERTY_TYPE}
                    value={property.type?.uid ?? null}
                    displayValue={property.type?.name ?? null}
                    placeholder={fm({ id: message.catalogue.category.selectType })}
                    disabled={!canEdit || isPending}
                    onSelect={(uid, name) => {
                        if (uid) void onUpdate({ type: { uid, name } })
                    }}
                />
                <CompactCodebookPicker
                    codebook={CODEBOOK.UNIT}
                    value={property.unit?.uid ?? null}
                    displayValue={property.unit?.name ?? null}
                    placeholder={fm({ id: message.catalogue.category.selectUnit })}
                    clearable
                    disabled={!canEdit || isPending}
                    onSelect={(uid, name) => {
                        if (!uid) void onUpdate({ unit: null })
                        else void onUpdate({ unit: { uid, name } })
                    }}
                />
                {!isListType && (
                    <CompactInput
                        value={property.defaultValue ?? null}
                        disabled={!canEdit || isPending}
                        placeholder={fm({ id: message.catalogue.category.propertyDefaultValue })}
                        onSave={async v => {
                            const next = typeof v === 'string' && v !== '' ? v : null
                            await onUpdate({ defaultValue: next })
                        }}
                    />
                )}
                {isListType && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-full"
                        onClick={() => setShowListValues(s => !s)}
                    >
                        {fm({ id: message.catalogue.category.propertyListOfValues })}
                        {(property.listOfValues?.length ?? 0) > 0
                            ? ` (${property.listOfValues?.length})`
                            : ''}
                    </Button>
                )}
            </div>
            {isListType && showListValues && (
                <ListOfValuesEditor
                    values={property.listOfValues ?? []}
                    canEdit={canEdit}
                    isPending={isPending}
                    onChange={next => onUpdate({ listOfValues: next })}
                />
            )}
        </div>
    )
}

interface ListEditorProps {
    values: string[]
    canEdit: boolean
    isPending: boolean
    onChange: (next: string[]) => Promise<unknown>
}

const ListOfValuesEditor: FC<ListEditorProps> = ({ values, canEdit, isPending, onChange }) => {
    const { formatMessage: fm } = useIntl()
    const [draft, setDraft] = useState('')

    const handleAdd = () => {
        const trimmed = draft.trim()
        if (!trimmed) return
        void onChange([...values, trimmed])
        setDraft('')
    }

    const handleRemove = (index: number) => {
        const next = values.filter((_, i) => i !== index)
        void onChange(next)
    }

    return (
        <div className="border-t border-border pt-2 space-y-2">
            <div className="flex flex-wrap gap-1">
                {values.map((v, i) => (
                    <span
                        key={`${i}-${v}`}
                        className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs"
                    >
                        {v}
                        {canEdit && (
                            <button
                                type="button"
                                onClick={() => handleRemove(i)}
                                className="hover:text-destructive"
                                aria-label="Remove value"
                            >
                                <X className="size-3" />
                            </button>
                        )}
                    </span>
                ))}
                {values.length === 0 && <span className="text-xs text-muted-foreground">—</span>}
            </div>
            {canEdit && (
                <div className="flex gap-1">
                    <Input
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        placeholder={fm({ id: message.catalogue.category.propertyEnterValue })}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAdd()
                            }
                        }}
                        className="h-7 text-xs"
                        disabled={isPending}
                    />
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={handleAdd}
                        disabled={!draft.trim() || isPending}
                    >
                        <Plus className="size-3.5" />
                    </Button>
                </div>
            )}
        </div>
    )
}
