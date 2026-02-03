import { ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react'
import type { FC } from 'react'
import { useCallback } from 'react'

import { cn } from '@/lib/utils'

import type { HierarchyNode } from '../../types'

interface TreeNodeProps {
    node: HierarchyNode
    depth: number
    isExpanded: boolean
    isSelected: boolean
    onToggle: (uid: string) => void
    onSelect: (uid: string) => void
    children?: React.ReactNode
}

export const TreeNode: FC<TreeNodeProps> = ({
    node,
    depth,
    isExpanded,
    isSelected,
    onToggle,
    onSelect,
    children,
}) => {
    const hasChildren = node.children.length > 0
    const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
    const FolderIcon = isExpanded ? FolderOpen : Folder

    const handleToggle = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation()
            onToggle(node.uid)
        },
        [node.uid, onToggle],
    )

    const handleSelect = useCallback(() => {
        onSelect(node.uid)
    }, [node.uid, onSelect])

    return (
        <div data-testid={`tree-node-${node.uid}`}>
            <div
                className={cn(
                    'flex items-center gap-1 py-1 px-2 cursor-pointer rounded-md text-sm transition-colors',
                    'hover:bg-accent/50',
                    isSelected && 'bg-primary/10 text-primary font-medium',
                )}
                style={{ paddingLeft: `${depth * 16 + 8}px` }}
                onClick={handleSelect}
            >
                {hasChildren ? (
                    <button
                        className="shrink-0 p-0.5 rounded hover:bg-accent"
                        onClick={handleToggle}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                        <ChevronIcon className="size-3.5 text-muted-foreground" />
                    </button>
                ) : (
                    <span className="w-[18px] shrink-0" />
                )}
                <FolderIcon className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate flex-1">{node.name}</span>
                {node.systemCode && (
                    <code className="text-[10px] text-muted-foreground shrink-0 rounded bg-muted px-1 py-0.5">
                        {node.systemCode}
                    </code>
                )}
            </div>
            {isExpanded && children}
        </div>
    )
}
