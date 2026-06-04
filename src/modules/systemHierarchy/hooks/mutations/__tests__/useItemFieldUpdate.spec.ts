import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

jest.mock('graphql-request', () => ({
    request: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))

jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }) => id,
    }),
}))

const mockRequest = request as jest.Mock

const mockSuccessResponse = {
    updateItems: {
        items: [
            {
                uid: 'item-1',
                serialNumber: 'SN-1',
                notes: null,
                itemUsage: null,
                conditionStatus: null,
            },
        ],
    },
    updatedByResolver: 'WAS_UPDATED_BY created successfully',
}

describe('useItemFieldUpdate', () => {
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
        mockRequest.mockResolvedValue(mockSuccessResponse)
    })

    it('records WAS_UPDATED_BY against the System node for a scalar item field', async () => {
        const { useItemFieldUpdate } = await import('../useItemFieldUpdate')

        const { result } = renderHook(() => useItemFieldUpdate('sys-1'), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('item-1', 'serialNumber', 'SN-2', {
                previousValue: 'SN-1',
            })
        })

        await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(1))

        const variables = mockRequest.mock.calls[0][2]

        expect(variables).toMatchObject({
            where: { uid: 'item-1' }, // item is updated
            update: { serialNumber: 'SN-2' },
            node: 'System', // ...but the audit edge is on the owning system
            nodeUid: 'sys-1',
            action: 'UPDATE',
        })
        // change entry captured for the history feed
        expect(JSON.parse(variables.changes)).toEqual([
            expect.objectContaining({ field: 'serialNumber', oldValue: 'SN-1', newValue: 'SN-2' }),
        ])
    })

    it('records a codebook change entry for a relationship item field', async () => {
        const { useItemFieldUpdate } = await import('../useItemFieldUpdate')

        const { result } = renderHook(
            () => useItemFieldUpdate('sys-1', { itemUsage: { uid: 'old-usage', name: 'Spare' } }),
            { wrapper: createWrapper() },
        )

        await act(async () => {
            await result.current.updateField('item-1', 'itemUsageUid', 'new-usage', {
                displayName: 'In System Part',
            })
        })

        await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(1))

        const variables = mockRequest.mock.calls[0][2]

        expect(variables).toMatchObject({
            update: {
                itemUsage: {
                    connect: { where: { node: { uid: 'new-usage' } } },
                    disconnect: { where: { node: { uid: 'old-usage' } } },
                },
            },
            node: 'System',
            nodeUid: 'sys-1',
        })
        expect(JSON.parse(variables.changes)).toEqual([
            expect.objectContaining({
                field: 'itemUsage',
                oldValue: { uid: 'old-usage', name: 'Spare' },
                newValue: { uid: 'new-usage', name: 'In System Part' },
            }),
        ])
    })

    it('invalidates history and system detail on success', async () => {
        const { useItemFieldUpdate } = await import('../useItemFieldUpdate')

        const { result } = renderHook(() => useItemFieldUpdate('sys-1'), {
            wrapper: createWrapper(),
        })

        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            await result.current.updateField('item-1', 'notes', 'hello')
        })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith(
                expect.objectContaining({ queryKey: ['history'] }),
            )
            expect(invalidateSpy).toHaveBeenCalledWith(
                expect.objectContaining({ queryKey: ['systemDetail'] }),
            )
        })

        invalidateSpy.mockRestore()
    })
})
