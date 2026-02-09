'use client'

import { Plus, Trash2 } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { InlineFieldRow } from './InlineFieldRow.comp'
import type { InlineFieldBaseProps, ListItem } from './types'

interface InlineFieldListProps extends InlineFieldBaseProps {
    items: ListItem[]
    onAdd: () => void
    onRemove: (uid: string) => Promise<void>
    renderItem?: (item: ListItem) => ReactNode
    isPending?: boolean
}

export const InlineFieldList: FC<InlineFieldListProps> = ({
    label,
    items,
    onAdd,
    onRemove,
    renderItem,
    disabled,
    isPending,
    className,
}) => {
    const { formatMessage: fm } = useIntl()
    const [removingUid, setRemovingUid] = useState<string | null>(null)

    const handleRemove = useCallback(
        async (uid: string) => {
            setRemovingUid(uid)
            try {
                await onRemove(uid)
            } finally {
                setRemovingUid(null)
            }
        },
        [onRemove],
    )

    const defaultRenderItem = (item: ListItem) => item.name

    return (
        <InlineFieldRow label={label} disabled={disabled} className={className}>
            <div className="space-y-2">
                {items.length === 0 ? (
                    <div className="rounded-md bg-muted px-3 py-1.5 min-h-9 text-sm text-muted-foreground italic">
                        {fm({ id: 'systemHierarchy.fields.noneEntered' })}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-1.5">
                        {items.map(item => (
                            <Badge
                                key={item.uid}
                                variant="secondary"
                                className="gap-1.5 pr-1 group"
                            >
                                <span>
                                    {renderItem ? renderItem(item) : defaultRenderItem(item)}
                                </span>
                                {!disabled && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="size-4 hover:bg-destructive/20 rounded-sm"
                                        onClick={() => handleRemove(item.uid)}
                                        disabled={isPending || removingUid === item.uid}
                                    >
                                        <Trash2 className="size-3 text-muted-foreground group-hover:text-destructive" />
                                    </Button>
                                )}
                            </Badge>
                        ))}
                    </div>
                )}
                {!disabled && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onAdd}
                        disabled={isPending}
                        className="h-7"
                    >
                        <Plus className="size-3.5 mr-1" />
                        {fm({ id: 'common.buttons.addNew' })}
                    </Button>
                )}
            </div>
        </InlineFieldRow>
    )
}
