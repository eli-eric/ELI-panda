import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { request } from 'graphql-request'
import React from 'react'

import { guardSystemEdit } from '@/modules/shared/system/edit-permission/utils/guardSystemEdit'

jest.mock('graphql-request', () => ({
    request: jest.fn(),
}))

jest.mock('@/modules/shared/system/edit-permission/utils/guardSystemEdit', () => ({ guardSystemEdit: jest.fn() }))

jest.mock('sonner', () => ({ toast: { promise: jest.fn() } }))

jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: ({ id }: { id: string }) => id,
    }),
}))

const mockRequest = request as jest.Mock
const mockGuardSystemEdit = guardSystemEdit as jest.Mock

const mockSuccessResponse = {
    updateSystems: {
        systems: [
            {
                uid: 'sys-1',
                name: 'Test System',
                systemCode: 'TST-001',
                systemLevel: 'KEY_SYSTEMS',
                description: 'desc',
                location: { uid: 'loc-1', name: 'Location 1' },
                zone: { uid: 'zone-1', name: 'Zone 1' },
                systemType: { uid: 'type-1', name: 'Type 1' },
                responsible: { uid: 'emp-1', fullName: 'John Doe' },
                responsibleTeam: null,
            },
        ],
    },
    updatedByResolver: 'WAS_UPDATED_BY created successfully',
}

describe('useSystemFieldUpdate', () => {
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
        // Permission check passes by default; overridden in guard-specific tests.
        mockGuardSystemEdit.mockResolvedValue(true)
    })

    it('sends updatedByResolver params for scalar field update', async () => {
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('sys-1', 'name', 'New Name')
        })

        await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(1))

        const callArgs = mockRequest.mock.calls[0]
        const variables = callArgs[2]

        expect(variables).toMatchObject({
            where: { uid: 'sys-1' },
            update: { name: 'New Name' },
            node: 'System',
            nodeUid: 'sys-1',
            action: 'UPDATE',
        })
    })

    it('sends updatedByResolver params for relationship field update', async () => {
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const currentSystem = {
            location: { uid: 'old-loc' },
        }

        const { result } = renderHook(() => useSystemFieldUpdate(currentSystem), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('sys-1', 'locationUid', 'new-loc')
        })

        await waitFor(() => expect(mockRequest).toHaveBeenCalledTimes(1))

        const variables = mockRequest.mock.calls[0][2]

        expect(variables).toMatchObject({
            where: { uid: 'sys-1' },
            update: {
                location: {
                    connect: { where: { node: { uid: 'new-loc' } } },
                    disconnect: { where: { node: { uid: 'old-loc' } } },
                },
            },
            node: 'System',
            nodeUid: 'sys-1',
            action: 'UPDATE',
        })
    })

    it('invalidates history query on success', async () => {
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            await result.current.updateField('sys-1', 'name', 'New Name')
        })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith(
                expect.objectContaining({ queryKey: ['history'] }),
            )
        })

        invalidateSpy.mockRestore()
    })

    it('invalidates system detail query on success', async () => {
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            await result.current.updateField('sys-1', 'name', 'Updated')
        })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith(
                expect.objectContaining({ queryKey: ['systemDetail'] }),
            )
        })

        invalidateSpy.mockRestore()
    })

    it('builds correct disconnect for relationship with no current value', async () => {
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate({ location: null }), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('sys-1', 'locationUid', 'new-loc')
        })

        const variables = mockRequest.mock.calls[0][2]

        // Should have connect but no disconnect
        expect(variables.update.location.connect).toBeDefined()
        expect(variables.update.location.disconnect).toBeUndefined()
    })

    it('handles mutation error', async () => {
        mockRequest.mockRejectedValue(new Error('Mutation failed'))

        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            try {
                await result.current.updateField('sys-1', 'name', 'Fail')
            } catch {
                // expected
            }
        })

        await waitFor(() => expect(result.current.isPending).toBe(false))
    })

    it('never sends the GraphQL patch when the permission guard denies', async () => {
        mockGuardSystemEdit.mockResolvedValue(false)
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        await act(async () => {
            await result.current.updateField('sys-1', 'name', 'New Name')
        })

        expect(mockGuardSystemEdit).toHaveBeenCalledWith(
            expect.anything(),
            'sys-1',
            expect.any(Function),
        )
        expect(mockRequest).not.toHaveBeenCalled()
    })

    it('invalidates the can-edit cache after a responsible change', async () => {
        const { useSystemFieldUpdate } = await import('../useSystemFieldUpdate')

        const { result } = renderHook(() => useSystemFieldUpdate(), {
            wrapper: createWrapper(),
        })

        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        await act(async () => {
            await result.current.updateField('sys-1', 'responsibleUid', 'emp-2', {
                displayName: 'Jane',
            })
        })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith(
                expect.objectContaining({ queryKey: ['systemCanEdit'] }),
            )
        })

        invalidateSpy.mockRestore()
    })
})
