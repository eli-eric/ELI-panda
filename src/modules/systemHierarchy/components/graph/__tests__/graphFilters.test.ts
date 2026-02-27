import type { RelationshipGraphEdge, RelationshipGraphNode } from '../../../types/graph'
import { filterEdges, filterNodes,type GraphFilterState } from '../../../utils/graphFilters'

const nodes: RelationshipGraphNode[] = [
    {
        uid: 'n1',
        name: 'Pump A',
        systemCode: 'SYS-001',
        systemLevel: 'KEY_SYSTEMS',
        systemType: { uid: 'st1', name: 'Pump' },
    },
    {
        uid: 'n2',
        name: 'Motor B',
        systemCode: 'SYS-002',
        systemLevel: 'TECHNOLOGY_UNIT',
        systemType: { uid: 'st2', name: 'Motor' },
    },
    {
        uid: 'n3',
        name: 'Valve C',
        systemCode: 'SYS-003',
        systemLevel: 'KEY_SYSTEMS',
        systemType: { uid: 'st3', name: 'Valve' },
    },
]

const edges: RelationshipGraphEdge[] = [
    { uid: 'e1', source: 'n1', target: 'n2', relationship: 'IS_POWERED_BY' },
    { uid: 'e2', source: 'n2', target: 'n3', relationship: 'IS_COOLED_BY' },
    { uid: 'e3', source: 'n1', target: 'n3', relationship: 'UNKNOWN_TYPE' },
]

const baseFilters: GraphFilterState = {
    search: '',
    systemLevels: [],
    systemType: null,
    relationshipTypes: [],
}

describe('filterNodes', () => {
    it('returns all nodes with no filters', () => {
        expect(filterNodes(nodes, baseFilters)).toHaveLength(3)
    })

    it('filters by search term (name)', () => {
        const result = filterNodes(nodes, { ...baseFilters, search: 'pump' })
        expect(result).toHaveLength(1)
        expect(result[0].uid).toBe('n1')
    })

    it('filters by search term (systemCode)', () => {
        const result = filterNodes(nodes, { ...baseFilters, search: 'SYS-002' })
        expect(result).toHaveLength(1)
        expect(result[0].uid).toBe('n2')
    })

    it('filters by systemLevels (multi-select)', () => {
        const result = filterNodes(nodes, { ...baseFilters, systemLevels: ['KEY_SYSTEMS'] })
        expect(result).toHaveLength(2)
    })

    it('filters by multiple systemLevels', () => {
        const result = filterNodes(nodes, {
            ...baseFilters,
            systemLevels: ['KEY_SYSTEMS', 'TECHNOLOGY_UNIT'],
        })
        expect(result).toHaveLength(3)
    })

    it('filters by systemType', () => {
        const result = filterNodes(nodes, { ...baseFilters, systemType: 'Motor' })
        expect(result).toHaveLength(1)
        expect(result[0].uid).toBe('n2')
    })

    it('combines multiple filters', () => {
        const result = filterNodes(nodes, {
            ...baseFilters,
            systemLevels: ['KEY_SYSTEMS'],
            search: 'valve',
        })
        expect(result).toHaveLength(1)
        expect(result[0].uid).toBe('n3')
    })
})

describe('filterEdges', () => {
    const allVisible = new Set(['n1', 'n2', 'n3'])

    it('returns only allowed relationship types when no type filter', () => {
        const result = filterEdges(edges, allVisible, baseFilters)
        expect(result).toHaveLength(2)
        expect(result.map(e => e.uid)).toEqual(['e1', 'e2'])
    })

    it('excludes edges with disallowed relationship types', () => {
        const result = filterEdges(edges, allVisible, baseFilters)
        expect(result.find(e => e.uid === 'e3')).toBeUndefined()
    })

    it('hides edges when source not visible', () => {
        const visible = new Set(['n2', 'n3'])
        const result = filterEdges(edges, visible, baseFilters)
        expect(result).toHaveLength(1)
        expect(result[0].uid).toBe('e2')
    })

    it('filters by relationship types (multi-select)', () => {
        const result = filterEdges(edges, allVisible, {
            ...baseFilters,
            relationshipTypes: ['IS_POWERED_BY'],
        })
        expect(result).toHaveLength(1)
        expect(result[0].uid).toBe('e1')
    })

    it('filters by multiple relationship types', () => {
        const result = filterEdges(edges, allVisible, {
            ...baseFilters,
            relationshipTypes: ['IS_POWERED_BY', 'IS_COOLED_BY'],
        })
        expect(result).toHaveLength(2)
    })
})
