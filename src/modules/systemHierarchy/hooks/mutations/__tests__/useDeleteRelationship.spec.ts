import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

import { useDeleteRelationship } from '../useDeleteRelationship'

jest.mock('graphql-request', () => ({ request: jest.fn() }))

const mockRecalculate = jest.fn()
jest.mock('../useRecalculateSpareParts', () => ({
    useRecalculateSpareParts: () => mockRecalculate,
}))

const mockRequest = request as jest.Mock

describe('useDeleteRelationship', () => {
    let queryClient: QueryClient
    let invalidateSpy: jest.SpyInstance

    const createWrapper = () => {
        queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } })
        invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')
        const Wrapper = ({ children }: { children: React.ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'TestWrapper'
        return Wrapper
    }

    const spareDisconnect = {
        currentSystemUid: 'sys-1',
        relatedSystemUid: 'spare-1',
        relationshipType: 'IS_SPARE_FOR',
        direction: 'inbound' as const,
    }

    const predicateCalls = () =>
        invalidateSpy.mock.calls.filter(([arg]) => typeof arg?.predicate === 'function')

    beforeEach(() => {
        jest.clearAllMocks()
        mockRequest.mockResolvedValue({ updateSystems: { info: { relationshipsDeleted: 1 } } })
        mockRecalculate.mockResolvedValue(true)
    })

    // Removing one IS_SPARE_FOR edge re-splits the spare's coverage across the
    // systems it still covers, so the first refresh would read pre-recalc numbers.
    it('refreshes the spare views once immediately and again after the recalculation', async () => {
        const { result } = renderHook(() => useDeleteRelationship(), {
            wrapper: createWrapper(),
        })

        await result.current.deleteRelationship(spareDisconnect)

        expect(mockRecalculate).toHaveBeenCalled()
        await waitFor(() => expect(predicateCalls()).toHaveLength(2))
    })

    it('keeps the immediate refresh when the recalculation fails', async () => {
        mockRecalculate.mockResolvedValue(false)
        const { result } = renderHook(() => useDeleteRelationship(), {
            wrapper: createWrapper(),
        })

        await result.current.deleteRelationship(spareDisconnect)
        await waitFor(() => expect(mockRecalculate).toHaveBeenCalled())

        expect(predicateCalls()).toHaveLength(1)
    })

    it('does not recalculate coverage for non-spare relationships', async () => {
        const { result } = renderHook(() => useDeleteRelationship(), {
            wrapper: createWrapper(),
        })

        await result.current.deleteRelationship({
            ...spareDisconnect,
            relationshipType: 'IS_POWERED_FROM',
        })

        expect(mockRecalculate).not.toHaveBeenCalled()
        expect(predicateCalls()).toHaveLength(0)
    })
})
