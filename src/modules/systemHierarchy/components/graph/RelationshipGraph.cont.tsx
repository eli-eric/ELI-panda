import { useQueryClient } from '@tanstack/react-query'
import type { Edge, Node } from '@xyflow/react'
import { Controls, MiniMap, ReactFlowProvider } from '@xyflow/react'
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'
import { useSystemEditSheet } from '@/modules/shared/system/system-edit/useSystemEditSheet'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { queryFetcher } from '@/utils/fetcher'

import { useRelationshipGraph } from '../../hooks/queries/useRelationshipGraph'
import { useGraphFilters } from '../../hooks/useGraphFilters'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import {
    RELATIONSHIP_GRAPH_INITIAL_LIMIT,
    RELATIONSHIP_GRAPH_LOAD_MORE_LIMIT,
    RELATIONSHIP_GRAPH_QUERY_KEY,
} from '../../types/constants'
import type {
    GraphLayoutMode,
    RelationshipGraphMeta,
    RelationshipGraphPage,
    RelationshipGraphStat,
} from '../../types/graph'
import {
    DEFAULT_RELATIONSHIP_RANK,
    GRAPH_LAYOUT_MODES,
    RELATIONSHIP_TYPE_RANK,
} from '../../types/graph'
import { SYSTEM_LEVEL_LABELS } from '../../utils/graphColors'
import {
    filterConnectedNodes,
    filterEdges,
    filterNodes,
    getConnectedNodeUids,
} from '../../utils/graphFilters'
import { applyHorizontalLayout, applyVerticalLayout } from '../../utils/graphLayout'
import {
    fromSystemGraphResponse,
    toReactFlowEdges,
    toReactFlowNodes,
} from '../../utils/graphTransformers'
import { EdgeDetailSheet } from './EdgeDetailSheet.comp'
import { GraphLegend } from './GraphLegend.comp'
import { GraphToolbar } from './GraphToolbar.comp'
import { LayoutSwitcher } from './LayoutSwitcher.comp'
import { RelationshipEdge } from './RelationshipEdge.comp'
import { RelationshipGraphComponent } from './RelationshipGraph.comp'
import { RelationshipLoadMorePanel } from './RelationshipLoadMorePanel.comp'
import { SystemNode } from './SystemNode.comp'

// Define nodeTypes/edgeTypes outside component to prevent re-renders
const nodeTypes = { systemNode: SystemNode }
const edgeTypes = { relationshipEdge: RelationshipEdge }

type ScopeStats = Record<string, RelationshipGraphStat>

interface ScopeState {
    relationshipStats: ScopeStats
    hiddenLinksTotal: number
}

const getHiddenLinksTotal = (stats: ScopeStats) =>
    Object.values(stats).reduce((total, stat) => total + Math.max(stat.total - stat.returned, 0), 0)

const toScopeState = (meta?: RelationshipGraphMeta): ScopeState => {
    const relationshipStats = meta?.relationshipStats ?? {}
    return {
        relationshipStats,
        hiddenLinksTotal: getHiddenLinksTotal(relationshipStats),
    }
}

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
    const [scopeStates, setScopeStates] = useState<Record<string, ScopeState>>({})
    const [activeScopeKey, setActiveScopeKey] = useState<string | null>(null)
    const [loadMoreLoading, setLoadMoreLoading] = useState<Record<string, boolean>>({})
    const [expandedScopeUids, setExpandedScopeUids] = useState<string[]>([])

    const { openModal } = useDynamicModalStore()
    const queryClient = useQueryClient()
    const openSystemEdit = useSystemEditSheet()

    const {
        filters,
        setSearch,
        toggleSystemLevel,
        setSystemType,
        toggleRelationshipType,
        resetFilters,
    } = useGraphFilters()

    const apiFilterQuery = useMemo(() => {
        const query: Record<string, string> = {}
        const trimmedSearch = filters.search.trim()

        if (trimmedSearch) query.search = trimmedSearch
        if (filters.systemLevels.length > 0) {
            query.systemLevels = [...filters.systemLevels].sort().join(',')
        }
        if (filters.systemType) query.systemType = filters.systemType
        if (filters.relationshipTypes.length > 0) {
            query.relationshipTypes = [...filters.relationshipTypes].sort().join(',')
        }

        return query
    }, [filters.relationshipTypes, filters.search, filters.systemLevels, filters.systemType])
    const filterQueryKey = useMemo(() => JSON.stringify(apiFilterQuery), [apiFilterQuery])

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

    const graphScopeKey = useMemo(
        () => (graphUid ? `graph:${graphUid}` : 'graph:unknown'),
        [graphUid],
    )
    const previousFilterQueryKeyRef = useRef(filterQueryKey)

    // Merge API data with expanded subgraph data
    const mergedNodes = useMemo(() => {
        const seen = new Set(apiNodes.map(n => n.uid))
        return [...apiNodes, ...graphExpandedNodes.filter(n => !seen.has(n.uid))]
    }, [apiNodes, graphExpandedNodes])

    const mergedEdges = useMemo(() => {
        const seen = new Set(apiEdges.map(e => e.uid))
        return [...apiEdges, ...graphExpandedEdges.filter(e => !seen.has(e.uid))]
    }, [apiEdges, graphExpandedEdges])
    const hasGraphData = mergedNodes.length > 0 || mergedEdges.length > 0
    const isInitialLoading = isLoading && !hasGraphData
    const isRefreshing = isFetching && hasGraphData

    // Reset expanded data only when parent actually changes (not on remount)
    const prevParentRef = useRef(selectedParentUid)
    useEffect(() => {
        if (prevParentRef.current !== selectedParentUid) {
            prevParentRef.current = selectedParentUid
            resetGraphExpanded()
            setExpandedScopeUids([])
            setScopeStates({})
            setLoadMoreLoading({})
        }
    }, [selectedParentUid, resetGraphExpanded])

    useEffect(() => {
        if (previousFilterQueryKeyRef.current === filterQueryKey) return

        previousFilterQueryKeyRef.current = filterQueryKey
        setLoadMoreLoading({})
        setScopeStates({})
        setActiveScopeKey(graphScopeKey)
    }, [filterQueryKey, graphScopeKey])

    useEffect(() => {
        setActiveScopeKey(graphScopeKey)
    }, [graphScopeKey])

    useEffect(() => {
        if (!apiMeta) return
        setScopeStates(prev => {
            const nextScope = toScopeState(apiMeta)
            const previousScope = prev[graphScopeKey]
            if (!previousScope) {
                return { ...prev, [graphScopeKey]: nextScope }
            }

            const mergedStats = Object.entries(nextScope.relationshipStats).reduce<ScopeStats>(
                (acc, [type, stat]) => {
                    const previousTypeStat = previousScope.relationshipStats[type]
                    const returned = previousTypeStat
                        ? Math.max(previousTypeStat.returned, stat.returned)
                        : stat.returned
                    acc[type] = {
                        total: stat.total,
                        returned,
                        hasMore: returned < stat.total,
                    }
                    return acc
                },
                { ...previousScope.relationshipStats },
            )

            return {
                ...prev,
                [graphScopeKey]: {
                    relationshipStats: mergedStats,
                    hiddenLinksTotal: getHiddenLinksTotal(mergedStats),
                },
            }
        })
    }, [apiMeta, graphScopeKey])

    // Apply filters
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
    const visibleNodeUids = useMemo(() => new Set(filteredNodes.map(n => n.uid)), [filteredNodes])
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
                if (!scopeKey.startsWith('node:')) return acc
                const nodeUid = scopeKey.slice('node:'.length)
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

        return Object.entries(activeScope.relationshipStats)
            .filter(([, stat]) => stat.hasMore)
            .filter(([type]) => !relationshipFilterSet || relationshipFilterSet.has(type))
            .sort((a, b) => {
                const rankA = RELATIONSHIP_TYPE_RANK[a[0]] ?? DEFAULT_RELATIONSHIP_RANK
                const rankB = RELATIONSHIP_TYPE_RANK[b[0]] ?? DEFAULT_RELATIONSHIP_RANK
                return rankA - rankB || a[0].localeCompare(b[0])
            })
            .map(([type, stat]) => {
                const scopeKey = activeScopeKey ?? graphScopeKey
                const loadingKey = `${scopeKey}:${type}`
                return {
                    type,
                    shown: stat.returned,
                    total: stat.total,
                    isLoading: !!loadMoreLoading[loadingKey],
                }
            })
    }, [activeScope, activeScopeKey, filters.relationshipTypes, graphScopeKey, loadMoreLoading])

    const visibleHiddenTotal = useMemo(
        () => loadMoreRows.reduce((total, row) => total + Math.max(row.total - row.shown, 0), 0),
        [loadMoreRows],
    )

    const initialScopeQuery = useMemo(
        () => ({
            ...apiFilterQuery,
            limitPerRelationshipType: RELATIONSHIP_GRAPH_INITIAL_LIMIT,
            includeRelationshipStats: true,
        }),
        [apiFilterQuery],
    )

    const fetchGraphData = useCallback(
        async (uid: string, query?: Record<string, string | number | boolean>) => {
            const raw = await queryClient.fetchQuery({
                queryKey: [RELATIONSHIP_GRAPH_QUERY_KEY, { uid, query }],
                queryFn: queryFetcher<SystemGraphResponse>('systemGraph'),
            })
            return fromSystemGraphResponse(raw)
        },
        [queryClient],
    )

    useEffect(() => {
        if (expandedScopeUids.length === 0) return

        let cancelled = false

        const reloadExpandedScopes = async () => {
            try {
                const results = await Promise.all(
                    expandedScopeUids.map(uid => fetchGraphData(uid, initialScopeQuery)),
                )
                if (cancelled) return

                const seenNodes = new Set<string>()
                const seenEdges = new Set<string>()
                const nextNodes = [] as typeof graphExpandedNodes
                const nextEdges = [] as typeof graphExpandedEdges

                results.forEach(result => {
                    result.nodes.forEach(node => {
                        if (seenNodes.has(node.uid)) return
                        seenNodes.add(node.uid)
                        nextNodes.push(node)
                    })

                    result.links.forEach(edge => {
                        if (seenEdges.has(edge.uid)) return
                        seenEdges.add(edge.uid)
                        nextEdges.push(edge)
                    })
                })

                setGraphExpanded(nextNodes, nextEdges)

                setScopeStates(prev => {
                    const graphScope = prev[graphScopeKey]
                    const next: Record<string, ScopeState> = {}
                    if (graphScope) next[graphScopeKey] = graphScope

                    expandedScopeUids.forEach((uid, index) => {
                        next[`node:${uid}`] = toScopeState(results[index]?.meta)
                    })

                    return next
                })

                setFitViewVersion(v => v + 1)
            } catch (error) {
                if (cancelled) return
                toast.error(
                    error instanceof Error
                        ? `Failed to reload expanded graph: ${error.message}`
                        : 'Failed to reload expanded graph',
                )
            }
        }

        void reloadExpandedScopes()

        return () => {
            cancelled = true
        }
    }, [expandedScopeUids, fetchGraphData, graphScopeKey, initialScopeQuery, setGraphExpanded])

    const applyPageToScopeState = useCallback(
        (scopeKey: string, page: RelationshipGraphPage) => {
            setScopeStates(prev => {
                const previousScope = prev[scopeKey] ?? {
                    relationshipStats: {},
                    hiddenLinksTotal: 0,
                }
                const previousTypeStat = previousScope.relationshipStats[page.type]
                const returned = previousTypeStat
                    ? Math.max(previousTypeStat.returned, page.offset + page.returned)
                    : page.offset + page.returned
                const nextStats: ScopeStats = {
                    ...previousScope.relationshipStats,
                    [page.type]: {
                        total: page.total,
                        returned,
                        hasMore: page.hasMore,
                    },
                }

                return {
                    ...prev,
                    [scopeKey]: {
                        relationshipStats: nextStats,
                        hiddenLinksTotal: getHiddenLinksTotal(nextStats),
                    },
                }
            })
        },
        [setScopeStates],
    )

    const loadMoreForScope = useCallback(
        async (scopeKey: string, type: string) => {
            const uid = scopeKey.startsWith('node:')
                ? scopeKey.slice('node:'.length)
                : scopeKey.startsWith('graph:')
                  ? scopeKey.slice('graph:'.length)
                  : null
            if (!uid || uid === 'unknown') return

            const stat = scopeStates[scopeKey]?.relationshipStats[type]
            const offset = stat?.returned ?? 0
            const loadingKey = `${scopeKey}:${type}`

            try {
                setLoadMoreLoading(prev => ({ ...prev, [loadingKey]: true }))
                const data = await fetchGraphData(uid, {
                    ...apiFilterQuery,
                    relationshipType: type,
                    offset,
                    limit: RELATIONSHIP_GRAPH_LOAD_MORE_LIMIT,
                })

                addGraphExpanded(data.nodes, data.links)
                if (data.page) {
                    applyPageToScopeState(scopeKey, data.page)
                }
                setFitViewVersion(v => v + 1)
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Failed to load more relationships: ${error.message}`
                        : 'Failed to load more relationships',
                )
            } finally {
                setLoadMoreLoading(prev => ({ ...prev, [loadingKey]: false }))
            }
        },
        [addGraphExpanded, apiFilterQuery, applyPageToScopeState, fetchGraphData, scopeStates],
    )

    // Expand handler — fetches paginated subgraph for a node and merges into store
    const handleExpand = useCallback(
        async (uid: string) => {
            if (expandedScopeUids.includes(uid)) {
                setActiveScopeKey(`node:${uid}`)
                return
            }

            try {
                const data = await fetchGraphData(uid, initialScopeQuery)
                addGraphExpanded(data.nodes, data.links)
                setExpandedScopeUids(prev => (prev.includes(uid) ? prev : [...prev, uid]))
                setScopeStates(prev => ({ ...prev, [`node:${uid}`]: toScopeState(data.meta) }))
                setActiveScopeKey(`node:${uid}`)
                setFitViewVersion(v => v + 1)
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Failed to expand graph: ${error.message}`
                        : 'Failed to expand graph',
                )
            }
        },
        [addGraphExpanded, expandedScopeUids, fetchGraphData, initialScopeQuery],
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

    const handleLoadMore = useCallback(
        (type: string) => {
            const scopeKey = activeScopeKey ?? graphScopeKey
            void loadMoreForScope(scopeKey, type)
        },
        [activeScopeKey, graphScopeKey, loadMoreForScope],
    )

    const handleNodeLoadMore = useCallback(
        (uid: string) => {
            const scopeKey = `node:${uid}`
            const nodeScope = scopeStates[scopeKey]
            if (!nodeScope) return

            const relationshipFilterSet =
                filters.relationshipTypes.length > 0 ? new Set(filters.relationshipTypes) : null
            const nextType = Object.entries(nodeScope.relationshipStats)
                .filter(([, stat]) => stat.hasMore)
                .filter(([type]) => !relationshipFilterSet || relationshipFilterSet.has(type))
                .sort((a, b) => {
                    const rankA = RELATIONSHIP_TYPE_RANK[a[0]] ?? DEFAULT_RELATIONSHIP_RANK
                    const rankB = RELATIONSHIP_TYPE_RANK[b[0]] ?? DEFAULT_RELATIONSHIP_RANK
                    return rankA - rankB || a[0].localeCompare(b[0])
                })[0]?.[0]

            if (!nextType) return
            setActiveScopeKey(scopeKey)
            void loadMoreForScope(scopeKey, nextType)
        },
        [filters.relationshipTypes, loadMoreForScope, scopeStates],
    )

    // Transform to ReactFlow format
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
    const systemLevels = useMemo(() => Object.keys(SYSTEM_LEVEL_LABELS), [])
    const handleLayoutChange = useCallback(
        (mode: GraphLayoutMode) => {
            setLayoutMode(mode)
            setGraphLayoutMode(mode)
            setFitViewVersion(v => v + 1)
        },
        [setGraphLayoutMode],
    )

    useEffect(() => {
        const next = { nodes: rfNodes.length, edges: rfEdges.length }
        const prev = prevGraphSizeRef.current
        if (prev.nodes === next.nodes && prev.edges === next.edges) return

        prevGraphSizeRef.current = next
        setFitViewVersion(v => v + 1)
    }, [rfNodes.length, rfEdges.length])

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
