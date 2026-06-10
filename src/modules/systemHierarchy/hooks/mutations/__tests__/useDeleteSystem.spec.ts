import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import { queryMutate } from '@/utils/fetcher'

import { useDeleteSystem } from '../useDeleteSystem'

jest.mock('@/utils/fetcher', () => ({ queryMutate: jest.fn() }))

const mockQueryMutate = queryMutate as jest.Mock

describe('useDeleteSystem', () => {
    let queryClient: QueryClient
    let invalidateSpy: jest.SpyInstance
    const deleteFn = jest.fn()
    const recalcFn = jest.fn()

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: { mutations: { retry: false } },
        })
        invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        deleteFn.mockResolvedValue({})
        recalcFn.mockResolvedValue({})
        mockQueryMutate.mockImplementation((endpoint: string) =>
            endpoint === 'system' ? deleteFn : recalcFn,
        )
    })

    it('deletes, recalculates spare parts, then invalidates all hierarchy keys', async () => {
        const { result } = renderHook(() => useDeleteSystem(), { wrapper: createWrapper() })

        await result.current.mutateAsync({ uid: 'sys-1' })

        expect(mockQueryMutate).toHaveBeenCalledWith('system', 'delete', { uid: 'sys-1' })
        expect(deleteFn).toHaveBeenCalled()
        expect(mockQueryMutate).toHaveBeenCalledWith('recalculateSpareParts', 'post')
        expect(recalcFn).toHaveBeenCalled()

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemsHierarchy'] })
        })
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemLeaves'] })
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemLeavesCount'] })
        expect(invalidateSpy).toHaveBeenCalledTimes(4)
    })

    it('still invalidates when the recalc call fails', async () => {
        recalcFn.mockRejectedValue(new Error('recalc boom'))
        const { result } = renderHook(() => useDeleteSystem(), { wrapper: createWrapper() })

        await result.current.mutateAsync({ uid: 'sys-1' })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemsHierarchy'] })
        })
        expect(invalidateSpy).toHaveBeenCalledTimes(4)
    })
})
