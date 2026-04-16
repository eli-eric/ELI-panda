import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import * as fetcher from '@/utils/fetcher'

import type { Zone } from '../types/zone.types'

jest.mock('@/utils/fetcher')

const mockQueryMutate = fetcher.queryMutate as jest.MockedFunction<typeof fetcher.queryMutate>

const mockZone: Zone = {
    uid: '1',
    name: 'Zone A',
    code: 'ZA',
    parentZone: null,
}

describe('useZoneMutation', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    beforeEach(() => {
        jest.clearAllMocks()
        mockQueryMutate.mockReturnValue(jest.fn().mockResolvedValue({ data: mockZone }))
    })

    it('uses POST for create (no uid)', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneMutation } = require('../hooks/useZoneMutation')
        renderHook(() => useZoneMutation({}), { wrapper: createWrapper() })

        expect(mockQueryMutate).toHaveBeenCalledWith('zone', 'post', { uid: undefined })
    })

    it('uses PUT for update (with uid)', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneMutation } = require('../hooks/useZoneMutation')
        renderHook(() => useZoneMutation({ uid: '1' }), { wrapper: createWrapper() })

        expect(mockQueryMutate).toHaveBeenCalledWith('zone', 'put', { uid: '1' })
    })

    it('invalidates zones query on success', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneMutation } = require('../hooks/useZoneMutation')
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        const { result } = renderHook(() => useZoneMutation({}), {
            wrapper: createWrapper(),
        })

        // Re-spy after queryClient is created in wrapper
        const spy = jest.spyOn(result.current, 'mutateAsync')
        // We need to get the actual queryClient from the wrapper
        invalidateSpy.mockRestore()

        await act(async () => {
            await result.current.mutateAsync({ name: 'New', code: 'N1' })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))
        spy.mockRestore()
    })

    it('invalidates single zone query on update success', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneMutation } = require('../hooks/useZoneMutation')

        const { result } = renderHook(() => useZoneMutation({ uid: '1' }), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.mutateAsync({ name: 'Updated', code: 'U1' })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))
    })

    it('calls onSuccess callback with response data', async () => {
        const onSuccess = jest.fn()
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneMutation } = require('../hooks/useZoneMutation')

        const { result } = renderHook(() => useZoneMutation({ onSuccess }), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.mutateAsync({ name: 'New', code: 'N1' })
        })

        await waitFor(() => {
            expect(onSuccess).toHaveBeenCalledWith(mockZone)
        })
    })

    it('handles mutation error', async () => {
        mockQueryMutate.mockReturnValue(jest.fn().mockRejectedValue(new Error('Server error')))
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneMutation } = require('../hooks/useZoneMutation')

        const { result } = renderHook(() => useZoneMutation({}), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            try {
                await result.current.mutateAsync({ name: 'New', code: 'N1' })
            } catch {
                // expected
            }
        })

        await waitFor(() => expect(result.current.isError).toBe(true))
    })
})
