import { useQueryClient } from '@tanstack/react-query'
import type { Edge, Node } from '@xyflow/react'
import { Controls, MiniMap, ReactFlowProvider } from '@xyflow/react'
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { queryFetcher } from '@/utils/fetcher'

import { useRelationshipGraph } from '../../hooks/queries/useRelationshipGraph'
import { useGraphFilters } from '../../hooks/useGraphFilters'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import { RELATIONSHIP_GRAPH_QUERY_KEY } from '../../types/constants'
import type { GraphLayoutMode, RelationshipGraphResponse } from '../../types/graph'
import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import { filterEdges, filterNodes } from '../../utils/graphFilters'
import { applyHorizontalLayout, applyVerticalLayout } from '../../utils/graphLayout'
import { toReactFlowEdges, toReactFlowNodes } from '../../utils/graphTransformers'
import { EdgeDetailSheet } from './EdgeDetailSheet.comp'
import { GraphLegend } from './GraphLegend.comp'
import { GraphToolbar } from './GraphToolbar.comp'
import { LayoutSwitcher } from './LayoutSwitcher.comp'
import { RelationshipEdge } from './RelationshipEdge.comp'
import { RelationshipGraphComponent } from './RelationshipGraph.comp'
import { SystemNode } from './SystemNode.comp'

// Define nodeTypes/edgeTypes outside component to prevent re-renders
const nodeTypes = { systemNode: SystemNode }
const edgeTypes = { relationshipEdge: RelationshipEdge }

export const RelationshipGraphContainer: FC = () => {
    const { selectedParentUid, selectLeaf } = useHierarchyNavigation()
    const {
        graphLayoutMode,
        setGraphLayoutMode,
        graphExpandedNodes,
        graphExpandedEdges,
        addGraphExpanded,
        resetGraphExpanded,
    } = useHierarchyStore()
    const [layoutMode, setLayoutMode] = useState<GraphLayoutMode>(graphLayoutMode)
    const [fitViewVersion, setFitViewVersion] = useState(0)
    const contextMenuCloseRef = useRef(0)

    const { openModal } = useDynamicModalStore()
    const queryClient = useQueryClient()
    const openSystemEdit = useSystemEditSheet()

    const graphUid = selectedParentUid
    const {
        nodes: apiNodes,
        edges: apiEdges,
        isLoading,
    } = useRelationshipGraph({
        systemUid: graphUid,
    })

    // Merge API data with expanded subgraph data
    const mergedNodes = useMemo(() => {
        const seen = new Set(apiNodes.map(n => n.uid))
        return [...apiNodes, ...graphExpandedNodes.filter(n => !seen.has(n.uid))]
    }, [apiNodes, graphExpandedNodes])

    const mergedEdges = useMemo(() => {
        const seen = new Set(apiEdges.map(e => e.uid))
        return [...apiEdges, ...graphExpandedEdges.filter(e => !seen.has(e.uid))]
    }, [apiEdges, graphExpandedEdges])

    // Reset expanded data only when parent actually changes (not on remount)
    const prevParentRef = useRef(selectedParentUid)
    useEffect(() => {
        if (prevParentRef.current !== selectedParentUid) {
            prevParentRef.current = selectedParentUid
            resetGraphExpanded()
        }
    }, [selectedParentUid, resetGraphExpanded])

    const {
        filters,
        setSearch,
        toggleSystemLevel,
        setSystemType,
        toggleRelationshipType,
        resetFilters,
    } = useGraphFilters()

    // Apply filters
    const filteredNodes = useMemo(() => filterNodes(mergedNodes, filters), [mergedNodes, filters])
    const visibleNodeUids = useMemo(() => new Set(filteredNodes.map(n => n.uid)), [filteredNodes])
    const filteredEdges = useMemo(
        () => filterEdges(mergedEdges, visibleNodeUids, filters),
        [mergedEdges, visibleNodeUids, filters],
    )
    // Expand handler — fetches subgraph for a node and merges into store
    const handleExpand = useCallback(
        async (uid: string) => {
            try {
                const data = await queryClient.fetchQuery({
                    queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY, { query: { uid } }],
                    queryFn: queryFetcher<RelationshipGraphResponse>('relationshipGraph'),
                })
                addGraphExpanded(data.nodes, data.links)
                setFitViewVersion(v => v + 1)
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Failed to expand graph: ${error.message}`
                        : 'Failed to expand graph',
                )
            }
        },
        [queryClient, addGraphExpanded],
    )

    const handleContextMenuChange = useCallback((open: boolean) => {
        if (!open) contextMenuCloseRef.current = Date.now()
    }, [])

    const handleViewDetail = useCallback(
        (uid: string) => {
            selectLeaf(uid)
        },
        [selectLeaf],
    )

    // Transform to ReactFlow format
    const rawNodes = useMemo(
        () =>
            toReactFlowNodes(filteredNodes, {
                layoutMode,
                onExpand: handleExpand,
                onViewDetail: handleViewDetail,
                onContextMenuChange: handleContextMenuChange,
            }),
        [filteredNodes, layoutMode, handleExpand, handleViewDetail, handleContextMenuChange],
    )
    const rfEdges = useMemo(() => toReactFlowEdges(filteredEdges), [filteredEdges])

    // Apply layout
    const rfNodes = useMemo(() => {
        if (layoutMode === GRAPH_LAYOUT_MODES.HORIZONTAL) {
            return applyHorizontalLayout(rawNodes, rfEdges)
        }
        return applyVerticalLayout(rawNodes, rfEdges)
    }, [rawNodes, rfEdges, layoutMode])

    // Extract unique values for filter dropdowns
    const systemTypes = useMemo(
        () => [...new Set(mergedNodes.map(n => n.systemType?.name).filter(Boolean))] as string[],
        [mergedNodes],
    )
    const systemLevels = useMemo(
        () => [...new Set(mergedNodes.map(n => n.systemLevel).filter(Boolean))] as string[],
        [mergedNodes],
    )
    const handleLayoutChange = useCallback(
        (mode: GraphLayoutMode) => {
            setLayoutMode(mode)
            setGraphLayoutMode(mode)
            setFitViewVersion(v => v + 1)
        },
        [setGraphLayoutMode],
    )

    useEffect(() => {
        setFitViewVersion(v => v + 1)
    }, [rfNodes, rfEdges])

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            if (Date.now() - contextMenuCloseRef.current < 300) return
            openSystemEdit(node.id)
        },
        [openSystemEdit],
    )

    const handleEdgeClick = useCallback(
        (_event: React.MouseEvent, edge: Edge) => {
            const apiEdge = mergedEdges.find(e => e.uid === edge.id)
            if (!apiEdge) return

            const sourceNode = mergedNodes.find(n => n.uid === apiEdge.source)
            const targetNode = mergedNodes.find(n => n.uid === apiEdge.target)

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

    return (
        <div className="h-full w-full flex flex-col">
            <GraphToolbar
                filters={filters}
                onSearchChange={setSearch}
                onToggleSystemLevel={toggleSystemLevel}
                onSystemTypeChange={setSystemType}
                onToggleRelationshipType={toggleRelationshipType}
                onResetFilters={resetFilters}
                systemTypes={systemTypes}
                systemLevels={systemLevels}
            >
                <LayoutSwitcher activeLayout={layoutMode} onLayoutChange={handleLayoutChange} />
            </GraphToolbar>
            <div className="flex-1 relative">
                <ReactFlowProvider>
                    <RelationshipGraphComponent
                        nodes={rfNodes}
                        edges={rfEdges}
                        isLoading={isLoading}
                        onNodeClick={handleNodeClick}
                        onEdgeClick={handleEdgeClick}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        fitViewVersion={fitViewVersion}
                    >
                        <Controls />
                        <MiniMap nodeStrokeWidth={3} className="!bg-background !border-border" />
                    </RelationshipGraphComponent>
                </ReactFlowProvider>
                <GraphLegend />
            </div>
        </div>
    )
}
