import type { FC } from 'react'
import { useCallback } from 'react'

import type { HierarchyNode } from '../../types'
import { TreeNode } from './TreeNode.comp'

interface SystemTreeComponentProps {
    nodes: HierarchyNode[]
    expandedNodes: string[]
    selectedParentUid: string | null
    onToggle: (uid: string) => void
    onSelect: (uid: string) => void
}

export const SystemTreeComponent: FC<SystemTreeComponentProps> = ({
    nodes,
    expandedNodes,
    selectedParentUid,
    onToggle,
    onSelect,
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
                >
                    {isExpanded && node.children.map(child => renderNode(child, depth + 1))}
                </TreeNode>
            )
        },
        [expandedNodes, selectedParentUid, onToggle, onSelect],
    )

    return <div className="py-1">{nodes.map(node => renderNode(node, 0))}</div>
}
