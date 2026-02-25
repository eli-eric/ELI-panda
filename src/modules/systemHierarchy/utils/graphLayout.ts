import type { Edge, Node } from '@xyflow/react'

const HIERARCHY_GAP_X = 280
const HIERARCHY_GAP_Y = 150

interface AdjEntry {
    node: string
    edge: Edge
}

/**
 * BFS from root nodes (0 incoming edges) to assign levels.
 * Returns a Map<nodeId, level>.
 */
const assignLevels = (nodes: Node[], edges: Edge[]): Map<string, number> => {
    const adj = new Map<string, AdjEntry[]>()
    const incomingCount = new Map<string, number>()
    for (const n of nodes) {
        adj.set(n.id, [])
        incomingCount.set(n.id, 0)
    }
    for (const e of edges) {
        adj.get(e.source)?.push({ node: e.target, edge: e })
        incomingCount.set(e.target, (incomingCount.get(e.target) ?? 0) + 1)
    }

    const roots = nodes.filter(n => (incomingCount.get(n.id) ?? 0) === 0)
    if (roots.length === 0 && nodes.length > 0) roots.push(nodes[0])

    const visited = new Set<string>()
    const levels = new Map<string, number>()
    const queue: string[] = []

    for (const root of roots) {
        queue.push(root.id)
        visited.add(root.id)
        levels.set(root.id, 0)
    }

    while (queue.length > 0) {
        const current = queue.shift()!
        const currentLevel = levels.get(current) ?? 0
        for (const { node: child } of adj.get(current) ?? []) {
            if (!visited.has(child)) {
                visited.add(child)
                levels.set(child, currentLevel + 1)
                queue.push(child)
            }
        }
    }

    // Disconnected nodes → level 0
    for (const n of nodes) {
        if (!visited.has(n.id)) levels.set(n.id, 0)
    }

    return levels
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

/** Top → bottom: levels on Y axis, siblings on X axis */
export const applyVerticalLayout = (nodes: Node[], edges: Edge[]): Node[] => {
    if (nodes.length === 0) return []

    const levels = assignLevels(nodes, edges)
    const groups = groupByLevel(levels)

    const positionMap = new Map<string, { x: number; y: number }>()
    for (const [level, group] of groups) {
        group.forEach((nodeId, index) => {
            positionMap.set(nodeId, {
                x: index * HIERARCHY_GAP_X,
                y: level * HIERARCHY_GAP_Y,
            })
        })
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

    const positionMap = new Map<string, { x: number; y: number }>()
    for (const [level, group] of groups) {
        group.forEach((nodeId, index) => {
            positionMap.set(nodeId, {
                x: level * HIERARCHY_GAP_X,
                y: index * HIERARCHY_GAP_Y,
            })
        })
    }

    return nodes.map(n => ({
        ...n,
        position: positionMap.get(n.id) ?? n.position,
    }))
}
