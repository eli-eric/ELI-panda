import type { FC } from 'react'
import { useCallback } from 'react'

import type { SystemLevel } from '@/types/gql/graphql'

import type { HierarchyNode } from '../../types'
import { TreeNode } from './TreeNode.comp'

interface SystemTreeComponentProps {
    nodes: HierarchyNode[]
    expandedNodes: string[]
    selectedParentUid: string | null
    onToggle: (uid: string) => void
    onSelect: (uid: string) => void
    search?: string
    copiedSystemUid?: string | null
    canEdit?: boolean
    onCopySystem?: (uid: string) => void
    onPasteSystem?: (uid: string) => void
    onCreateSubsystem?: (parentUid: string, parentName: string, parentLevel: SystemLevel) => void
    onDeleteSystem?: (uid: string, name: string) => void
}

export const SystemTreeComponent: FC<SystemTreeComponentProps> = ({
    nodes,
    expandedNodes,
    selectedParentUid,
    onToggle,
    onSelect,
    search,
    copiedSystemUid,
    canEdit,
    onCopySystem,
    onPasteSystem,
    onCreateSubsystem,
    onDeleteSystem,
}) => {
    const renderNode = useCallback(
        (node: HierarchyNode, depth: number) => {
            const isExpanded = expandedNodes.includes(node.uid)
            const isSelected = node.uid === selectedParentUid

            return (
                <TreeNode
                    key={node.uid}
                    node={node}
                    depth={depth}
                    isExpanded={isExpanded}
                    isSelected={isSelected}
                    onToggle={onToggle}
                    onSelect={onSelect}
                    search={search}
                    copiedSystemUid={copiedSystemUid}
                    canEdit={canEdit}
                    onCopySystem={onCopySystem}
                    onPasteSystem={onPasteSystem}
                    onCreateSubsystem={onCreateSubsystem}
                    onDeleteSystem={onDeleteSystem}
                >
                    {isExpanded && node.children.map(child => renderNode(child, depth + 1))}
                </TreeNode>
            )
        },
        [
            expandedNodes,
            selectedParentUid,
            onToggle,
            onSelect,
            search,
            copiedSystemUid,
            canEdit,
            onCopySystem,
            onPasteSystem,
            onCreateSubsystem,
            onDeleteSystem,
        ],
    )

    return <div className="py-1">{nodes.map(node => renderNode(node, 0))}</div>
}
