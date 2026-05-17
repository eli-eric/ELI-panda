import {
    fromSystemGraphResponse,
    toReactFlowEdges,
    toReactFlowNodes,
} from '../graphTransformers'

jest.mock('../graphColors', () => ({
    getEdgeColor: () => '#aaa',
    getNodeClasses: () => 'cls',
}))

describe('toReactFlowNodes', () => {
    it('places nodes in a 4-column grid', () => {
        const nodes = [
            { uid: 'a', name: 'A', systemLevel: 'KEY_SYSTEMS' },
            { uid: 'b', name: 'B', systemLevel: 'KEY_SYSTEMS' },
            { uid: 'c', name: 'C', systemLevel: 'KEY_SYSTEMS' },
            { uid: 'd', name: 'D', systemLevel: 'KEY_SYSTEMS' },
            { uid: 'e', name: 'E', systemLevel: 'KEY_SYSTEMS' },
        ] as any
        const result = toReactFlowNodes(nodes)
        expect(result[0].position).toEqual({ x: 0, y: 0 })
        expect(result[3].position.x).toBe(3 * 280)
        expect(result[3].position.y).toBe(0)
        expect(result[4].position).toEqual({ x: 0, y: 150 })
    })

    it('forwards hiddenRelationshipsCount + onExpand into node.data', () => {
        const onExpand = jest.fn()
        const result = toReactFlowNodes(
            [{ uid: 'a', name: 'A', systemLevel: 'KEY_SYSTEMS' } as any],
            {
                onExpand,
                hiddenRelationshipsByNodeUid: { a: 7 },
            },
        )
        const data = result[0].data as any
        expect(data.hiddenRelationshipsCount).toBe(7)
        expect(data.onExpand).toBe(onExpand)
    })

    it('defaults hiddenRelationshipsCount to 0 when not in map', () => {
        const result = toReactFlowNodes(
            [{ uid: 'a', name: 'A', systemLevel: 'KEY_SYSTEMS' } as any],
            { hiddenRelationshipsByNodeUid: {} },
        )
        expect((result[0].data as any).hiddenRelationshipsCount).toBe(0)
    })
})

describe('toReactFlowEdges', () => {
    it('maps edge uid + source + target + relationship', () => {
        const result = toReactFlowEdges([
            { uid: 'e-1', source: 'a', target: 'b', relationship: 'X' } as any,
        ])
        expect(result[0].id).toBe('e-1')
        expect(result[0].source).toBe('a')
        expect(result[0].target).toBe('b')
    })

    it('falls back to relationship code when no label exists', () => {
        const result = toReactFlowEdges([
            { uid: 'e-1', source: 'a', target: 'b', relationship: 'UNKNOWN_REL' } as any,
        ])
        expect((result[0].data as any).label).toBe('UNKNOWN_REL')
    })
})

describe('fromSystemGraphResponse', () => {
    it('keeps only System-label nodes', () => {
        const result = fromSystemGraphResponse({
            nodes: [
                { uid: 'a', name: 'A', label: 'System', properties: {} },
                { uid: 'b', name: 'B', label: 'Component', properties: {} },
            ],
            links: [],
        } as any)
        expect(result.nodes.map(n => n.uid)).toEqual(['a'])
    })

    it('drops links where source or target is not a System node', () => {
        const result = fromSystemGraphResponse({
            nodes: [
                { uid: 'a', name: 'A', label: 'System', properties: {} },
                { uid: 'b', name: 'B', label: 'Component', properties: {} },
            ],
            links: [
                { source: 'a', target: 'a', relationship: 'X' },
                { source: 'a', target: 'b', relationship: 'X' },
            ],
        } as any)
        expect(result.links.length).toBe(1)
        expect(result.links[0].source).toBe('a')
    })

    it('extracts systemType from properties when present', () => {
        const result = fromSystemGraphResponse({
            nodes: [
                {
                    uid: 'a',
                    name: 'A',
                    label: 'System',
                    properties: { systemType: 'TypeA', systemTypeUid: 'st-1' },
                },
            ],
            links: [],
        } as any)
        expect(result.nodes[0].systemType).toEqual({ uid: 'st-1', name: 'TypeA' })
    })

    it('defaults systemLevel to KEY_SYSTEMS', () => {
        const result = fromSystemGraphResponse({
            nodes: [{ uid: 'a', name: 'A', label: 'System', properties: {} }],
            links: [],
        } as any)
        expect(result.nodes[0].systemLevel).toBe('KEY_SYSTEMS')
    })

    it('generates uid when link has no uid', () => {
        const result = fromSystemGraphResponse({
            nodes: [
                { uid: 'a', name: 'A', label: 'System', properties: {} },
                { uid: 'b', name: 'B', label: 'System', properties: {} },
            ],
            links: [{ source: 'a', target: 'b', relationship: 'X' }],
        } as any)
        expect(result.links[0].uid).toMatch(/^edge-a-b-0$/)
    })

    it('passes meta + page when present', () => {
        const result = fromSystemGraphResponse({
            nodes: [],
            links: [],
            meta: { relationshipStats: {}, hiddenLinksTotal: 0 },
            page: {
                type: 'X',
                offset: 0,
                limit: 10,
                returned: 0,
                total: 0,
                hasMore: false,
            },
        } as any)
        expect(result.meta).toBeDefined()
        expect(result.page?.type).toBe('X')
    })
})
