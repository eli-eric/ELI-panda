import { renderHook } from '@testing-library/react'

import { useRelationshipGraph } from '../useRelationshipGraph'
import { useSystemRelationships } from '../useSystemRelationships'

jest.mock('../useRelationshipGraph', () => ({
    useRelationshipGraph: jest.fn(),
}))

jest.mock('../../../types/graph', () => ({
    EXCLUDED_RELATIONSHIP_TYPES: new Set(['EXCLUDED']),
}))

const mockUseRelationshipGraph = useRelationshipGraph as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useSystemRelationships', () => {
    it('splits edges into inbound/outbound and skips excluded', () => {
        const nodes = [
            { uid: 'sys', name: 'self' } as any,
            { uid: 'parent', name: 'P' } as any,
            { uid: 'child', name: 'C' } as any,
        ]
        const edges = [
            { source: 'parent', target: 'sys', relationship: 'PART_OF' } as any,
            { source: 'sys', target: 'child', relationship: 'HAS_PART' } as any,
            { source: 'parent', target: 'sys', relationship: 'EXCLUDED' } as any,
        ]
        mockUseRelationshipGraph.mockReturnValue({
            nodes,
            edges,
            isLoading: false,
            isFetching: false,
            error: null,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemRelationships('sys'))
        expect(result.current.inbound).toHaveLength(1)
        expect(result.current.outbound).toHaveLength(1)
        expect(result.current.hasRelationships).toBe(true)
    })

    it('returns relatedUids sorted alphabetically (deduped)', () => {
        const nodes = [
            { uid: 'sys' } as any,
            { uid: 'cccc' } as any,
            { uid: 'aaaa' } as any,
            { uid: 'bbbb' } as any,
        ]
        const edges = [
            { source: 'cccc', target: 'sys', relationship: 'R' } as any,
            { source: 'sys', target: 'aaaa', relationship: 'R' } as any,
            { source: 'bbbb', target: 'sys', relationship: 'R' } as any,
            { source: 'sys', target: 'aaaa', relationship: 'R' } as any, // duplicate
        ]
        mockUseRelationshipGraph.mockReturnValue({
            nodes,
            edges,
            isLoading: false,
            isFetching: false,
            error: null,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemRelationships('sys'))
        expect(result.current.relatedUids).toEqual(['aaaa', 'bbbb', 'cccc'])
    })

    it('hasRelationships false when no in/outbound edges', () => {
        mockUseRelationshipGraph.mockReturnValue({
            nodes: [],
            edges: [],
            isLoading: false,
            isFetching: false,
            error: null,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemRelationships('sys'))
        expect(result.current.hasRelationships).toBe(false)
    })

    it('exposes isError computed from error', () => {
        mockUseRelationshipGraph.mockReturnValue({
            nodes: [],
            edges: [],
            isLoading: false,
            isFetching: false,
            error: new Error('boom'),
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemRelationships('sys'))
        expect(result.current.isError).toBe(true)
    })
})
