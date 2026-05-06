import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'
import React from 'react'

import { useHierarchyNavigation } from '../useHierarchyNavigation'

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: new QueryClient() }, children)

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
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B', leaf: 'B', tab: 'history' })
    })

    it('selectParent without leaf does not resurrect a stale tab', () => {
        mockQuery = { parent: 'A' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B' })
    })

    it('selectLeaf while already in detail preserves current tab', () => {
        mockQuery = { parent: 'A', leaf: 'X', tab: 'spare-parts' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectLeaf('Y'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', leaf: 'Y', tab: 'spare-parts' })
    })

    it('selectLeaf from leaves table sets default detail tab', () => {
        mockQuery = { parent: 'A' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectLeaf('X'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', leaf: 'X', tab: 'detail' })
    })

    it('goBackToLeaves clears leaf and tab', () => {
        mockQuery = { parent: 'A', leaf: 'X', tab: 'history' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.goBackToLeaves())
        expect(lastPushedQuery()).toEqual({ parent: 'A' })
    })

    it('setActiveView(GRAPH) then selectParent keeps view=graph', () => {
        mockQuery = { parent: 'A' }
        const { result, rerender } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.setActiveView('graph'))
        mockQuery = { parent: 'A', view: 'graph' }
        rerender()
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B', view: 'graph' })
    })

    it('selectLeaf from graph view keeps view=graph', () => {
        mockQuery = { parent: 'A', view: 'graph' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectLeaf('X'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', view: 'graph', leaf: 'X', tab: 'detail' })
    })

    it('selectParent to a different parent clears stale page query', () => {
        mockQuery = { parent: 'A', page: '9' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B' })
    })

    it('selectParent to the same parent preserves page query', () => {
        mockQuery = { parent: 'A', page: '9' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectParent('A'))
        expect(lastPushedQuery()).toEqual({ parent: 'A', page: '9' })
    })

    it('selectParent in detail mode also clears page when parent changes', () => {
        mockQuery = { parent: 'A', leaf: 'X', page: '9' }
        const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
        act(() => result.current.selectParent('B'))
        expect(lastPushedQuery()).toEqual({ parent: 'B', leaf: 'B' })
    })
})
