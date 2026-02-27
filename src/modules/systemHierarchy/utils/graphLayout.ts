import type { Edge, Node } from '@xyflow/react'

import { DEFAULT_RELATIONSHIP_RANK, RELATIONSHIP_TYPE_RANK } from '../types/graph'

const HIERARCHY_GAP_X = 280
const HIERARCHY_GAP_Y = 150

interface AdjEntry {
    node: string
    edge: Edge
}

const getRelRank = (relType: string): number =>
    RELATIONSHIP_TYPE_RANK[relType] ?? DEFAULT_RELATIONSHIP_RANK

/**
 * BFS from root nodes (0 incoming edges) to assign levels.
 * Then sub-divides each BFS level by the primary outgoing edge type
 * so nodes connected via different relationship types land on separate visual rows.
 *
 * Returns a Map<nodeId, visualLevel>.
 */
const assignLevels = (nodes: Node[], edges: Edge[]): Map<string, number> => {
    // --- adjacency + incoming count ---
    const adj = new Map<string, AdjEntry[]>()
    const incoming = new Map<string, Edge[]>()
    const incomingCount = new Map<string, number>()
    for (const n of nodes) {
        adj.set(n.id, [])
        incoming.set(n.id, [])
        incomingCount.set(n.id, 0)
    }
    for (const e of edges) {
        adj.get(e.source)?.push({ node: e.target, edge: e })
        incoming.get(e.target)?.push(e)
        incomingCount.set(e.target, (incomingCount.get(e.target) ?? 0) + 1)
    }

    // --- standard BFS ---
    const roots = nodes.filter(n => (incomingCount.get(n.id) ?? 0) === 0)
    if (roots.length === 0 && nodes.length > 0) roots.push(nodes[0])

    const visited = new Set<string>()
    const bfsLevels = new Map<string, number>()
    const queue: string[] = []

    for (const root of roots) {
        queue.push(root.id)
        visited.add(root.id)
        bfsLevels.set(root.id, 0)
    }

    while (queue.length > 0) {
        const current = queue.shift()!
        const currentLevel = bfsLevels.get(current) ?? 0
        for (const { node: child } of adj.get(current) ?? []) {
            if (!visited.has(child)) {
                visited.add(child)
                bfsLevels.set(child, currentLevel + 1)
                queue.push(child)
            }
        }
    }

    for (const n of nodes) {
        if (!visited.has(n.id)) bfsLevels.set(n.id, 0)
    }

    // --- determine primary edge group per node ---
    const NO_GROUP = '__none__'
    const edgeRel = (e: Edge): string => (e.data?.relationship as string) || NO_GROUP

    const nodeEdgeGroup = new Map<string, string>()
    for (const n of nodes) {
        const outEdges = adj.get(n.id) ?? []
        if (outEdges.length > 0) {
            // pick lowest-rank (highest priority) outgoing rel type
            let bestRel = edgeRel(outEdges[0].edge)
            let bestRank = getRelRank(bestRel)
            for (let i = 1; i < outEdges.length; i++) {
                const rel = edgeRel(outEdges[i].edge)
                const rank = getRelRank(rel)
                if (rank < bestRank) {
                    bestRel = rel
                    bestRank = rank
                }
            }
            nodeEdgeGroup.set(n.id, bestRel)
        } else {
            // leaf: use incoming edge type
            const inEdges = incoming.get(n.id) ?? []
            if (inEdges.length > 0) {
                let bestRel = edgeRel(inEdges[0])
                let bestRank = getRelRank(bestRel)
                for (let i = 1; i < inEdges.length; i++) {
                    const rel = edgeRel(inEdges[i])
                    const rank = getRelRank(rel)
                    if (rank < bestRank) {
                        bestRel = rel
                        bestRank = rank
                    }
                }
                nodeEdgeGroup.set(n.id, bestRel)
            } else {
                nodeEdgeGroup.set(n.id, NO_GROUP)
            }
        }
    }

    // --- group by (bfsLevel, edgeGroup), assign sequential visual levels ---
    const maxBfs = Math.max(0, ...Array.from(bfsLevels.values()))
    const visualLevels = new Map<string, number>()
    let nextVisualLevel = 0

    for (let bfs = 0; bfs <= maxBfs; bfs++) {
        const nodesAtLevel = nodes.filter(n => bfsLevels.get(n.id) === bfs)
        if (nodesAtLevel.length === 0) continue

        // collect unique edge groups at this bfs level, sorted by rank
        const groups = [...new Set(nodesAtLevel.map(n => nodeEdgeGroup.get(n.id) ?? '__none__'))]
        groups.sort((a, b) => getRelRank(a) - getRelRank(b))

        for (const group of groups) {
            for (const n of nodesAtLevel) {
                if ((nodeEdgeGroup.get(n.id) ?? '__none__') === group) {
                    visualLevels.set(n.id, nextVisualLevel)
                }
            }
            nextVisualLevel++
        }
    }

    return visualLevels
}

const groupByLevel = (levels: Map<string, number>): Map<number, string[]> => {
    const groups = new Map<number, string[]>()
    for (const [nodeId, level] of levels) {
        const group = groups.get(level) ?? []
        group.push(nodeId)
        groups.set(level, group)
    }
    return groups
}

/**
 * Left-to-right column placement with reservation for long edges.
 * When an edge spans >1 row, the source's column is reserved on
 * intermediate rows so no node blocks the edge path.
 */
const assignColumnPositions = (
    edges: Edge[],
    levels: Map<string, number>,
    groups: Map<number, string[]>,
    gap: number,
): Map<string, number> => {
    const positions = new Map<string, number>()

    // outgoing edges: source → target IDs
    const outgoing = new Map<string, string[]>()
    for (const [, nodeIds] of groups) {
        for (const id of nodeIds) outgoing.set(id, [])
    }
    for (const e of edges) {
        outgoing.get(e.source)?.push(e.target)
    }

    // reserved columns per row level
    const reservedCols = new Map<number, Set<number>>()

    // process top to bottom
    const sortedLevels = [...groups.keys()].sort((a, b) => a - b)

    for (const level of sortedLevels) {
        const nodeIds = groups.get(level) ?? []
        const reserved = reservedCols.get(level) ?? new Set<number>()

        let col = 0
        for (const nodeId of nodeIds) {
            while (reserved.has(col)) col++
            positions.set(nodeId, col * gap)

            // reserve this column on intermediate rows for long edges
            const targets = outgoing.get(nodeId) ?? []
            for (const targetId of targets) {
                const targetLevel = levels.get(targetId)
                if (targetLevel !== undefined && targetLevel - level > 1) {
                    for (let r = level + 1; r < targetLevel; r++) {
                        if (!reservedCols.has(r)) reservedCols.set(r, new Set())
                        reservedCols.get(r)!.add(col)
                    }
                }
            }

            col++
        }
    }

    return positions
}

/** Top → bottom: levels on Y axis, siblings on X axis */
export const applyVerticalLayout = (nodes: Node[], edges: Edge[]): Node[] => {
    if (nodes.length === 0) return []

    const levels = assignLevels(nodes, edges)
    const groups = groupByLevel(levels)
    const colPositions = assignColumnPositions(edges, levels, groups, HIERARCHY_GAP_X)

    const positionMap = new Map<string, { x: number; y: number }>()
    for (const [level, group] of groups) {
        for (const nodeId of group) {
            positionMap.set(nodeId, {
                x: colPositions.get(nodeId) ?? 0,
                y: level * HIERARCHY_GAP_Y,
            })
        }
    }

    return nodes.map(n => ({
        ...n,
        position: positionMap.get(n.id) ?? n.position,
    }))
}

/** Left → right: levels on X axis, siblings on Y axis */
export const applyHorizontalLayout = (nodes: Node[], edges: Edge[]): Node[] => {
    if (nodes.length === 0) return []

    const levels = assignLevels(nodes, edges)
    const groups = groupByLevel(levels)
    const colPositions = assignColumnPositions(edges, levels, groups, HIERARCHY_GAP_Y)

    const positionMap = new Map<string, { x: number; y: number }>()
    for (const [level, group] of groups) {
        for (const nodeId of group) {
            positionMap.set(nodeId, {
                x: level * HIERARCHY_GAP_X,
                y: colPositions.get(nodeId) ?? 0,
            })
        }
    }

    return nodes.map(n => ({
        ...n,
        position: positionMap.get(n.id) ?? n.position,
    }))
}
