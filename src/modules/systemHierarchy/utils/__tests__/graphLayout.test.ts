import type { Edge, Node } from '@xyflow/react'

import { applyHorizontalLayout, applyVerticalLayout } from '../graphLayout'

const makeNode = (id: string): Node => ({
    id,
    type: 'systemNode',
    position: { x: 0, y: 0 },
    data: {},
})

const makeEdge = (id: string, source: string, target: string, relationship: string): Edge => ({
    id,
    source,
    target,
    data: { relationship },
})

describe('graphLayout – relationship-type-aware levels', () => {
    /**
     * Graph:
     *   E1_PXS --HAS_SUBSYSTEM--> PXS_vacuum
     *   spare1 --IS_SPARE_FOR-->  PXS_vacuum
     *   spare2 --IS_SPARE_FOR-->  PXS_vacuum
     *
     * Expected visual rows (vertical):
     *   row 0: E1_PXS (HAS_SUBSYSTEM group, rank 0)
     *   row 1: spare1, spare2 (IS_SPARE_FOR group, rank 1)
     *   row 2: PXS_vacuum (level 1, leaf uses incoming = HAS_SUBSYSTEM rank 0)
     */
    const nodes: Node[] = [
        makeNode('E1_PXS'),
        makeNode('spare1'),
        makeNode('spare2'),
        makeNode('PXS_vacuum'),
    ]
    const edges: Edge[] = [
        makeEdge('e1', 'E1_PXS', 'PXS_vacuum', 'HAS_SUBSYSTEM'),
        makeEdge('e2', 'spare1', 'PXS_vacuum', 'IS_SPARE_FOR'),
        makeEdge('e3', 'spare2', 'PXS_vacuum', 'IS_SPARE_FOR'),
    ]

    describe('applyVerticalLayout', () => {
        const result = applyVerticalLayout(nodes, edges)
        const posOf = (id: string) => result.find(n => n.id === id)!.position

        it('places HAS_SUBSYSTEM sources on a different row than IS_SPARE_FOR sources', () => {
            // E1_PXS (HAS_SUBSYSTEM) should be on a lower Y than spares (IS_SPARE_FOR)
            expect(posOf('E1_PXS').y).toBeLessThan(posOf('spare1').y)
            expect(posOf('spare1').y).toBe(posOf('spare2').y)
        })

        it('places target node below all sources', () => {
            expect(posOf('PXS_vacuum').y).toBeGreaterThan(posOf('spare1').y)
        })
    })

    describe('applyHorizontalLayout', () => {
        const result = applyHorizontalLayout(nodes, edges)
        const posOf = (id: string) => result.find(n => n.id === id)!.position

        it('places HAS_SUBSYSTEM sources to the left of IS_SPARE_FOR sources', () => {
            expect(posOf('E1_PXS').x).toBeLessThan(posOf('spare1').x)
            expect(posOf('spare1').x).toBe(posOf('spare2').x)
        })

        it('places target node to the right of all sources', () => {
            expect(posOf('PXS_vacuum').x).toBeGreaterThan(posOf('spare1').x)
        })
    })

    describe('single relationship type – no extra rows', () => {
        const singleNodes: Node[] = [makeNode('A'), makeNode('B'), makeNode('C')]
        const singleEdges: Edge[] = [
            makeEdge('e1', 'A', 'B', 'HAS_SUBSYSTEM'),
            makeEdge('e2', 'A', 'C', 'HAS_SUBSYSTEM'),
        ]

        it('siblings with same rel type share a visual row', () => {
            const result = applyVerticalLayout(singleNodes, singleEdges)
            const posOf = (id: string) => result.find(n => n.id === id)!.position
            expect(posOf('B').y).toBe(posOf('C').y)
        })
    })

    describe('column reservation – long edge skips intermediate row nodes', () => {
        /**
         * E1_PXS --HAS_SUBSYSTEM--> PXS_vacuum (spans 2 rows: 0→2)
         * spare1 --IS_SPARE_FOR-->  PXS_vacuum (row 1→2, normal)
         * spare2 --IS_SPARE_FOR-->  PXS_vacuum (row 1→2, normal)
         *
         * E1_PXS at col 0. Its column is reserved on row 1.
         * Spares skip col 0, placed at col 1+.
         */
        const n: Node[] = [
            makeNode('E1_PXS'),
            makeNode('spare1'),
            makeNode('spare2'),
            makeNode('PXS_vacuum'),
        ]
        const e: Edge[] = [
            makeEdge('e1', 'E1_PXS', 'PXS_vacuum', 'HAS_SUBSYSTEM'),
            makeEdge('e2', 'spare1', 'PXS_vacuum', 'IS_SPARE_FOR'),
            makeEdge('e3', 'spare2', 'PXS_vacuum', 'IS_SPARE_FOR'),
        ]

        it('spares are offset right of E1_PXS (col 0 reserved on their row)', () => {
            const result = applyVerticalLayout(n, e)
            const posOf = (id: string) => result.find(nd => nd.id === id)!.position
            expect(posOf('spare1').x).toBeGreaterThan(posOf('E1_PXS').x)
            expect(posOf('spare2').x).toBeGreaterThan(posOf('spare1').x)
        })

        it('E1_PXS and PXS_vacuum share the same column (x=0)', () => {
            const result = applyVerticalLayout(n, e)
            const posOf = (id: string) => result.find(nd => nd.id === id)!.position
            expect(posOf('E1_PXS').x).toBe(0)
            expect(posOf('PXS_vacuum').x).toBe(0)
        })
    })

    describe('no edges – all on same row', () => {
        const isolated: Node[] = [makeNode('X'), makeNode('Y')]
        const noEdges: Edge[] = []

        it('disconnected nodes share the same visual row', () => {
            const result = applyVerticalLayout(isolated, noEdges)
            const posOf = (id: string) => result.find(n => n.id === id)!.position
            expect(posOf('X').y).toBe(posOf('Y').y)
        })
    })

    describe('empty graph', () => {
        it('returns empty array', () => {
            expect(applyVerticalLayout([], [])).toEqual([])
            expect(applyHorizontalLayout([], [])).toEqual([])
        })
    })
})
