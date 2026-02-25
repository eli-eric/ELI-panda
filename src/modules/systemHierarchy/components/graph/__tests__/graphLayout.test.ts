import type { Edge, Node } from '@xyflow/react'

import { applyHorizontalLayout, applyVerticalLayout } from '../../../utils/graphLayout'

const nodes: Node[] = [
    { id: 'a', position: { x: 0, y: 0 }, data: {} },
    { id: 'b', position: { x: 0, y: 0 }, data: {} },
    { id: 'c', position: { x: 0, y: 0 }, data: {} },
]

const edges: Edge[] = [
    { id: 'e1', source: 'a', target: 'b' },
    { id: 'e2', source: 'b', target: 'c' },
]

describe('applyVerticalLayout', () => {
    it('positions root at y=0', () => {
        const result = applyVerticalLayout(nodes, edges)
        const root = result.find(n => n.id === 'a')
        expect(root?.position.y).toBe(0)
    })

    it('positions children below parents', () => {
        const result = applyVerticalLayout(nodes, edges)
        const a = result.find(n => n.id === 'a')!
        const b = result.find(n => n.id === 'b')!
        const c = result.find(n => n.id === 'c')!
        expect(b.position.y).toBeGreaterThan(a.position.y)
        expect(c.position.y).toBeGreaterThan(b.position.y)
    })

    it('returns empty array for empty input', () => {
        expect(applyVerticalLayout([], [])).toEqual([])
    })

    it('handles disconnected nodes', () => {
        const disconnected: Node[] = [
            ...nodes,
            { id: 'd', position: { x: 0, y: 0 }, data: {} },
        ]
        const result = applyVerticalLayout(disconnected, edges)
        expect(result).toHaveLength(4)
        const d = result.find(n => n.id === 'd')!
        expect(d.position.y).toBe(0)
    })
})

describe('applyHorizontalLayout', () => {
    it('positions root at x=0', () => {
        const result = applyHorizontalLayout(nodes, edges)
        const root = result.find(n => n.id === 'a')
        expect(root?.position.x).toBe(0)
    })

    it('positions children to the right of parents', () => {
        const result = applyHorizontalLayout(nodes, edges)
        const a = result.find(n => n.id === 'a')!
        const b = result.find(n => n.id === 'b')!
        const c = result.find(n => n.id === 'c')!
        expect(b.position.x).toBeGreaterThan(a.position.x)
        expect(c.position.x).toBeGreaterThan(b.position.x)
    })

    it('returns empty array for empty input', () => {
        expect(applyHorizontalLayout([], [])).toEqual([])
    })

    it('spreads siblings vertically', () => {
        const twoChildren: Edge[] = [
            { id: 'e1', source: 'a', target: 'b' },
            { id: 'e2', source: 'a', target: 'c' },
        ]
        const result = applyHorizontalLayout(nodes, twoChildren)
        const b = result.find(n => n.id === 'b')!
        const c = result.find(n => n.id === 'c')!
        // Same x (same level), different y
        expect(b.position.x).toBe(c.position.x)
        expect(b.position.y).not.toBe(c.position.y)
    })
})
