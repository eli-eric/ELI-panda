import type { Edge, Node } from '@xyflow/react'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'

import type {
    GraphLayoutMode,
    RelationshipGraphEdge,
    RelationshipGraphMeta,
    RelationshipGraphNode,
    RelationshipGraphPage,
    RelationshipGraphResponse,
} from '../types/graph'
import { RELATIONSHIP_TYPE_LABELS } from '../types/graph'
import { getEdgeColor, getNodeClasses } from './graphColors'

const GRID_COLS = 4
const GRID_GAP_X = 280
const GRID_GAP_Y = 150

interface ToReactFlowNodesOptions {
    layoutMode?: GraphLayoutMode
    onExpand?: (uid: string) => void
    onLoadMore?: (uid: string) => void
    onViewDetail?: (uid: string) => void
    onContextMenuChange?: (open: boolean) => void
    hiddenRelationshipsByNodeUid?: Record<string, number>
}

export const toReactFlowNodes = (
    apiNodes: RelationshipGraphNode[],
    options?: ToReactFlowNodesOptions,
): Node[] =>
    apiNodes.map((node, index) => ({
        id: node.uid,
        type: 'systemNode',
        position: {
            x: (index % GRID_COLS) * GRID_GAP_X,
            y: Math.floor(index / GRID_COLS) * GRID_GAP_Y,
        },
        data: {
            name: node.name,
            systemCode: node.systemCode,
            systemLevel: node.systemLevel,
            systemType: node.systemType?.name,
            nodeClasses: getNodeClasses(node.systemLevel),
            layoutMode: options?.layoutMode,
            onExpand: options?.onExpand,
            onLoadMore: options?.onLoadMore,
            onViewDetail: options?.onViewDetail,
            onContextMenuChange: options?.onContextMenuChange,
            hiddenRelationshipsCount: options?.hiddenRelationshipsByNodeUid?.[node.uid] ?? 0,
        },
    }))

export const toReactFlowEdges = (apiEdges: RelationshipGraphEdge[]): Edge[] =>
    apiEdges.map(edge => ({
        id: edge.uid,
        source: edge.source,
        target: edge.target,
        type: 'relationshipEdge',
        animated: false,
        data: {
            relationship: edge.relationship,
            description: edge.description,
            label:
                RELATIONSHIP_TYPE_LABELS[
                    edge.relationship as keyof typeof RELATIONSHIP_TYPE_LABELS
                ] ?? edge.relationship,
        },
        style: { stroke: getEdgeColor(edge.relationship), strokeWidth: 2 },
    }))

/**
 * Maps the real API response (SystemGraphResponse from /general/{uid}/graph)
 * to our RelationshipGraphResponse shape.
 *
 * API nodes have `properties: Record<string, string>` — we extract systemCode,
 * systemLevel, systemType from there. Links lack uid/description — we generate them.
 */
export const fromSystemGraphResponse = (raw: SystemGraphResponse): RelationshipGraphResponse => {
    const systemNodes = raw.nodes.filter(n => n.label === 'System')
    const systemNodeUids = new Set(systemNodes.map(n => n.uid))
    const meta: RelationshipGraphMeta | undefined = raw.meta
        ? {
              relationshipStats: raw.meta.relationshipStats,
              hiddenLinksTotal: raw.meta.hiddenLinksTotal,
          }
        : undefined
    const page: RelationshipGraphPage | undefined = raw.page
        ? {
              type: raw.page.type,
              offset: raw.page.offset,
              limit: raw.page.limit,
              returned: raw.page.returned,
              total: raw.page.total,
              hasMore: raw.page.hasMore,
          }
        : undefined

    return {
        nodes: systemNodes.map(
            (n): RelationshipGraphNode => ({
                uid: n.uid,
                name: n.name,
                systemCode: n.properties.systemCode ?? null,
                systemLevel: n.properties.systemLevel ?? 'KEY_SYSTEMS',
                systemType:
                    n.properties.systemType || n.properties.systemTypeUid
                        ? {
                              uid: n.properties.systemTypeUid ?? n.uid,
                              name: n.properties.systemType ?? '',
                          }
                        : null,
            }),
        ),
        links: raw.links
            .filter(l => systemNodeUids.has(l.source) && systemNodeUids.has(l.target))
            .map(
                (l, i): RelationshipGraphEdge => ({
                    uid: l.uid ?? `edge-${l.source}-${l.target}-${i}`,
                    source: l.source,
                    target: l.target,
                    relationship: l.relationship,
                    description: null,
                }),
            ),
        meta,
        page,
    }
}
