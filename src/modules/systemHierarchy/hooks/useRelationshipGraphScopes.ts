import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { RelationshipGraphMeta, RelationshipGraphPage } from '../types/graph'
import {
    applyPageToScope,
    mergeScopeStateWithMeta,
    type ScopeState,
    toNodeScopeKey,
    toScopeState,
} from '../utils/graphScope'

interface UseRelationshipGraphScopesParams {
    graphUid: string | null
    filterQueryKey: string
    graphScopeKey: string
    apiMeta?: RelationshipGraphMeta
    resetGraphExpanded: () => void
}

interface UseRelationshipGraphScopesResult {
    scopeStates: Record<string, ScopeState>
    activeScopeKey: string | null
    loadMoreLoading: Record<string, boolean>
    expandedScopeUids: string[]
    registerExpandedScopeUid: (uid: string) => void
    setActiveScopeKey: (scopeKey: string | null) => void
    setNodeScopeMeta: (uid: string, meta?: RelationshipGraphMeta) => void
    setNodeScopesMeta: (nodeScopes: Record<string, RelationshipGraphMeta | undefined>) => void
    applyPageToScopeState: (scopeKey: string, page: RelationshipGraphPage) => void
    setLoadMoreTypeLoading: (scopeKey: string, type: string, isLoading: boolean) => void
}

export const useRelationshipGraphScopes = ({
    graphUid,
    filterQueryKey,
    graphScopeKey,
    apiMeta,
    resetGraphExpanded,
}: UseRelationshipGraphScopesParams): UseRelationshipGraphScopesResult => {
    const [scopeStates, setScopeStates] = useState<Record<string, ScopeState>>({})
    const [activeScopeKey, setActiveScopeKey] = useState<string | null>(null)
    const [loadMoreLoading, setLoadMoreLoading] = useState<Record<string, boolean>>({})
    const [expandedScopeUids, setExpandedScopeUids] = useState<string[]>([])

    const prevGraphUidRef = useRef(graphUid)
    const previousFilterQueryKeyRef = useRef(filterQueryKey)

    useEffect(() => {
        if (prevGraphUidRef.current !== graphUid) {
            prevGraphUidRef.current = graphUid
            resetGraphExpanded()
            setExpandedScopeUids([])
            setScopeStates({})
            setLoadMoreLoading({})
        }
    }, [graphUid, resetGraphExpanded])

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

        setScopeStates(prev => ({
            ...prev,
            [graphScopeKey]: mergeScopeStateWithMeta(prev[graphScopeKey], apiMeta),
        }))
    }, [apiMeta, graphScopeKey])

    const registerExpandedScopeUid = useCallback((uid: string) => {
        setExpandedScopeUids(prev => (prev.includes(uid) ? prev : [...prev, uid]))
    }, [])

    const setNodeScopeMeta = useCallback((uid: string, meta?: RelationshipGraphMeta) => {
        const scopeKey = toNodeScopeKey(uid)
        setScopeStates(prev => ({
            ...prev,
            [scopeKey]: toScopeState(meta),
        }))
    }, [])

    const setNodeScopesMeta = useCallback(
        (nodeScopes: Record<string, RelationshipGraphMeta | undefined>) => {
            setScopeStates(prev => {
                const graphScope = prev[graphScopeKey]
                const next: Record<string, ScopeState> = {}

                if (graphScope) next[graphScopeKey] = graphScope

                Object.entries(nodeScopes).forEach(([uid, meta]) => {
                    next[toNodeScopeKey(uid)] = toScopeState(meta)
                })

                return next
            })
        },
        [graphScopeKey],
    )

    const applyPageToScopeState = useCallback((scopeKey: string, page: RelationshipGraphPage) => {
        setScopeStates(prev => ({
            ...prev,
            [scopeKey]: applyPageToScope(prev[scopeKey], page),
        }))
    }, [])

    const setLoadMoreTypeLoading = useCallback(
        (scopeKey: string, type: string, isLoading: boolean) => {
            const loadingKey = `${scopeKey}:${type}`
            setLoadMoreLoading(prev => ({ ...prev, [loadingKey]: isLoading }))
        },
        [],
    )

    return useMemo(
        () => ({
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
        }),
        [
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
        ],
    )
}
