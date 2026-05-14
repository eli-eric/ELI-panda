import { RELATIONSHIP_TYPES } from '../../types/graph'
import {
    DEFAULT_GRAPH_FILTERS,
    filterConnectedNodes,
    filterEdges,
    filterNodes,
    getConnectedNodeUids,
} from '../graphFilters'

const node = (uid: string, overrides: Record<string, unknown> = {}) =>
    ({
        uid,
        name: `Name-${uid}`,
        systemLevel: 'KeySystems',
        systemCode: `SC-${uid}`,
        systemType: { name: 'TypeA' },
        ...overrides,
    }) as any

const edge = (source: string, target: string, relationship: string) =>
    ({ source, target, relationship }) as any

describe('graphFilters', () => {
    describe('filterNodes', () => {
        it('returns all nodes for default filters', () => {
            const nodes = [node('a'), node('b')]
            expect(filterNodes(nodes, DEFAULT_GRAPH_FILTERS).length).toBe(2)
        })

        it('filters by search against name', () => {
            const nodes = [node('a', { name: 'Alpha' }), node('b', { name: 'Beta' })]
            const result = filterNodes(nodes, { ...DEFAULT_GRAPH_FILTERS, search: 'alp' })
            expect(result.map(n => n.uid)).toEqual(['a'])
        })

        it('filters by search against systemCode', () => {
            const nodes = [node('a', { systemCode: 'SC-XYZ' }), node('b', { systemCode: 'OTHER' })]
            const result = filterNodes(nodes, { ...DEFAULT_GRAPH_FILTERS, search: 'xyz' })
            expect(result.map(n => n.uid)).toEqual(['a'])
        })

        it('filters by systemLevels list', () => {
            const nodes = [
                node('a', { systemLevel: 'A' }),
                node('b', { systemLevel: 'B' }),
            ]
            const result = filterNodes(nodes, {
                ...DEFAULT_GRAPH_FILTERS,
                systemLevels: ['A'],
            })
            expect(result.map(n => n.uid)).toEqual(['a'])
        })

        it('filters by systemType.name', () => {
            const nodes = [
                node('a', { systemType: { name: 'X' } }),
                node('b', { systemType: { name: 'Y' } }),
            ]
            const result = filterNodes(nodes, {
                ...DEFAULT_GRAPH_FILTERS,
                systemType: 'X',
            })
            expect(result.map(n => n.uid)).toEqual(['a'])
        })

        it('pinned uids bypass all filters', () => {
            const nodes = [node('a', { name: 'X' }), node('b', { name: 'Y' })]
            const result = filterNodes(
                nodes,
                { ...DEFAULT_GRAPH_FILTERS, search: 'zzz' },
                new Set(['b']),
            )
            expect(result.map(n => n.uid)).toEqual(['b'])
        })
    })

    describe('filterEdges', () => {
        it('removes edges where source or target is not visible', () => {
            const edges = [
                edge('a', 'b', RELATIONSHIP_TYPES.HAS_SUBSYSTEM),
                edge('a', 'c', RELATIONSHIP_TYPES.HAS_SUBSYSTEM),
            ]
            const result = filterEdges(edges, new Set(['a', 'b']), DEFAULT_GRAPH_FILTERS)
            expect(result.length).toBe(1)
            expect(result[0].target).toBe('b')
        })

        it('drops edges with disallowed relationship types', () => {
            const edges = [edge('a', 'b', 'WEIRD')]
            const result = filterEdges(edges, new Set(['a', 'b']), DEFAULT_GRAPH_FILTERS)
            expect(result.length).toBe(0)
        })

        it('filters by relationshipTypes when list is non-empty', () => {
            const edges = [
                edge('a', 'b', RELATIONSHIP_TYPES.HAS_SUBSYSTEM),
                edge('a', 'c', RELATIONSHIP_TYPES.IS_SPARE_FOR),
            ]
            const result = filterEdges(
                edges,
                new Set(['a', 'b', 'c']),
                {
                    ...DEFAULT_GRAPH_FILTERS,
                    relationshipTypes: [RELATIONSHIP_TYPES.IS_SPARE_FOR],
                },
            )
            expect(result.length).toBe(1)
        })
    })

    describe('getConnectedNodeUids', () => {
        it('returns union of source + target uids', () => {
            const edges = [edge('a', 'b', 'x'), edge('b', 'c', 'x')]
            const result = getConnectedNodeUids(edges)
            expect([...result].sort()).toEqual(['a', 'b', 'c'])
        })
    })

    describe('filterConnectedNodes', () => {
        it('passes through unchanged when shouldFilter=false', () => {
            const nodes = [node('a'), node('b')]
            const result = filterConnectedNodes(nodes, new Set(['a']), false)
            expect(result.length).toBe(2)
        })

        it('filters to only connected uids when shouldFilter=true', () => {
            const nodes = [node('a'), node('b'), node('c')]
            const result = filterConnectedNodes(nodes, new Set(['a', 'c']), true)
            expect(result.map(n => n.uid).sort()).toEqual(['a', 'c'])
        })
    })
})
