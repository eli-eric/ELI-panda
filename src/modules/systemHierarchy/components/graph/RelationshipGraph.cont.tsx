import { type Edge, type Node } from '@xyflow/react'
import { Controls, MiniMap, ReactFlowProvider } from '@xyflow/react'
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { useRelationshipGraphApiQuery } from '@/modules/systemHierarchy/hooks/useRelationshipGraphApiQuery'
import { useRelationshipGraphExpansionActions } from '@/modules/systemHierarchy/hooks/useRelationshipGraphExpansionActions'
import { useRelationshipGraphScopes } from '@/modules/systemHierarchy/hooks/useRelationshipGraphScopes'
import { useRelationshipGraphViewModel } from '@/modules/systemHierarchy/hooks/useRelationshipGraphViewModel'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useRelationshipGraph } from '../../hooks/queries/useRelationshipGraph'
import { useGraphFilters } from '../../hooks/useGraphFilters'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import type { GraphLayoutMode } from '../../types/graph'
import { GRAPH_LAYOUT_MODES } from '../../types/graph'
import { SYSTEM_LEVEL_LABELS } from '../../utils/graphColors'
import { applyHorizontalLayout, applyVerticalLayout } from '../../utils/graphLayout'
import { toGraphScopeKey } from '../../utils/graphScope'
import { toReactFlowEdges, toReactFlowNodes } from '../../utils/graphTransformers'
import { EdgeDetailSheet } from './EdgeDetailSheet.comp'
import { GraphLegend } from './GraphLegend.comp'
import { GraphToolbar } from './GraphToolbar.comp'
import { LayoutSwitcher } from './LayoutSwitcher.comp'
import { RelationshipEdge } from './RelationshipEdge.comp'
import { RelationshipGraphComponent } from './RelationshipGraph.comp'
import { RelationshipLoadMorePanel } from './RelationshipLoadMorePanel.comp'
import { SystemNode } from './SystemNode.comp'

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
        setGraphExpanded,
        resetGraphExpanded,
    } = useHierarchyStore()

    const [layoutMode, setLayoutMode] = useState<GraphLayoutMode>(graphLayoutMode)
    const [fitViewVersion, setFitViewVersion] = useState(0)
    const contextMenuCloseRef = useRef(0)
    const prevGraphSizeRef = useRef({ nodes: 0, edges: 0 })

    const { openModal } = useDynamicModalStore()
    const openSystemEdit = useSystemEditSheet()

    const {
        filters,
        setSearch,
        toggleSystemLevel,
        setSystemType,
        toggleRelationshipType,
        resetFilters,
    } = useGraphFilters()

    const { apiFilterQuery, filterQueryKey, initialScopeQuery } =
        useRelationshipGraphApiQuery(filters)

    const graphUid = selectedParentUid

    const {
        nodes: apiNodes,
        edges: apiEdges,
        meta: apiMeta,
        isLoading,
        isFetching,
    } = useRelationshipGraph({
        systemUid: graphUid,
        query: apiFilterQuery,
        paged: true,
    })

    const graphScopeKey = useMemo(() => toGraphScopeKey(graphUid), [graphUid])

    const {
        scopeStates,
        activeScopeKey,
        loadMoreLoading,
        expandedScopeUids,
        registerExpandedScopeUid,
        setActiveScopeKey,
        setNodeScopeMeta,
        setNodeScopesMeta,
        applyPageToScopeState,
        setLoadMoreTypeLoading,
    } = useRelationshipGraphScopes({
        selectedParentUid,
        filterQueryKey,
        graphScopeKey,
        apiMeta,
        resetGraphExpanded,
    })

    const {
        mergedNodes,
        mergedEdges,
        visibleNodes,
        filteredEdges,
        hasGraphData,
        shouldFilterDisconnectedNodes,
        hiddenRelationshipsByNodeUid,
        loadMoreRows,
        visibleHiddenTotal,
        systemTypes,
    } = useRelationshipGraphViewModel({
        apiNodes,
        apiEdges,
        graphExpandedNodes,
        graphExpandedEdges,
        graphUid,
        expandedScopeUids,
        filters,
        scopeStates,
        activeScopeKey,
        graphScopeKey,
        loadMoreLoading,
    })

    const incrementFitViewVersion = useCallback(() => {
        setFitViewVersion(version => version + 1)
    }, [])

    const { handleExpand, handleLoadMore, handleNodeLoadMore } =
        useRelationshipGraphExpansionActions({
            apiFilterQuery,
            initialScopeQuery,
            graphScopeKey,
            expandedScopeUids,
            activeScopeKey,
            scopeStates,
            relationshipTypeFilters: filters.relationshipTypes,
            addGraphExpanded,
            setGraphExpanded,
            registerExpandedScopeUid,
            setNodeScopeMeta,
            setNodeScopesMeta,
            applyPageToScopeState,
            setLoadMoreTypeLoading,
            setActiveScopeKey,
            onGraphChanged: incrementFitViewVersion,
        })

    const isInitialLoading = isLoading && !hasGraphData
    const isRefreshing = isFetching && hasGraphData

    const handleContextMenuChange = useCallback((open: boolean) => {
        if (!open) contextMenuCloseRef.current = Date.now()
    }, [])

    const handleViewDetail = useCallback(
        (uid: string) => {
            selectLeaf(uid)
        },
        [selectLeaf],
    )

    const rawNodes = useMemo(
        () =>
            toReactFlowNodes(visibleNodes, {
                layoutMode,
                onExpand: handleExpand,
                onLoadMore: handleNodeLoadMore,
                onViewDetail: handleViewDetail,
                onContextMenuChange: handleContextMenuChange,
                hiddenRelationshipsByNodeUid,
            }),
        [
            visibleNodes,
            layoutMode,
            handleExpand,
            handleNodeLoadMore,
            handleViewDetail,
            handleContextMenuChange,
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
            setLayoutMode(mode)
            setGraphLayoutMode(mode)
            incrementFitViewVersion()
        },
        [incrementFitViewVersion, setGraphLayoutMode],
    )

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
        incrementFitViewVersion()
    }, [incrementFitViewVersion, rfNodes.length, rfEdges.length])

    const handleNodeClick = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            if (Date.now() - contextMenuCloseRef.current < 300) return
            openSystemEdit(node.id)
        },
        [openSystemEdit],
    )

    const handleEdgeClick = useCallback(
        (_event: React.MouseEvent, edge: Edge) => {
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

    const showBackToGraph = (activeScopeKey ?? graphScopeKey).startsWith('node:')

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
                        isLoading={isInitialLoading}
                        isRefreshing={isRefreshing}
                        isRelationshipFilterActive={shouldFilterDisconnectedNodes}
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
                <RelationshipLoadMorePanel
                    hiddenTotal={visibleHiddenTotal}
                    rows={loadMoreRows}
                    showBackToGraph={showBackToGraph}
                    onBackToGraph={() => setActiveScopeKey(graphScopeKey)}
                    onLoadMore={handleLoadMore}
                />
                <GraphLegend />
            </div>
        </div>
    )
}
