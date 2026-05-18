import { act, renderHook } from '@testing-library/react'

import { useRelationshipGraphInteractions } from '../useRelationshipGraphInteractions'

jest.mock('../../components/graph/EdgeDetailSheet.comp', () => ({
    EdgeDetailSheet: () => null,
}))

const baseParams = () => {
    return {
        mergedNodes: [
            { uid: 'a', name: 'NodeA' },
            { uid: 'b', name: 'NodeB' },
        ] as any,
        mergedEdges: [{ uid: 'e1', source: 'a', target: 'b' }] as any,
        selectLeaf: jest.fn(),
        openSystemEdit: jest.fn(),
        openModal: jest.fn().mockReturnValue('mid'),
    }
}

describe('useRelationshipGraphInteractions', () => {
    it('handleViewDetail forwards to selectLeaf', () => {
        const params = baseParams()
        const { result } = renderHook(() => useRelationshipGraphInteractions(params))
        result.current.handleViewDetail('uid-1')
        expect(params.selectLeaf).toHaveBeenCalledWith('uid-1')
    })

    it('handleNodeClick invokes openSystemEdit by node.id', () => {
        const params = baseParams()
        const { result } = renderHook(() => useRelationshipGraphInteractions(params))
        result.current.handleNodeClick({} as any, { id: 'node-1' } as any)
        expect(params.openSystemEdit).toHaveBeenCalledWith('node-1')
    })

    it('handleNodeClick suppresses click within 300ms after context menu closed', () => {
        jest.useFakeTimers()
        try {
            const params = baseParams()
            const { result } = renderHook(() => useRelationshipGraphInteractions(params))
            act(() => result.current.handleContextMenuChange(false))
            result.current.handleNodeClick({} as any, { id: 'node-1' } as any)
            expect(params.openSystemEdit).not.toHaveBeenCalled()
            jest.advanceTimersByTime(301)
            result.current.handleNodeClick({} as any, { id: 'node-1' } as any)
            expect(params.openSystemEdit).toHaveBeenCalledWith('node-1')
        } finally {
            jest.useRealTimers()
        }
    })

    it('handleEdgeClick opens sheet with EdgeDetailSheet + source/target names', () => {
        const params = baseParams()
        const { result } = renderHook(() => useRelationshipGraphInteractions(params))
        result.current.handleEdgeClick({} as any, { id: 'e1' } as any)
        const [kind, config] = params.openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('edge-detail-e1')
        expect(config.props.sourceName).toBe('NodeA')
        expect(config.props.targetName).toBe('NodeB')
        expect(config.props.side).toBe('right')
    })

    it('handleEdgeClick no-op when edge not in mergedEdges', () => {
        const params = baseParams()
        const { result } = renderHook(() => useRelationshipGraphInteractions(params))
        result.current.handleEdgeClick({} as any, { id: 'unknown' } as any)
        expect(params.openModal).not.toHaveBeenCalled()
    })

    it('handleEdgeClick uses uid fallback when source/target node not found', () => {
        const params = baseParams()
        params.mergedNodes = [] as any
        const { result } = renderHook(() => useRelationshipGraphInteractions(params))
        result.current.handleEdgeClick({} as any, { id: 'e1' } as any)
        const config = params.openModal.mock.calls[0][1]
        expect(config.props.sourceName).toBe('a')
        expect(config.props.targetName).toBe('b')
    })
})
