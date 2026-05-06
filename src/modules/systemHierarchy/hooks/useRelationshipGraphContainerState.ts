import { useCallback, useMemo, useState } from 'react'

import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import type { GraphLayoutMode, RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'
import { isNodeScopeKey, toGraphScopeKey } from '../utils/graphScope'
import { useRelationshipGraph } from './queries/useRelationshipGraph'
import type { GraphFiltersApi } from './useGraphFilters'
import { useHierarchyNavigation } from './useHierarchyNavigation'
import { useRelationshipGraphApiQuery } from './useRelationshipGraphApiQuery'
import { useRelationshipGraphExpansionActions } from './useRelationshipGraphExpansionActions'
import { useRelationshipGraphFlow } from './useRelationshipGraphFlow'
import { useRelationshipGraphInteractions } from './useRelationshipGraphInteractions'
import { useRelationshipGraphScopes } from './useRelationshipGraphScopes'
import { useRelationshipGraphViewModel } from './useRelationshipGraphViewModel'
import { useSystemCopyPaste } from './useSystemCopyPaste'

interface UseRelationshipGraphContainerStateParams {
    rootUid: string | null
    layoutMode: GraphLayoutMode
    setLayoutMode: (mode: GraphLayoutMode) => void
    expandedNodes: RelationshipGraphNode[]
    expandedEdges: RelationshipGraphEdge[]
    addExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    setExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    resetExpanded: () => void
    filtersHook: GraphFiltersApi
}

export const useRelationshipGraphContainerState = ({
    rootUid,
    layoutMode: storedLayoutMode,
    setLayoutMode: setStoredLayoutMode,
    expandedNodes,
    expandedEdges,
    addExpanded,
    setExpanded,
    resetExpanded,
    filtersHook,
}: UseRelationshipGraphContainerStateParams) => {
    const { selectLeaf } = useHierarchyNavigation()
    const { openModal } = useDynamicModalStore()
    const openSystemEdit = useSystemEditSheet()
    const [fitViewVersion, setFitViewVersion] = useState(0)
    const onGraphChanged = useCallback(() => {
        setFitViewVersion(version => version + 1)
    }, [])

    const graphUid = rootUid
    const graphScopeKey = useMemo(() => toGraphScopeKey(graphUid), [graphUid])

    const {
        filters,
        setSearch,
        toggleSystemLevel,
        setSystemType,
        toggleRelationshipType,
        resetFilters,
    } = filtersHook
    const { apiFilterQuery, filterQueryKey, initialScopeQuery } =
        useRelationshipGraphApiQuery(filters)

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
        graphUid,
        filterQueryKey,
        graphScopeKey,
        apiMeta,
        resetGraphExpanded: resetExpanded,
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
        graphExpandedNodes: expandedNodes,
        graphExpandedEdges: expandedEdges,
        graphUid,
        expandedScopeUids,
        filters,
        scopeStates,
        activeScopeKey,
        graphScopeKey,
        loadMoreLoading,
    })

    const { handleContextMenuChange, handleViewDetail, handleNodeClick, handleEdgeClick } =
        useRelationshipGraphInteractions({
            mergedNodes,
            mergedEdges,
            selectLeaf,
            openSystemEdit,
            openModal,
        })

    const { handleExpand, handleLoadMore, handleNodeLoadMore } =
        useRelationshipGraphExpansionActions({
            apiFilterQuery,
            initialScopeQuery,
            graphScopeKey,
            expandedScopeUids,
            activeScopeKey,
            scopeStates,
            relationshipTypeFilters: filters.relationshipTypes,
            addGraphExpanded: addExpanded,
            setGraphExpanded: setExpanded,
            registerExpandedScopeUid,
            setNodeScopeMeta,
            setNodeScopesMeta,
            applyPageToScopeState,
            setLoadMoreTypeLoading,
            setActiveScopeKey,
            onGraphChanged,
        })

    const { copiedSystemUid, canEdit, handleCopySystem, handlePasteSystem } = useSystemCopyPaste({
        onExpandNode: handleExpand,
    })

    const { layoutMode, systemLevels, rfNodes, rfEdges, handleLayoutChange } =
        useRelationshipGraphFlow({
            visibleNodes,
            filteredEdges,
            hiddenRelationshipsByNodeUid,
            graphLayoutMode: storedLayoutMode,
            setGraphLayoutMode: setStoredLayoutMode,
            onExpand: handleExpand,
            onNodeLoadMore: handleNodeLoadMore,
            onViewDetail: handleViewDetail,
            onContextMenuChange: handleContextMenuChange,
            onCopySystem: canEdit ? handleCopySystem : undefined,
            onPasteSystem: canEdit ? handlePasteSystem : undefined,
            copiedSystemUid,
            onGraphChanged,
        })

    const onBackToGraph = useCallback(() => {
        setActiveScopeKey(graphScopeKey)
    }, [graphScopeKey, setActiveScopeKey])

    const headerProps = useMemo(
        () => ({
            filters,
            systemTypes,
            systemLevels,
            layoutMode,
            onLayoutChange: handleLayoutChange,
            onSearchChange: setSearch,
            onToggleSystemLevel: toggleSystemLevel,
            onSystemTypeChange: setSystemType,
            onToggleRelationshipType: toggleRelationshipType,
            onResetFilters: resetFilters,
        }),
        [
            filters,
            systemTypes,
            systemLevels,
            layoutMode,
            handleLayoutChange,
            setSearch,
            toggleSystemLevel,
            setSystemType,
            toggleRelationshipType,
            resetFilters,
        ],
    )

    const canvasProps = useMemo(
        () => ({
            nodes: rfNodes,
            edges: rfEdges,
            isLoading: isLoading && !hasGraphData,
            isRefreshing: isFetching && hasGraphData,
            isRelationshipFilterActive: shouldFilterDisconnectedNodes,
            fitViewVersion,
            hiddenTotal: visibleHiddenTotal,
            rows: loadMoreRows,
            showBackToGraph: isNodeScopeKey(activeScopeKey ?? graphScopeKey),
            onBackToGraph,
            onLoadMore: handleLoadMore,
            onNodeClick: handleNodeClick,
            onEdgeClick: handleEdgeClick,
        }),
        [
            rfNodes,
            rfEdges,
            isLoading,
            hasGraphData,
            isFetching,
            shouldFilterDisconnectedNodes,
            fitViewVersion,
            visibleHiddenTotal,
            loadMoreRows,
            activeScopeKey,
            graphScopeKey,
            onBackToGraph,
            handleLoadMore,
            handleNodeClick,
            handleEdgeClick,
        ],
    )

    return {
        headerProps,
        canvasProps,
    }
}
