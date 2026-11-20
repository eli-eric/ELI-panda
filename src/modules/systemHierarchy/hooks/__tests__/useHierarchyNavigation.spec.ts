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

    describe('directOnly', () => {
        it('reads the flag off the URL', () => {
            mockQuery = { parent: 'A', direct: '1' }
            const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
            expect(result.current.directOnly).toBe(true)
        })

        it('treats any other value as off', () => {
            mockQuery = { parent: 'A', direct: 'true' }
            const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
            expect(result.current.directOnly).toBe(false)
        })

        it('setDirectOnly(true) sets the flag and drops a stale page', () => {
            mockQuery = { parent: 'A', page: '9' }
            const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
            act(() => result.current.setDirectOnly(true))
            expect(lastPushedQuery()).toEqual({ parent: 'A', direct: '1' })
        })

        it('setDirectOnly(false) removes the flag and the page alike', () => {
            mockQuery = { parent: 'A', direct: '1', page: '4' }
            const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
            act(() => result.current.setDirectOnly(false))
            expect(lastPushedQuery()).toEqual({ parent: 'A' })
        })

        it('keeps filters and search — the mode narrows scope, it does not replace them', () => {
            mockQuery = { parent: 'A', search: 'pump', filter: '[{"id":"zone"}]' }
            const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
            act(() => result.current.setDirectOnly(true))
            expect(lastPushedQuery()).toEqual({
                parent: 'A',
                search: 'pump',
                filter: '[{"id":"zone"}]',
                direct: '1',
            })
        })

        it('survives switching to another tree node, unlike page', () => {
            mockQuery = { parent: 'A', direct: '1', page: '3' }
            const { result } = renderHook(() => useHierarchyNavigation(), { wrapper })
            act(() => result.current.selectParent('B'))
            expect(lastPushedQuery()).toEqual({ parent: 'B', direct: '1' })
        })
    })
})
