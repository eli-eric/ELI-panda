import type { SystemGraphResponse } from '@/modules/shared/d3/graph/types'

import type { RelationshipGraphEdge, RelationshipGraphNode } from '../../../types/graph'
import {
    fromSystemGraphResponse,
    toReactFlowEdges,
    toReactFlowNodes,
} from '../../../utils/graphTransformers'

const mockNodes: RelationshipGraphNode[] = [
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
]

const mockEdges: RelationshipGraphEdge[] = [
    {
        uid: 'e1',
        source: 'n1',
        target: 'n2',
        relationship: 'POWERED_BY',
        description: 'Motor powers pump',
    },
]

describe('toReactFlowNodes', () => {
    it('maps API nodes to ReactFlow nodes with correct ids', () => {
        const result = toReactFlowNodes(mockNodes)
        expect(result).toHaveLength(2)
        expect(result[0].id).toBe('n1')
        expect(result[1].id).toBe('n2')
    })

    it('sets node type to systemNode', () => {
        const result = toReactFlowNodes(mockNodes)
        expect(result[0].type).toBe('systemNode')
    })

    it('includes data with name and systemCode', () => {
        const result = toReactFlowNodes(mockNodes)
        expect(result[0].data.name).toBe('Pump A')
        expect(result[0].data.systemCode).toBe('SYS-001')
    })

    it('includes Tailwind nodeClasses matching systemLevel', () => {
        const result = toReactFlowNodes(mockNodes)
        expect(result[0].data.nodeClasses).toContain('orange')
        expect(result[1].data.nodeClasses).toContain('lime')
    })

    it('assigns grid positions', () => {
        const result = toReactFlowNodes(mockNodes)
        expect(result[0].position).toEqual({ x: 0, y: 0 })
        expect(result[1].position.x).toBeGreaterThan(0)
    })

    it('returns empty array for empty input', () => {
        expect(toReactFlowNodes([])).toEqual([])
    })
})

describe('toReactFlowEdges', () => {
    it('maps API edges to ReactFlow edges', () => {
        const result = toReactFlowEdges(mockEdges)
        expect(result).toHaveLength(1)
        expect(result[0].id).toBe('e1')
        expect(result[0].source).toBe('n1')
        expect(result[0].target).toBe('n2')
    })

    it('sets edge type to relationshipEdge', () => {
        const result = toReactFlowEdges(mockEdges)
        expect(result[0].type).toBe('relationshipEdge')
    })

    it('includes label from relationship type', () => {
        const result = toReactFlowEdges(mockEdges)
        expect(result[0].data?.label).toBe('Powered By')
    })

    it('returns empty array for empty input', () => {
        expect(toReactFlowEdges([])).toEqual([])
    })
})

describe('fromSystemGraphResponse', () => {
    const apiResponse: SystemGraphResponse = {
        nodes: [
            {
                uid: 'n1',
                name: 'Pump A',
                properties: {
                    systemCode: 'SYS-001',
                    systemLevel: 'KEY_SYSTEMS',
                    systemType: 'Pump',
                    systemTypeUid: 'st1',
                },
            },
            {
                uid: 'n2',
                name: 'Motor B',
                properties: { systemLevel: 'TECHNOLOGY_UNIT' },
            },
        ],
        links: [{ source: 'n1', target: 'n2', relationship: 'POWERED_BY' }],
    }

    it('maps API nodes to RelationshipGraphNode shape', () => {
        const result = fromSystemGraphResponse(apiResponse)
        expect(result.nodes).toHaveLength(2)
        expect(result.nodes[0].uid).toBe('n1')
        expect(result.nodes[0].name).toBe('Pump A')
        expect(result.nodes[0].systemCode).toBe('SYS-001')
        expect(result.nodes[0].systemLevel).toBe('KEY_SYSTEMS')
        expect(result.nodes[0].systemType).toEqual({ uid: 'st1', name: 'Pump' })
    })

    it('handles missing properties gracefully', () => {
        const result = fromSystemGraphResponse(apiResponse)
        expect(result.nodes[1].systemCode).toBeNull()
        expect(result.nodes[1].systemType).toBeNull()
        expect(result.nodes[1].systemLevel).toBe('TECHNOLOGY_UNIT')
    })

    it('generates edge uids and maps links', () => {
        const result = fromSystemGraphResponse(apiResponse)
        expect(result.links).toHaveLength(1)
        expect(result.links[0].uid).toContain('edge-')
        expect(result.links[0].source).toBe('n1')
        expect(result.links[0].target).toBe('n2')
        expect(result.links[0].relationship).toBe('POWERED_BY')
    })
})
