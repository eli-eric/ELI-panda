import { Handle, type NodeProps, Position } from '@xyflow/react'
import { memo } from 'react'

import { Badge } from '@/components/ui/badge'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'

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
    onViewDetail?: (uid: string) => void
    onContextMenuChange?: (open: boolean) => void
    [key: string]: unknown
}

const SystemNodeComponent = ({ id, data }: NodeProps) => {
    const {
        name,
        systemCode,
        systemType,
        nodeClasses,
        layoutMode,
        selected,
        selectionIndex,
        onExpand,
        onViewDetail,
        onContextMenuChange,
    } = data as unknown as SystemNodeData

    const isVertical = layoutMode === 'vertical'
    const selectionRing = selected ? 'ring-2 ring-amber-500 ring-offset-1' : ''

    return (
        <ContextMenu onOpenChange={onContextMenuChange}>
            <ContextMenuTrigger asChild>
                <div
                    className={`rounded-lg border-2 shadow-sm px-3 py-2 min-w-[160px] max-w-[220px] ${nodeClasses} ${selectionRing}`}
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
                                {selectionIndex === 0 ? 'Source' : 'Target'}
                            </Badge>
                        )}
                    </div>
                    <Handle
                        type="source"
                        position={isVertical ? Position.Bottom : Position.Right}
                        className="!bg-slate-400 !w-2 !h-2"
                    />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onSelect={() => onExpand?.(id)} data-testid="context-expand">
                    Expand
                </ContextMenuItem>
                <ContextMenuItem
                    onSelect={() => onViewDetail?.(id)}
                    data-testid="context-view-detail"
                >
                    View Detail
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}

export const SystemNode = memo(SystemNodeComponent)
