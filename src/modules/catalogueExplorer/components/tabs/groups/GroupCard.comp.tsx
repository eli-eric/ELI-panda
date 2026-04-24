import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { InlineFieldInput } from '@/components/ui/inline-field'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'

import type { CategoryProperty } from '../../../hooks/mutations/useCategoryPropertyMutations'
import { useCategoryPropertyMutations } from '../../../hooks/mutations/useCategoryPropertyMutations'
import { AddPropertyRow } from './AddPropertyRow.comp'
import { PropertyRow } from './PropertyRow.comp'

export interface GroupCardData {
    uid: string
    name: string
    order?: number
    properties: CategoryProperty[]
}

interface Props {
    categoryUid: string
    group: GroupCardData
    canEdit: boolean
    onRename: (name: string) => Promise<unknown>
    onDelete: () => Promise<unknown> | void
    onMoveUp?: () => void
    onMoveDown?: () => void
    canMoveUp?: boolean
    canMoveDown?: boolean
    isGroupPending: boolean
    otherGroups: Array<{ uid: string; name: string }>
}

export const GroupCard: FC<Props> = ({
    categoryUid,
    group,
    canEdit,
    onRename,
    onDelete,
    onMoveUp,
    onMoveDown,
    canMoveUp,
    canMoveDown,
    isGroupPending,
    otherGroups,
}) => {
    const { formatMessage: fm } = useIntl()
    const withWarn = useWarningModal(
        fm({ id: message.catalogue.category.confirmDeleteGroup }),
    )
    const {
        createProperty,
        updateProperty,
        deleteProperty,
        isPending: isPropPending,
    } = useCategoryPropertyMutations(categoryUid)

    const isPending = isGroupPending || isPropPending

    const handleDelete = useCallback(() => {
        withWarn(() => {
            void onDelete()
        })()
    }, [onDelete, withWarn])

    const sortedProps = useMemo(
        () =>
            [...group.properties].sort((a, b) => {
                const oa = a.order ?? 0
                const ob = b.order ?? 0
                if (oa !== ob) return oa - ob
                return a.name.localeCompare(b.name)
            }),
        [group.properties],
    )

    const handlePropMove = (index: number, direction: -1 | 1) => {
        const target = sortedProps[index + direction]
        const current = sortedProps[index]
        if (!target || !current) return
        const newOrder = (target.order ?? (index + 1 + direction) * 10) + direction * -1
        void updateProperty(current.uid, { order: newOrder })
    }

    return (
        <Card className="border-l-4 border-l-primary">
            <CardHeader className="p-3">
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <InlineFieldInput
                            label={fm({ id: message.catalogue.category.groupName })}
                            value={group.name}
                            onSave={async v => {
                                if (v) await onRename(String(v))
                            }}
                            isPending={isPending}
                            disabled={!canEdit}
                        />
                    </div>
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
                    {canEdit && (
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={handleDelete}
                            className="text-destructive hover:text-destructive"
                            aria-label={fm({ id: message.catalogue.category.delete })}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-3 pt-0 space-y-2">
                {sortedProps.map((p, i) => (
                    <PropertyRow
                        key={p.uid}
                        property={p}
                        canEdit={canEdit}
                        isPending={isPropPending}
                        onUpdate={patch => updateProperty(p.uid, patch)}
                        onDelete={() => deleteProperty(p.uid)}
                        onMoveUp={() => handlePropMove(i, -1)}
                        onMoveDown={() => handlePropMove(i, 1)}
                        canMoveUp={i > 0}
                        canMoveDown={i < sortedProps.length - 1}
                        otherGroups={otherGroups}
                    />
                ))}
                {canEdit && (
                    <AddPropertyRow
                        onAdd={body => createProperty(group.uid, body)}
                        isPending={isPropPending}
                    />
                )}
            </CardContent>
        </Card>
    )
}
