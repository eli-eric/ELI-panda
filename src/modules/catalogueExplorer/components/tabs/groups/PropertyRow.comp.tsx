import { ChevronDown, ChevronUp, MoveRight, Plus, Trash2, X } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InlineFieldCombobox, InlineFieldInput } from '@/components/ui/inline-field'
import { Input } from '@/components/ui/input'
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
    const withWarn = useWarningModal(
        fm({ id: message.catalogue.category.confirmDeleteProperty }),
    )
    const [showListValues, setShowListValues] = useState(false)
    const isListType = property.type?.uid === PROPERTY_TYPE.LIST

    const handleDelete = useCallback(() => {
        withWarn(() => {
            void onDelete()
        })()
    }, [onDelete, withWarn])

    return (
        <div className="border border-border rounded-md bg-background">
            <div className="p-2 grid grid-cols-12 gap-2 items-start">
                <div className="col-span-3">
                    <InlineFieldInput
                        label={fm({ id: message.catalogue.category.propertyName })}
                        value={property.name}
                        onSave={async v => {
                            if (v) await onUpdate({ name: String(v) })
                        }}
                        isPending={isPending}
                        disabled={!canEdit}
                    />
                </div>
                <div className="col-span-2">
                    <InlineFieldCombobox
                        label={fm({ id: message.catalogue.category.propertyType })}
                        value={property.type?.uid ?? null}
                        displayValue={property.type?.name ?? null}
                        codebook={CODEBOOK.CATALOGUE_PROPERTY_TYPE}
                        onSave={async (uid, displayName) => {
                            if (uid) await onUpdate({ type: { uid, name: displayName } })
                        }}
                        isPending={isPending}
                        disabled={!canEdit}
                    />
                </div>
                <div className="col-span-2">
                    <InlineFieldCombobox
                        label={fm({ id: message.catalogue.category.propertyUnit })}
                        value={property.unit?.uid ?? null}
                        displayValue={property.unit?.name ?? null}
                        codebook={CODEBOOK.UNIT}
                        onSave={async (uid, displayName) => {
                            if (!uid) {
                                await onUpdate({ unit: null })
                                return
                            }
                            await onUpdate({ unit: { uid, name: displayName } })
                        }}
                        isPending={isPending}
                        disabled={!canEdit}
                    />
                </div>
                <div className="col-span-3">
                    {!isListType && (
                        <InlineFieldInput
                            label={fm({
                                id: message.catalogue.category.propertyDefaultValue,
                            })}
                            value={property.defaultValue ?? null}
                            onSave={async v => {
                                const next = typeof v === 'string' && v !== '' ? v : null
                                await onUpdate({ defaultValue: next })
                            }}
                            isPending={isPending}
                            disabled={!canEdit}
                        />
                    )}
                    {isListType && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setShowListValues(s => !s)}
                        >
                            {fm({ id: message.catalogue.category.propertyListOfValues })}{' '}
                            {(property.listOfValues?.length ?? 0) > 0
                                ? `(${property.listOfValues?.length})`
                                : ''}
                        </Button>
                    )}
                </div>
                <div className="col-span-2 flex items-center justify-end gap-1">
                    {canEdit && onMoveUp && (
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={!canMoveUp}
                            onClick={onMoveUp}
                            aria-label={fm({ id: message.catalogue.category.moveUp })}
                        >
                            <ChevronUp className="size-4" />
                        </Button>
                    )}
                    {canEdit && onMoveDown && (
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={!canMoveDown}
                            onClick={onMoveDown}
                            aria-label={fm({ id: message.catalogue.category.moveDown })}
                        >
                            <ChevronDown className="size-4" />
                        </Button>
                    )}
                    {canEdit && otherGroups && otherGroups.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    aria-label={fm({ id: message.catalogue.category.moveToGroup })}
                                >
                                    <MoveRight className="size-4" />
                                </Button>
                            </DropdownMenuTrigger>
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
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={handleDelete}
                            className="text-destructive hover:text-destructive"
                            aria-label={fm({ id: message.catalogue.category.propertyRemove })}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
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
        <div className="border-t border-border px-3 py-2 space-y-2">
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
                {values.length === 0 && (
                    <span className="text-xs text-muted-foreground">—</span>
                )}
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
