import type {
    RelationshipGraphMeta,
    RelationshipGraphPage,
    RelationshipGraphStat,
} from '../types/graph'
import { DEFAULT_RELATIONSHIP_RANK, RELATIONSHIP_TYPE_RANK } from '../types/graph'

export type ScopeStats = Record<string, RelationshipGraphStat>

export interface ScopeState {
    relationshipStats: ScopeStats
    hiddenLinksTotal: number
}

const GRAPH_SCOPE_PREFIX = 'graph:'
const NODE_SCOPE_PREFIX = 'node:'
const UNKNOWN_SCOPE_UID = 'unknown'

export const compareRelationshipTypesByRank = (typeA: string, typeB: string) => {
    const rankA = RELATIONSHIP_TYPE_RANK[typeA] ?? DEFAULT_RELATIONSHIP_RANK
    const rankB = RELATIONSHIP_TYPE_RANK[typeB] ?? DEFAULT_RELATIONSHIP_RANK
    return rankA - rankB || typeA.localeCompare(typeB)
}

export const getHiddenLinksTotal = (stats: ScopeStats) =>
    Object.values(stats).reduce((total, stat) => total + Math.max(stat.total - stat.returned, 0), 0)

export const toScopeState = (meta?: RelationshipGraphMeta): ScopeState => {
    const relationshipStats = meta?.relationshipStats ?? {}
    return {
        relationshipStats,
        hiddenLinksTotal: getHiddenLinksTotal(relationshipStats),
    }
}

export const mergeScopeStateWithMeta = (
    previousScope: ScopeState | undefined,
    meta?: RelationshipGraphMeta,
): ScopeState => {
    const nextScope = toScopeState(meta)
    if (!previousScope) return nextScope

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
        relationshipStats: mergedStats,
        hiddenLinksTotal: getHiddenLinksTotal(mergedStats),
    }
}

export const applyPageToScope = (
    previousScope: ScopeState | undefined,
    page: RelationshipGraphPage,
): ScopeState => {
    const baseScope = previousScope ?? {
        relationshipStats: {},
        hiddenLinksTotal: 0,
    }

    const previousTypeStat = baseScope.relationshipStats[page.type]
    const returned = previousTypeStat
        ? Math.max(previousTypeStat.returned, page.offset + page.returned)
        : page.offset + page.returned

    const relationshipStats: ScopeStats = {
        ...baseScope.relationshipStats,
        [page.type]: {
            total: page.total,
            returned,
            hasMore: page.hasMore,
        },
    }

    return {
        relationshipStats,
        hiddenLinksTotal: getHiddenLinksTotal(relationshipStats),
    }
}

export const toGraphScopeKey = (uid?: string | null) =>
    `${GRAPH_SCOPE_PREFIX}${uid ?? UNKNOWN_SCOPE_UID}`

export const toNodeScopeKey = (uid: string) => `${NODE_SCOPE_PREFIX}${uid}`

export const isNodeScopeKey = (scopeKey: string) => scopeKey.startsWith(NODE_SCOPE_PREFIX)

export const scopeKeyToUid = (scopeKey: string): string | null => {
    if (scopeKey.startsWith(NODE_SCOPE_PREFIX)) {
        return scopeKey.slice(NODE_SCOPE_PREFIX.length)
    }

    if (scopeKey.startsWith(GRAPH_SCOPE_PREFIX)) {
        const uid = scopeKey.slice(GRAPH_SCOPE_PREFIX.length)
        return uid === UNKNOWN_SCOPE_UID ? null : uid
    }

    return null
}
