import { useMemo } from 'react'

import type { RelationshipGraphEdge, RelationshipGraphNode } from '../types/graph'
import {
    filterConnectedNodes,
    filterEdges,
    filterNodes,
    getConnectedNodeUids,
    type GraphFilterState,
} from '../utils/graphFilters'
import type { ScopeState } from '../utils/graphScope'
import { compareRelationshipTypesByRank, isNodeScopeKey, scopeKeyToUid } from '../utils/graphScope'

interface LoadMoreRow {
    type: string
    shown: number
    total: number
    isLoading: boolean
}

interface UseRelationshipGraphViewModelParams {
    apiNodes: RelationshipGraphNode[]
    apiEdges: RelationshipGraphEdge[]
    graphExpandedNodes: RelationshipGraphNode[]
    graphExpandedEdges: RelationshipGraphEdge[]
    graphUid: string | null
    expandedScopeUids: string[]
    filters: GraphFilterState
    scopeStates: Record<string, ScopeState>
    activeScopeKey: string | null
    graphScopeKey: string
    loadMoreLoading: Record<string, boolean>
}

interface UseRelationshipGraphViewModelResult {
    mergedNodes: RelationshipGraphNode[]
    mergedEdges: RelationshipGraphEdge[]
    visibleNodes: RelationshipGraphNode[]
    filteredEdges: RelationshipGraphEdge[]
    hasGraphData: boolean
    shouldFilterDisconnectedNodes: boolean
    hiddenRelationshipsByNodeUid: Record<string, number>
    loadMoreRows: LoadMoreRow[]
    visibleHiddenTotal: number
    systemTypes: string[]
}

export const useRelationshipGraphViewModel = ({
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
}: UseRelationshipGraphViewModelParams): UseRelationshipGraphViewModelResult => {
    const mergedNodes = useMemo(() => {
        const seen = new Set(apiNodes.map(node => node.uid))
        return [...apiNodes, ...graphExpandedNodes.filter(node => !seen.has(node.uid))]
    }, [apiNodes, graphExpandedNodes])

    const mergedEdges = useMemo(() => {
        const seen = new Set(apiEdges.map(edge => edge.uid))
        return [...apiEdges, ...graphExpandedEdges.filter(edge => !seen.has(edge.uid))]
    }, [apiEdges, graphExpandedEdges])

    const hasGraphData = mergedNodes.length > 0 || mergedEdges.length > 0

    const pinnedNodeUids = useMemo(() => {
        const pinned = new Set<string>()
        if (graphUid) pinned.add(graphUid)
        expandedScopeUids.forEach(uid => pinned.add(uid))
        return pinned
    }, [expandedScopeUids, graphUid])

    const filteredNodes = useMemo(
        () => filterNodes(mergedNodes, filters, pinnedNodeUids),
        [mergedNodes, filters, pinnedNodeUids],
    )

    const visibleNodeUids = useMemo(
        () => new Set(filteredNodes.map(node => node.uid)),
        [filteredNodes],
    )
    const filteredEdges = useMemo(
        () => filterEdges(mergedEdges, visibleNodeUids, filters),
        [mergedEdges, visibleNodeUids, filters],
    )

    const shouldFilterDisconnectedNodes = filters.relationshipTypes.length > 0
    const connectedNodeUids = useMemo(() => getConnectedNodeUids(filteredEdges), [filteredEdges])

    const visibleNodes = useMemo(
        () => filterConnectedNodes(filteredNodes, connectedNodeUids, shouldFilterDisconnectedNodes),
        [filteredNodes, connectedNodeUids, shouldFilterDisconnectedNodes],
    )

    const activeScope = useMemo(
        () => (activeScopeKey ? scopeStates[activeScopeKey] : scopeStates[graphScopeKey]),
        [activeScopeKey, scopeStates, graphScopeKey],
    )

    const hiddenRelationshipsByNodeUid = useMemo(
        () =>
            Object.entries(scopeStates).reduce<Record<string, number>>((acc, [scopeKey, scope]) => {
                if (!isNodeScopeKey(scopeKey)) return acc

                const nodeUid = scopeKeyToUid(scopeKey)
                if (!nodeUid) return acc

                if (scope.hiddenLinksTotal > 0) {
                    acc[nodeUid] = scope.hiddenLinksTotal
                }

                return acc
            }, {}),
        [scopeStates],
    )

    const loadMoreRows = useMemo(() => {
        if (!activeScope) return []

        const relationshipFilterSet =
            filters.relationshipTypes.length > 0 ? new Set(filters.relationshipTypes) : null
        const scopeKey = activeScopeKey ?? graphScopeKey

        return Object.entries(activeScope.relationshipStats)
            .filter(([, stat]) => stat.hasMore)
            .filter(([type]) => !relationshipFilterSet || relationshipFilterSet.has(type))
            .sort(([typeA], [typeB]) => compareRelationshipTypesByRank(typeA, typeB))
            .map(([type, stat]) => ({
                type,
                shown: stat.returned,
                total: stat.total,
                isLoading: !!loadMoreLoading[`${scopeKey}:${type}`],
            }))
    }, [activeScope, activeScopeKey, filters.relationshipTypes, graphScopeKey, loadMoreLoading])

    const visibleHiddenTotal = useMemo(
        () => loadMoreRows.reduce((total, row) => total + Math.max(row.total - row.shown, 0), 0),
        [loadMoreRows],
    )

    const systemTypes = useMemo(
        () =>
            [
                ...new Set(mergedNodes.map(node => node.systemType?.name).filter(Boolean)),
            ] as string[],
        [mergedNodes],
    )

    return {
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
    }
}
