import { act, renderHook } from '@testing-library/react'

import { useHierarchyNavigation } from '../useHierarchyNavigation'

const mockPush = jest.fn()
let mockQuery: Record<string, string | undefined> = {}

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: mockQuery,
        pathname: '/systems/hierarchy',
        push: mockPush,
    }),
}))

const lastPushedQuery = () => mockPush.mock.calls.at(-1)?.[0]?.query

describe('useHierarchyNavigation', () => {
    beforeEach(() => {
        mockPush.mockClear()
        mockQuery = {}
    })

    it('selectParent in detail mode swaps detail subject and preserves tab', () => {
        mockQuery = { parent: 'A', leaf: 'X', tab: 'history' }
        const { result } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B', leaf: 'B', tab: 'history' })
    })

    it('selectParent without leaf does not resurrect a stale tab', () => {
        mockQuery = { parent: 'A' }
        const { result } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B' })
    })

    it('selectLeaf while already in detail preserves current tab', () => {
        mockQuery = { parent: 'A', leaf: 'X', tab: 'spare-parts' }
        const { result } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.selectLeaf('Y'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', leaf: 'Y', tab: 'spare-parts' })
    })

    it('selectLeaf from leaves table sets default detail tab', () => {
        mockQuery = { parent: 'A' }
        const { result } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.selectLeaf('X'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', leaf: 'X', tab: 'detail' })
    })

    it('goBackToLeaves clears leaf and tab', () => {
        mockQuery = { parent: 'A', leaf: 'X', tab: 'history' }
        const { result } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.goBackToLeaves())
        expect(lastPushedQuery()).toEqual({ parent: 'A' })
    })

    it('setActiveView(GRAPH) then selectParent keeps view=graph', () => {
        mockQuery = { parent: 'A' }
        const { result, rerender } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.setActiveView('graph'))
        mockQuery = { parent: 'A', view: 'graph' }
        rerender()
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B', view: 'graph' })
    })

    it('selectLeaf from graph view keeps view=graph', () => {
        mockQuery = { parent: 'A', view: 'graph' }
        const { result } = renderHook(() => useHierarchyNavigation())
        act(() => result.current.selectLeaf('X'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', view: 'graph', leaf: 'X', tab: 'detail' })
    })
})
