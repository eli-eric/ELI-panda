import { ChevronDown, ChevronRight, Folder, FolderOpen } from 'lucide-react'
import type { FC } from 'react'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import type { SystemLevel } from '@/types/gql/graphql'
import { highlightText } from '@/utils'
import { getFontBySystemLevel } from '@/utils/systemLevel'

import { useSystemLeavesCount } from '../../hooks/queries/useSystemLeavesCount'
import type { HierarchyNode } from '../../types'
import { canCreateUnder } from '../../utils/systemLevelRules'

interface TreeNodeProps {
    node: HierarchyNode
    depth: number
    isExpanded: boolean
    isSelected: boolean
    onToggle: (uid: string) => void
    onSelect: (uid: string) => void
    children?: React.ReactNode
    search?: string
    copiedSystemUid?: string | null
    canEdit?: boolean
    onCopySystem?: (uid: string) => void
    onPasteSystem?: (uid: string) => void
    onCreateSubsystem?: (parentUid: string, parentName: string, parentLevel: SystemLevel) => void
    onDeleteSystem?: (uid: string, name: string) => void
}

export const TreeNode: FC<TreeNodeProps> = ({
    node,
    depth,
    isExpanded,
    isSelected,
    onToggle,
    onSelect,
    children,
    search,
    copiedSystemUid,
    canEdit = true,
    onCopySystem,
    onPasteSystem,
    onCreateSubsystem,
    onDeleteSystem,
}) => {
    const { formatMessage: fm } = useIntl()
    const hasChildren = node.children.length > 0
    const ChevronIcon = isExpanded ? ChevronDown : ChevronRight
    const FolderIcon = isExpanded ? FolderOpen : Folder
    const { count, isLoading: isLeavesCountLoading } = useSystemLeavesCount(node.uid)

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

    const canPaste = !!copiedSystemUid && copiedSystemUid !== node.uid
    const canCreate = canCreateUnder(node.systemLevel)
    const hasContextMenu =
        !!onCopySystem || !!onPasteSystem || !!onCreateSubsystem || !!onDeleteSystem

    const nodeContent = (
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
                <span className="w-4.5 shrink-0" />
            )}
            <FolderIcon className={cn('size-4 shrink-0', getFontBySystemLevel(node.systemLevel))} />
            <span className="truncate flex-1">
                {search ? highlightText(node.name, search) : node.name}
            </span>
            <code className="text-[10px] text-muted-foreground shrink-0 rounded bg-muted px-1 py-0.5">
                {isLeavesCountLoading ? '…' : count}
            </code>
        </div>
    )

    return (
        <div data-testid={`tree-node-${node.uid}`}>
            {hasContextMenu ? (
                <ContextMenu>
                    <ContextMenuTrigger asChild>{nodeContent}</ContextMenuTrigger>
                    <ContextMenuContent>
                        {onCreateSubsystem && (
                            <ContextMenuItem
                                onSelect={() =>
                                    onCreateSubsystem(node.uid, node.name, node.systemLevel)
                                }
                                disabled={!canEdit || !canCreate}
                                data-testid="context-create-system"
                            >
                                {fm({ id: message.systemHierarchy.create.menuItem })}
                            </ContextMenuItem>
                        )}
                        {onCopySystem && (
                            <ContextMenuItem
                                onSelect={() => onCopySystem(node.uid)}
                                disabled={!canEdit}
                                data-testid="context-copy-system"
                            >
                                {fm({ id: message.systemHierarchy.copy.copySystem })}
                            </ContextMenuItem>
                        )}
                        {onPasteSystem && (
                            <ContextMenuItem
                                onSelect={() => onPasteSystem(node.uid)}
                                disabled={!canEdit || !canPaste}
                                data-testid="context-paste-system"
                            >
                                {fm({ id: message.systemHierarchy.copy.pasteSystem })}
                            </ContextMenuItem>
                        )}
                        {onDeleteSystem && (
                            <>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                    onSelect={() => onDeleteSystem(node.uid, node.name)}
                                    disabled={!canEdit}
                                    className="text-destructive focus:text-destructive"
                                    data-testid="context-delete-system"
                                >
                                    {fm({ id: message.systemHierarchy.delete.menuItem })}
                                </ContextMenuItem>
                            </>
                        )}
                    </ContextMenuContent>
                </ContextMenu>
            ) : (
                nodeContent
            )}
            {isExpanded && children}
        </div>
    )
}
