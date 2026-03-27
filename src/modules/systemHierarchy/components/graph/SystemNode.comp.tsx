import { Handle, type NodeProps, Position } from '@xyflow/react'
import { memo } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { message } from '@/i18n/src/messages'

interface SystemNodeData {
    name: string
    systemCode?: string | null
    systemLevel: string
    systemType?: string | null
    nodeClasses: string
    layoutMode?: string
    selected?: boolean
    selectionIndex?: number
    onExpand?: (uid: string) => void
    onLoadMore?: (uid: string) => void
    onViewDetail?: (uid: string) => void
    onContextMenuChange?: (open: boolean) => void
    onCopySystem?: (uid: string) => void
    onPasteSystem?: (uid: string) => void
    copiedSystemUid?: string | null
    hiddenRelationshipsCount?: number
    [key: string]: unknown
}

const SystemNodeComponent = ({ id, data }: NodeProps) => {
    const { formatMessage: fm } = useIntl()
    const {
        name,
        systemCode,
        systemType,
        nodeClasses,
        layoutMode,
        selected,
        selectionIndex,
        onExpand,
        onLoadMore,
        onViewDetail,
        onContextMenuChange,
        onCopySystem,
        onPasteSystem,
        copiedSystemUid,
        hiddenRelationshipsCount,
    } = data as unknown as SystemNodeData

    const isVertical = layoutMode === 'vertical'
    const selectionRing = selected ? 'ring-2 ring-amber-500 ring-offset-1' : ''
    const canPaste = !!copiedSystemUid && copiedSystemUid !== id

    return (
        <ContextMenu onOpenChange={onContextMenuChange}>
            <ContextMenuTrigger asChild>
                <div
                    className={`group relative rounded-lg border-2 shadow-sm px-3 py-2 min-w-[160px] max-w-[220px] ${nodeClasses} ${selectionRing}`}
                    data-testid="system-node"
                >
                    <Handle
                        type="target"
                        position={isVertical ? Position.Top : Position.Left}
                        className="!bg-slate-400 !w-2 !h-2"
                    />
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold truncate" title={name}>
                            {name}
                        </span>
                        {systemCode && (
                            <Badge variant="outline" className="text-[10px] w-fit">
                                {systemCode}
                            </Badge>
                        )}
                        {systemType && (
                            <span className="text-[10px] opacity-70 truncate">{systemType}</span>
                        )}
                        {selected && selectionIndex != null && (
                            <Badge className="text-[10px] w-fit bg-amber-500">
                                {selectionIndex === 0
                                    ? fm({ id: message.systemHierarchy.graph.selection.source })
                                    : fm({ id: message.systemHierarchy.graph.selection.target })}
                            </Badge>
                        )}
                    </div>
                    <Handle
                        type="source"
                        position={isVertical ? Position.Bottom : Position.Right}
                        className="!bg-slate-400 !w-2 !h-2"
                    />
                    {!!hiddenRelationshipsCount && hiddenRelationshipsCount > 0 && (
                        <div
                            className="absolute -top-2 -right-2 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                            data-testid="system-node-hidden-badge"
                        >
                            +{hiddenRelationshipsCount}
                        </div>
                    )}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onSelect={() => onExpand?.(id)} data-testid="context-expand">
                    {fm({ id: message.systemHierarchy.graph.actions.expand })}
                </ContextMenuItem>
                {!!hiddenRelationshipsCount && hiddenRelationshipsCount > 0 && onLoadMore && (
                    <ContextMenuItem
                        onSelect={() => onLoadMore(id)}
                        data-testid="context-load-more"
                    >
                        {fm({ id: message.systemHierarchy.graph.actions.loadMore })}
                    </ContextMenuItem>
                )}
                <ContextMenuItem
                    onSelect={() => onViewDetail?.(id)}
                    data-testid="context-view-detail"
                >
                    {fm({ id: message.systemHierarchy.graph.actions.viewDetail })}
                </ContextMenuItem>
                {(onCopySystem || onPasteSystem) && <ContextMenuSeparator />}
                {onCopySystem && (
                    <ContextMenuItem
                        onSelect={() => onCopySystem(id)}
                        data-testid="context-copy-system"
                    >
                        {fm({ id: message.systemHierarchy.copy.copySystem })}
                    </ContextMenuItem>
                )}
                {onPasteSystem && (
                    <ContextMenuItem
                        onSelect={() => onPasteSystem(id)}
                        disabled={!canPaste}
                        data-testid="context-paste-system"
                    >
                        {fm({ id: message.systemHierarchy.copy.pasteSystem })}
                    </ContextMenuItem>
                )}
            </ContextMenuContent>
        </ContextMenu>
    )
}

export const SystemNode = memo(SystemNodeComponent)
