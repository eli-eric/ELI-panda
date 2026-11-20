import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'
import React from 'react'

import { queryMutate } from '@/utils/fetcher'

import { useRecalculateSpareParts } from '../useRecalculateSpareParts'

jest.mock('@/utils/fetcher', () => ({ queryMutate: jest.fn() }))

const mockQueryMutate = queryMutate as jest.Mock

describe('useRecalculateSpareParts', () => {
    let queryClient: QueryClient
    let invalidateSpy: jest.SpyInstance
    const recalcFn = jest.fn()

    const createWrapper = () => {
        queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
        invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        recalcFn.mockResolvedValue({})
        mockQueryMutate.mockReturnValue(recalcFn)
    })

    it('posts the recalculation and refreshes every view that shows coverage', async () => {
        const { result } = renderHook(() => useRecalculateSpareParts(), {
            wrapper: createWrapper(),
        })

        await expect(result.current()).resolves.toBe(true)

        expect(mockQueryMutate).toHaveBeenCalledWith('recalculateSpareParts', 'post')
        expect(recalcFn).toHaveBeenCalled()
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemDetail'] })
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemLeaves'] })
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systems'] })
    })

    // A failed recalc leaves the stored numbers untouched, so refetching them
    // would only re-read the same stale values.
    it('reports failure without refreshing anything', async () => {
        recalcFn.mockRejectedValue(new Error('recalc boom'))
        const { result } = renderHook(() => useRecalculateSpareParts(), {
            wrapper: createWrapper(),
        })

        await expect(result.current()).resolves.toBe(false)
        expect(invalidateSpy).not.toHaveBeenCalled()
    })
})
