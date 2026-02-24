import type { Edge, Node } from '@xyflow/react'

// Mock d3-force since it's ESM and Jest can't transform it
jest.mock('d3-force', () => ({
    forceSimulation: jest.fn(() => ({
        force: jest.fn().mockReturnThis(),
        stop: jest.fn().mockReturnThis(),
        tick: jest.fn(),
    })),
    forceLink: jest.fn(() => ({
        id: jest.fn().mockReturnThis(),
        distance: jest.fn().mockReturnThis(),
    })),
    forceManyBody: jest.fn(() => ({
        strength: jest.fn().mockReturnThis(),
    })),
    forceCenter: jest.fn(),
    forceCollide: jest.fn(() => ({
        radius: jest.fn().mockReturnThis(),
    })),
}))

import { applyForceLayout, applyHierarchicalLayout } from '../../../utils/graphLayout'

const nodes: Node[] = [
    { id: 'a', position: { x: 0, y: 0 }, data: {} },
    { id: 'b', position: { x: 0, y: 0 }, data: {} },
    { id: 'c', position: { x: 0, y: 0 }, data: {} },
]

const edges: Edge[] = [
    { id: 'e1', source: 'a', target: 'b' },
    { id: 'e2', source: 'b', target: 'c' },
]

describe('applyHierarchicalLayout', () => {
    it('positions root at y=0', () => {
        const result = applyHierarchicalLayout(nodes, edges)
        const root = result.find(n => n.id === 'a')
        expect(root?.position.y).toBe(0)
    })

    it('positions children below parents', () => {
        const result = applyHierarchicalLayout(nodes, edges)
        const a = result.find(n => n.id === 'a')!
        const b = result.find(n => n.id === 'b')!
        const c = result.find(n => n.id === 'c')!
        expect(b.position.y).toBeGreaterThan(a.position.y)
        expect(c.position.y).toBeGreaterThan(b.position.y)
    })

    it('returns empty array for empty input', () => {
        expect(applyHierarchicalLayout([], [])).toEqual([])
    })

    it('handles disconnected nodes', () => {
        const disconnected: Node[] = [
            ...nodes,
            { id: 'd', position: { x: 0, y: 0 }, data: {} },
        ]
        const result = applyHierarchicalLayout(disconnected, edges)
        expect(result).toHaveLength(4)
        // Disconnected node placed at level 0
        const d = result.find(n => n.id === 'd')!
        expect(d.position.y).toBe(0)
    })
})

describe('applyForceLayout', () => {
    it('returns nodes with positions', () => {
        const result = applyForceLayout(nodes, edges)
        expect(result).toHaveLength(3)
        result.forEach(n => {
            expect(n.position).toBeDefined()
            expect(typeof n.position.x).toBe('number')
            expect(typeof n.position.y).toBe('number')
        })
    })

    it('returns empty array for empty input', () => {
        expect(applyForceLayout([], [])).toEqual([])
    })
})
