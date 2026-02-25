import type { Edge, Node } from '@xyflow/react'

import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'

import type {
    GraphLayoutMode,
    RelationshipGraphEdge,
    RelationshipGraphNode,
    RelationshipGraphResponse,
} from '../types/graph'
import { RELATIONSHIP_TYPE_LABELS } from '../types/graph'
import { getEdgeColor, getNodeClasses } from './graphColors'

const GRID_COLS = 4
const GRID_GAP_X = 280
const GRID_GAP_Y = 150

export const toReactFlowNodes = (
    apiNodes: RelationshipGraphNode[],
    layoutMode?: GraphLayoutMode,
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
            layoutMode,
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
                RELATIONSHIP_TYPE_LABELS[edge.relationship as keyof typeof RELATIONSHIP_TYPE_LABELS] ??
                edge.relationship,
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
                    uid: `edge-${l.source}-${l.target}-${i}`,
                    source: l.source,
                    target: l.target,
                    relationship: l.relationship,
                    description: null,
                }),
            ),
    }
}
