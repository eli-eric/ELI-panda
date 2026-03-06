import type { Edge, Node } from '@xyflow/react'
import type { ComponentType, MouseEvent } from 'react'
import { useCallback, useRef } from 'react'

import { EdgeDetailSheet } from '../components/graph/EdgeDetailSheet.comp'
import type { RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'

interface UseRelationshipGraphInteractionsParams {
    mergedNodes: RelationshipGraphNode[]
    mergedEdges: RelationshipGraphEdge[]
    selectLeaf: (uid: string) => void
    openSystemEdit: (uid: string) => void
    openModal: (
        type: 'sheet' | 'dialog',
        config: {
            id?: string
            component: ComponentType<any>
            props?: Record<string, unknown>
        },
    ) => string
}

interface UseRelationshipGraphInteractionsResult {
    handleContextMenuChange: (open: boolean) => void
    handleViewDetail: (uid: string) => void
    handleNodeClick: (_event: MouseEvent, node: Node) => void
    handleEdgeClick: (_event: MouseEvent, edge: Edge) => void
}

export const useRelationshipGraphInteractions = ({
    mergedNodes,
    mergedEdges,
    selectLeaf,
    openSystemEdit,
    openModal,
}: UseRelationshipGraphInteractionsParams): UseRelationshipGraphInteractionsResult => {
    const contextMenuCloseRef = useRef(0)

    const handleContextMenuChange = useCallback((open: boolean) => {
        if (!open) contextMenuCloseRef.current = Date.now()
    }, [])

    const handleViewDetail = useCallback(
        (uid: string) => {
            selectLeaf(uid)
        },
        [selectLeaf],
    )

    const handleNodeClick = useCallback(
        (_event: MouseEvent, node: Node) => {
            if (Date.now() - contextMenuCloseRef.current < 300) return
            openSystemEdit(node.id)
        },
        [openSystemEdit],
    )

    const handleEdgeClick = useCallback(
        (_event: MouseEvent, edge: Edge) => {
            const apiEdge = mergedEdges.find(item => item.uid === edge.id)
            if (!apiEdge) return

            const sourceNode = mergedNodes.find(item => item.uid === apiEdge.source)
            const targetNode = mergedNodes.find(item => item.uid === apiEdge.target)

            openModal('sheet', {
                id: `edge-detail-${edge.id}`,
                component: EdgeDetailSheet,
                props: {
                    edge: apiEdge,
                    sourceName: sourceNode?.name ?? apiEdge.source,
                    targetName: targetNode?.name ?? apiEdge.target,
                    side: 'right',
                },
            })
        },
        [mergedEdges, mergedNodes, openModal],
    )

    return {
        handleContextMenuChange,
        handleViewDetail,
        handleNodeClick,
        handleEdgeClick,
    }
}
