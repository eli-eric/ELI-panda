import type { Edge, Node } from '@xyflow/react'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import type { GraphLayoutMode, RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'
import { GRAPH_LAYOUT_MODES } from '../types/graph'
import { SYSTEM_LEVEL_LABELS } from '../utils/graphColors'
import { applyHorizontalLayout, applyVerticalLayout } from '../utils/graphLayout'
import { toReactFlowEdges, toReactFlowNodes } from '../utils/graphTransformers'

interface UseRelationshipGraphFlowParams {
    visibleNodes: RelationshipGraphNode[]
    filteredEdges: RelationshipGraphEdge[]
    hiddenRelationshipsByNodeUid: Record<string, number>
    graphLayoutMode: GraphLayoutMode
    setGraphLayoutMode: (mode: GraphLayoutMode) => void
    onExpand: (uid: string) => void
    onNodeLoadMore: (uid: string) => void
    onViewDetail: (uid: string) => void
    onContextMenuChange: (open: boolean) => void
    onGraphChanged: () => void
}

interface UseRelationshipGraphFlowResult {
    layoutMode: GraphLayoutMode
    systemLevels: string[]
    rfNodes: Node[]
    rfEdges: Edge[]
    handleLayoutChange: (mode: GraphLayoutMode) => void
}

export const useRelationshipGraphFlow = ({
    visibleNodes,
    filteredEdges,
    hiddenRelationshipsByNodeUid,
    graphLayoutMode,
    setGraphLayoutMode,
    onExpand,
    onNodeLoadMore,
    onViewDetail,
    onContextMenuChange,
    onGraphChanged,
}: UseRelationshipGraphFlowParams): UseRelationshipGraphFlowResult => {
    const layoutMode = graphLayoutMode
    const prevLayoutModeRef = useRef(graphLayoutMode)
    const prevGraphSizeRef = useRef({ nodes: 0, edges: 0 })

    const rawNodes = useMemo(
        () =>
            toReactFlowNodes(visibleNodes, {
                layoutMode,
                onExpand,
                onLoadMore: onNodeLoadMore,
                onViewDetail,
                onContextMenuChange,
                hiddenRelationshipsByNodeUid,
            }),
        [
            visibleNodes,
            layoutMode,
            onExpand,
            onNodeLoadMore,
            onViewDetail,
            onContextMenuChange,
            hiddenRelationshipsByNodeUid,
        ],
    )

    const rfEdges = useMemo(() => toReactFlowEdges(filteredEdges), [filteredEdges])

    const rfNodes = useMemo(() => {
        if (layoutMode === GRAPH_LAYOUT_MODES.HORIZONTAL) {
            return applyHorizontalLayout(rawNodes, rfEdges)
        }

        return applyVerticalLayout(rawNodes, rfEdges)
    }, [rawNodes, rfEdges, layoutMode])

    const systemLevels = useMemo(() => Object.keys(SYSTEM_LEVEL_LABELS), [])

    const handleLayoutChange = useCallback(
        (mode: GraphLayoutMode) => {
            if (mode === graphLayoutMode) return
            setGraphLayoutMode(mode)
        },
        [graphLayoutMode, setGraphLayoutMode],
    )

    useEffect(() => {
        if (prevLayoutModeRef.current === graphLayoutMode) return

        prevLayoutModeRef.current = graphLayoutMode
        onGraphChanged()
    }, [graphLayoutMode, onGraphChanged])

    useEffect(() => {
        const nextGraphSize = { nodes: rfNodes.length, edges: rfEdges.length }
        const previousGraphSize = prevGraphSizeRef.current
        if (
            previousGraphSize.nodes === nextGraphSize.nodes &&
            previousGraphSize.edges === nextGraphSize.edges
        ) {
            return
        }

        prevGraphSizeRef.current = nextGraphSize
        onGraphChanged()
    }, [onGraphChanged, rfNodes.length, rfEdges.length])

    return {
        layoutMode,
        systemLevels,
        rfNodes,
        rfEdges,
        handleLayoutChange,
    }
}
