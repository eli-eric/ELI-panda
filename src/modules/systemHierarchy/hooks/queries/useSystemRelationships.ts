import { useMemo } from 'react'

import type { RelationshipGraphEdge, RelationshipGraphNode } from '../../types/graph'
import { RELATIONSHIP_TYPES } from '../../types/graph'
import { useRelationshipGraph } from './useRelationshipGraph'

export interface RelationshipRow {
    edge: RelationshipGraphEdge
    node: RelationshipGraphNode
    direction: 'inbound' | 'outbound'
}

const EXCLUDED_TYPES: Set<string> = new Set([RELATIONSHIP_TYPES.HAS_SUBSYSTEM])

export const useSystemRelationships = (systemUid: string | undefined) => {
    const { nodes, edges, isLoading, isFetching } = useRelationshipGraph({
        systemUid,
        paged: false,
        staleTime: 5 * 60 * 1000,
    })

    const nodeMap = useMemo(
        () => new Map(nodes.map(n => [n.uid, n])),
        [nodes],
    )

    const { inbound, outbound } = useMemo(() => {
        const inbound: RelationshipRow[] = []
        const outbound: RelationshipRow[] = []

        for (const edge of edges) {
            if (EXCLUDED_TYPES.has(edge.relationship)) continue

            if (edge.target === systemUid) {
                const node = nodeMap.get(edge.source)
                if (node) inbound.push({ edge, node, direction: 'inbound' })
            } else if (edge.source === systemUid) {
                const node = nodeMap.get(edge.target)
                if (node) outbound.push({ edge, node, direction: 'outbound' })
            }
        }

        return { inbound, outbound }
    }, [edges, systemUid, nodeMap])

    const relatedUids = useMemo(
        () =>
            [...new Set([...inbound, ...outbound].map(r => r.node.uid))].sort((a, b) =>
                a.localeCompare(b),
            ),
        [inbound, outbound],
    )

    const hasRelationships = inbound.length > 0 || outbound.length > 0

    return { inbound, outbound, relatedUids, hasRelationships, isLoading, isFetching }
}
