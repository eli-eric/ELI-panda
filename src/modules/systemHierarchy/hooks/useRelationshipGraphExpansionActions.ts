import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'
import { queryFetcher } from '@/utils/fetcher'

import {
    RELATIONSHIP_GRAPH_LOAD_MORE_LIMIT,
    RELATIONSHIP_GRAPH_QUERY_KEY,
} from '../types/constants'
import type {
    RelationshipGraphEdge,
    RelationshipGraphMeta,
    RelationshipGraphNode,
    RelationshipGraphPage,
} from '../types/graph'
import {
    compareRelationshipTypesByRank,
    scopeKeyToUid,
    type ScopeState,
    toNodeScopeKey,
} from '../utils/graphScope'
import { fromSystemGraphResponse } from '../utils/graphTransformers'

interface UseRelationshipGraphExpansionActionsParams {
    apiFilterQuery: Record<string, string>
    initialScopeQuery: Record<string, string | number | boolean>
    graphScopeKey: string
    expandedScopeUids: string[]
    activeScopeKey: string | null
    scopeStates: Record<string, ScopeState>
    relationshipTypeFilters: string[]
    addGraphExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    setGraphExpanded: (nodes: RelationshipGraphNode[], edges: RelationshipGraphEdge[]) => void
    registerExpandedScopeUid: (uid: string) => void
    setNodeScopeMeta: (uid: string, meta?: RelationshipGraphMeta) => void
    setNodeScopesMeta: (nodeScopes: Record<string, RelationshipGraphMeta | undefined>) => void
    applyPageToScopeState: (scopeKey: string, page: RelationshipGraphPage) => void
    setLoadMoreTypeLoading: (scopeKey: string, type: string, isLoading: boolean) => void
    setActiveScopeKey: (scopeKey: string | null) => void
    onGraphChanged: () => void
}

interface UseRelationshipGraphExpansionActionsResult {
    handleExpand: (uid: string) => Promise<void>
    handleLoadMore: (type: string) => void
    handleNodeLoadMore: (uid: string) => void
}

export const useRelationshipGraphExpansionActions = ({
    apiFilterQuery,
    initialScopeQuery,
    graphScopeKey,
    expandedScopeUids,
    activeScopeKey,
    scopeStates,
    relationshipTypeFilters,
    addGraphExpanded,
    setGraphExpanded,
    registerExpandedScopeUid,
    setNodeScopeMeta,
    setNodeScopesMeta,
    applyPageToScopeState,
    setLoadMoreTypeLoading,
    setActiveScopeKey,
    onGraphChanged,
}: UseRelationshipGraphExpansionActionsParams): UseRelationshipGraphExpansionActionsResult => {
    const queryClient = useQueryClient()

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
                const nextNodes: RelationshipGraphNode[] = []
                const nextEdges: RelationshipGraphEdge[] = []

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

                const nextNodeScopes = expandedScopeUids.reduce<
                    Record<string, RelationshipGraphMeta | undefined>
                >((acc, uid, index) => {
                    acc[uid] = results[index]?.meta
                    return acc
                }, {})

                setNodeScopesMeta(nextNodeScopes)
                onGraphChanged()
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
    }, [
        expandedScopeUids,
        fetchGraphData,
        initialScopeQuery,
        onGraphChanged,
        setGraphExpanded,
        setNodeScopesMeta,
    ])

    const loadMoreForScope = useCallback(
        async (scopeKey: string, type: string) => {
            const uid = scopeKeyToUid(scopeKey)
            if (!uid) return

            const stat = scopeStates[scopeKey]?.relationshipStats[type]
            const offset = stat?.returned ?? 0

            try {
                setLoadMoreTypeLoading(scopeKey, type, true)

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
                onGraphChanged()
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Failed to load more relationships: ${error.message}`
                        : 'Failed to load more relationships',
                )
            } finally {
                setLoadMoreTypeLoading(scopeKey, type, false)
            }
        },
        [
            addGraphExpanded,
            apiFilterQuery,
            applyPageToScopeState,
            fetchGraphData,
            onGraphChanged,
            scopeStates,
            setLoadMoreTypeLoading,
        ],
    )

    const handleExpand = useCallback(
        async (uid: string, forceRefresh?: boolean) => {
            const scopeKey = toNodeScopeKey(uid)

            if (expandedScopeUids.includes(uid) && !forceRefresh) {
                setActiveScopeKey(scopeKey)
                return
            }

            try {
                const data = await fetchGraphData(uid, initialScopeQuery)
                addGraphExpanded(data.nodes, data.links)
                registerExpandedScopeUid(uid)
                setNodeScopeMeta(uid, data.meta)
                setActiveScopeKey(scopeKey)
                onGraphChanged()
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? `Failed to expand graph: ${error.message}`
                        : 'Failed to expand graph',
                )
            }
        },
        [
            addGraphExpanded,
            expandedScopeUids,
            fetchGraphData,
            initialScopeQuery,
            onGraphChanged,
            registerExpandedScopeUid,
            setActiveScopeKey,
            setNodeScopeMeta,
        ],
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
            const scopeKey = toNodeScopeKey(uid)
            const nodeScope = scopeStates[scopeKey]
            if (!nodeScope) return

            const relationshipFilterSet =
                relationshipTypeFilters.length > 0 ? new Set(relationshipTypeFilters) : null

            const nextType = Object.entries(nodeScope.relationshipStats)
                .filter(([, stat]) => stat.hasMore)
                .filter(([type]) => !relationshipFilterSet || relationshipFilterSet.has(type))
                .sort(([typeA], [typeB]) => compareRelationshipTypesByRank(typeA, typeB))[0]?.[0]

            if (!nextType) return

            setActiveScopeKey(scopeKey)
            void loadMoreForScope(scopeKey, nextType)
        },
        [loadMoreForScope, relationshipTypeFilters, scopeStates, setActiveScopeKey],
    )

    return {
        handleExpand,
        handleLoadMore,
        handleNodeLoadMore,
    }
}
