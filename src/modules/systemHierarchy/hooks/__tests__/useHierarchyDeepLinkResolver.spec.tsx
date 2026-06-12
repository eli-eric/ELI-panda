import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import React from 'react'

import { useHierarchyStore } from '../../store/useHierarchyStore'
import { useHierarchyDeepLinkResolver } from '../useHierarchyDeepLinkResolver'

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: new QueryClient() }, children)

const mockPush = jest.fn()
const mockReplace = jest.fn()
let mockQuery: Record<string, string | undefined> = {}
let mockIsReady = true

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: mockQuery,
        pathname: '/systems/hierarchy',
        isReady: mockIsReady,
        push: mockPush,
        replace: mockReplace,
    }),
}))

type MockSystem = { uid: string; parentPath: { uid: string; name: string }[] | null } | null
let mockSystem: MockSystem = null

jest.mock('../queries/useSystemDetail', () => ({
    useSystemDetail: () => ({ system: mockSystem }),
    primeSystemDetailCache: jest.fn(),
}))

const lastReplacedQuery = () => mockReplace.mock.calls.at(-1)?.[0]?.query

describe('useHierarchyDeepLinkResolver', () => {
    beforeEach(() => {
        mockPush.mockClear()
        mockReplace.mockClear()
        mockQuery = {}
        mockIsReady = true
        mockSystem = null
        useHierarchyStore.setState({ expandedNodes: [] })
    })

    it('resolves parent from parentPath and expands ancestors', () => {
        mockQuery = { leaf: 'X' }
        mockSystem = {
            uid: 'X',
            parentPath: [
                { uid: 'root', name: 'Root' },
                { uid: 'mid', name: 'Mid' },
            ],
        }
        renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        expect(lastReplacedQuery()).toEqual({ leaf: 'X', parent: 'mid' })
        expect(useHierarchyStore.getState().expandedNodes).toEqual(['root', 'mid'])
    })

    it('root system (empty parentPath) resolves parent to the leaf itself', () => {
        mockQuery = { leaf: 'R' }
        mockSystem = { uid: 'R', parentPath: [] }
        renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        expect(lastReplacedQuery()).toEqual({ leaf: 'R', parent: 'R' })
        expect(useHierarchyStore.getState().expandedNodes).toEqual(['R'])
    })

    it('does nothing when parent is already present', () => {
        mockQuery = { leaf: 'X', parent: 'P' }
        mockSystem = { uid: 'X', parentPath: [{ uid: 'P', name: 'P' }] }
        renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        expect(mockReplace).not.toHaveBeenCalled()
    })

    it('does nothing while router is not ready', () => {
        mockIsReady = false
        mockQuery = { leaf: 'X' }
        mockSystem = { uid: 'X', parentPath: [{ uid: 'P', name: 'P' }] }
        renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        expect(mockReplace).not.toHaveBeenCalled()
    })

    it('ignores stale keepPreviousData detail for a different uid', () => {
        mockQuery = { leaf: 'X' }
        mockSystem = { uid: 'previous-leaf', parentPath: [{ uid: 'P', name: 'P' }] }
        renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        expect(mockReplace).not.toHaveBeenCalled()
    })

    it('does not replace twice for the same leaf before the URL updates', () => {
        mockQuery = { leaf: 'X' }
        mockSystem = { uid: 'X', parentPath: [{ uid: 'P', name: 'P' }] }
        const { rerender } = renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        // new object identity (e.g. background refetch) while URL not yet updated
        mockSystem = { uid: 'X', parentPath: [{ uid: 'P', name: 'P' }] }
        rerender()
        expect(mockReplace).toHaveBeenCalledTimes(1)
    })

    it('re-resolves a later leaf-only deep link to the same leaf', () => {
        mockQuery = { leaf: 'X' }
        mockSystem = { uid: 'X', parentPath: [{ uid: 'P', name: 'P' }] }
        const { rerender } = renderHook(() => useHierarchyDeepLinkResolver(), { wrapper })
        expect(mockReplace).toHaveBeenCalledTimes(1)

        // resolution landed in the URL, then user navigates to a leaf-only link again
        mockQuery = { leaf: 'X', parent: 'P' }
        rerender()
        mockQuery = { leaf: 'X' }
        rerender()
        expect(mockReplace).toHaveBeenCalledTimes(2)
    })
})
