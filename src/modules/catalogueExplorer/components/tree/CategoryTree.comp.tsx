import type { FC } from 'react'
import { useCallback } from 'react'

import type { CatalogueCategoryTreeNode } from '../../types'
import type { CategoryTreeNodeProps } from './CategoryTreeNode.comp'
import { CategoryTreeNode } from './CategoryTreeNode.comp'

interface CategoryTreeComponentProps {
    nodes: CatalogueCategoryTreeNode[]
    expandedNodes: string[]
    selectedCategoryUid: string | null
    onToggle: (uid: string) => void
    onSelect: (uid: string) => void
    search?: string
    canEditCategory: boolean
    canEditItem: boolean
    onCreateSubCategory?: CategoryTreeNodeProps['onCreateSubCategory']
    onCreateItem?: CategoryTreeNodeProps['onCreateItem']
    onEditCategory?: CategoryTreeNodeProps['onEditCategory']
    onCopyCategory?: CategoryTreeNodeProps['onCopyCategory']
    onDeleteCategory?: CategoryTreeNodeProps['onDeleteCategory']
}

export const CategoryTreeComponent: FC<CategoryTreeComponentProps> = ({
    nodes,
    expandedNodes,
    selectedCategoryUid,
    onToggle,
    onSelect,
    search,
    canEditCategory,
    canEditItem,
    onCreateSubCategory,
    onCreateItem,
    onEditCategory,
    onCopyCategory,
    onDeleteCategory,
}) => {
    const renderNode = useCallback(
        (node: CatalogueCategoryTreeNode, depth: number) => {
            const isExpanded = expandedNodes.includes(node.uid)
            const isSelected = node.uid === selectedCategoryUid

            return (
                <CategoryTreeNode
                    key={node.uid}
                    node={node}
                    depth={depth}
                    isExpanded={isExpanded}
                    isSelected={isSelected}
                    onToggle={onToggle}
                    onSelect={onSelect}
                    search={search}
                    canEditCategory={canEditCategory}
                    canEditItem={canEditItem}
                    onCreateSubCategory={onCreateSubCategory}
                    onCreateItem={onCreateItem}
                    onEditCategory={onEditCategory}
                    onCopyCategory={onCopyCategory}
                    onDeleteCategory={onDeleteCategory}
                >
                    {isExpanded && node.children.map(child => renderNode(child, depth + 1))}
                </CategoryTreeNode>
            )
        },
        [
            expandedNodes,
            selectedCategoryUid,
            onToggle,
            onSelect,
            search,
            canEditCategory,
            canEditItem,
            onCreateSubCategory,
            onCreateItem,
            onEditCategory,
            onCopyCategory,
            onDeleteCategory,
        ],
    )

    return <div className="py-1">{nodes.map(n => renderNode(n, 0))}</div>
}
