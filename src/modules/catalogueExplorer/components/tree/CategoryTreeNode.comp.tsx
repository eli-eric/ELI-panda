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
import { highlightText } from '@/utils'

import type { CatalogueCategoryTreeNode } from '../../types'

export interface CategoryTreeNodeProps {
    node: CatalogueCategoryTreeNode
    depth: number
    isExpanded: boolean
    isSelected: boolean
    onToggle: (uid: string) => void
    onSelect: (uid: string) => void
    children?: React.ReactNode
    search?: string
    canEditCategory: boolean
    canEditItem: boolean
    onCreateSubCategory?: (parentUid: string) => void
    onCreateItem?: (categoryUid: string) => void
    onEditCategory?: (uid: string) => void
    onCopyCategory?: (uid: string) => void
    onDeleteCategory?: (uid: string) => void
}

export const CategoryTreeNode: FC<CategoryTreeNodeProps> = ({
    node,
    depth,
    isExpanded,
    isSelected,
    onToggle,
    onSelect,
    children,
    search,
    canEditCategory,
    canEditItem,
    onCreateSubCategory,
    onCreateItem,
    onEditCategory,
    onCopyCategory,
    onDeleteCategory,
}) => {
    const { formatMessage: fm } = useIntl()
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

    const showCreateSubCategory = canEditCategory && !!onCreateSubCategory
    const showCreateItem = canEditItem && !!onCreateItem
    const showEdit = canEditCategory && !!onEditCategory
    const showCopy = canEditCategory && !!onCopyCategory
    const showDelete = canEditCategory && !!onDeleteCategory

    const hasContextMenu =
        showCreateSubCategory || showCreateItem || showEdit || showCopy || showDelete

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
            <FolderIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate flex-1">
                {search ? highlightText(node.name, search) : node.name}
            </span>
            {typeof node.itemCount === 'number' && node.itemCount > 0 && (
                <code className="text-[10px] text-muted-foreground shrink-0 rounded bg-muted px-1 py-0.5">
                    {node.itemCount}
                </code>
            )}
        </div>
    )

    return (
        <div data-testid={`tree-node-${node.uid}`}>
            {hasContextMenu ? (
                <ContextMenu>
                    <ContextMenuTrigger asChild>{nodeContent}</ContextMenuTrigger>
                    <ContextMenuContent>
                        {showCreateSubCategory && (
                            <ContextMenuItem
                                onSelect={() => onCreateSubCategory!(node.uid)}
                                data-testid="context-create-subcategory"
                            >
                                {fm({ id: message.catalogue.tree.createSubCategory })}
                            </ContextMenuItem>
                        )}
                        {showCreateItem && (
                            <ContextMenuItem
                                onSelect={() => onCreateItem!(node.uid)}
                                data-testid="context-create-item"
                            >
                                {fm({ id: message.catalogue.tree.createItem })}
                            </ContextMenuItem>
                        )}
                        {(showCreateSubCategory || showCreateItem) &&
                            (showEdit || showCopy || showDelete) && <ContextMenuSeparator />}
                        {showEdit && (
                            <ContextMenuItem
                                onSelect={() => onEditCategory!(node.uid)}
                                data-testid="context-edit-category"
                            >
                                {fm({ id: message.catalogue.tree.editCategory })}
                            </ContextMenuItem>
                        )}
                        {showCopy && (
                            <ContextMenuItem
                                onSelect={() => onCopyCategory!(node.uid)}
                                data-testid="context-copy-category"
                            >
                                {fm({ id: message.catalogue.tree.copyCategory })}
                            </ContextMenuItem>
                        )}
                        {showDelete && (
                            <>
                                <ContextMenuSeparator />
                                <ContextMenuItem
                                    onSelect={() => onDeleteCategory!(node.uid)}
                                    data-testid="context-delete-category"
                                    className="text-destructive focus:text-destructive"
                                >
                                    {fm({ id: message.catalogue.tree.deleteCategory })}
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
