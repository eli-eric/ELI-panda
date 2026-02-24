import type { Edge, Node } from '@xyflow/react'
import {
    forceCenter,
    forceCollide,
    forceLink,
    forceManyBody,
    forceSimulation,
} from 'd3-force'

const HIERARCHY_GAP_X = 280
const HIERARCHY_GAP_Y = 150

interface AdjEntry {
    node: string
    edge: Edge
}

export const applyHierarchicalLayout = (nodes: Node[], edges: Edge[]): Node[] => {
    if (nodes.length === 0) return []

    // Build adjacency (directed: source → target)
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

    // BFS from roots (nodes with no incoming edges)
    const roots = nodes.filter(n => (incomingCount.get(n.id) ?? 0) === 0)
    if (roots.length === 0) roots.push(nodes[0]) // fallback

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

    // Handle disconnected nodes
    for (const n of nodes) {
        if (!visited.has(n.id)) {
            levels.set(n.id, 0)
        }
    }

    // Group by level, assign x positions
    const levelGroups = new Map<number, string[]>()
    for (const [nodeId, level] of levels) {
        const group = levelGroups.get(level) ?? []
        group.push(nodeId)
        levelGroups.set(level, group)
    }

    const positionMap = new Map<string, { x: number; y: number }>()
    for (const [level, group] of levelGroups) {
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

export const applyForceLayout = (nodes: Node[], edges: Edge[]): Node[] => {
    if (nodes.length === 0) return []

    const simNodes = nodes.map(n => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
    }))

    const simLinks = edges.map(e => ({
        source: e.source,
        target: e.target,
    }))

    const simulation = forceSimulation(simNodes)
        .force('link', forceLink(simLinks).id((d: any) => d.id).distance(200))
        .force('charge', forceManyBody().strength(-400))
        .force('center', forceCenter(400, 300))
        .force('collision', forceCollide().radius(80))
        .stop()

    // Run simulation synchronously
    for (let i = 0; i < 300; i++) simulation.tick()

    const posMap = new Map(simNodes.map(n => [n.id, { x: n.x ?? 0, y: n.y ?? 0 }]))

    return nodes.map(n => ({
        ...n,
        position: posMap.get(n.id) ?? n.position,
    }))
}
