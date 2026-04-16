import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import React from 'react'
import { toast } from 'sonner'

import * as fetchClient from '@/core/http/fetchClient'

import { useAssignRelations } from '../useAssignRelations'

jest.mock('@/core/http/fetchClient')
jest.mock('sonner')

const mockFetchRequestDetailed = fetchClient.fetchRequestDetailed as jest.MockedFunction<
    typeof fetchClient.fetchRequestDetailed
>
const mockToast = toast as jest.Mocked<typeof toast>

describe('useAssignRelations', () => {
    let queryClient: QueryClient

    const createWrapper = () => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        })

        const Wrapper = ({ children }: { children: ReactNode }) =>
            React.createElement(QueryClientProvider, { client: queryClient }, children)
        Wrapper.displayName = 'QueryClientWrapper'
        return Wrapper
    }

    const payload = {
        sourceUids: ['src-1'],
        targetUids: ['tgt-1'],
        relationshipType: 'IS_SPARE_FOR' as const,
    }

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('calls fetchRequestDetailed with correct URL, method, and payload', async () => {
        mockFetchRequestDetailed.mockResolvedValueOnce({
            data: { created: 1, skipped: 0, skippedDetails: [] },
            status: 200,
            statusText: 'OK',
            headers: {},
        })

        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() =>
            expect(mockFetchRequestDetailed).toHaveBeenCalledWith(
                expect.stringContaining('/system/relationships/batch'),
                expect.objectContaining({
                    method: 'POST',
                    body: payload,
                }),
            ),
        )
    })

    it('shows success toast with created count', async () => {
        mockFetchRequestDetailed.mockResolvedValueOnce({
            data: { created: 3, skipped: 0, skippedDetails: [] },
            status: 200,
            statusText: 'OK',
            headers: {},
        })

        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() =>
            expect(mockToast.success).toHaveBeenCalledWith('Relationships created: 3'),
        )
    })

    it('shows warning toast when skipped > 0', async () => {
        mockFetchRequestDetailed.mockResolvedValueOnce({
            data: { created: 1, skipped: 2, skippedDetails: [] },
            status: 200,
            statusText: 'OK',
            headers: {},
        })

        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() => {
            expect(mockToast.success).toHaveBeenCalledWith('Relationships created: 1')
            expect(mockToast.warning).toHaveBeenCalledWith('Skipped: 2', { duration: 10000 })
        })
    })

    it('shows no warning when skipped === 0', async () => {
        mockFetchRequestDetailed.mockResolvedValueOnce({
            data: { created: 1, skipped: 0, skippedDetails: [] },
            status: 200,
            statusText: 'OK',
            headers: {},
        })

        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() => expect(mockToast.success).toHaveBeenCalled())
        expect(mockToast.warning).not.toHaveBeenCalled()
    })

    it('shows error toast on failure', async () => {
        const error = new Error('Network error')
        ;(error as any).isAxiosError = true
        mockFetchRequestDetailed.mockRejectedValueOnce(error)

        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: createWrapper(),
        })

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() => expect(mockToast.error).toHaveBeenCalledWith('Network error'))
    })

    it('invalidates systemsList query on success', async () => {
        mockFetchRequestDetailed.mockResolvedValueOnce({
            data: { created: 1, skipped: 0, skippedDetails: [] },
            status: 200,
            statusText: 'OK',
            headers: {},
        })

        const wrapper = createWrapper()
        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')

        const { result } = renderHook(() => useAssignRelations(), { wrapper })

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() =>
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['systemsList'] }),
        )
    })

    it('returns loading true during mutation', async () => {
        let resolveRequest: (v: any) => void
        mockFetchRequestDetailed.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolveRequest = resolve
                }),
        )

        const { result } = renderHook(() => useAssignRelations(), {
            wrapper: createWrapper(),
        })

        expect(result.current.loading).toBe(false)

        act(() => {
            result.current.assignRelations(payload)
        })

        await waitFor(() => expect(result.current.loading).toBe(true))

        await act(async () => {
            resolveRequest!({
                data: { created: 1, skipped: 0, skippedDetails: [] },
                status: 200,
                statusText: 'OK',
                headers: {},
            })
        })

        await waitFor(() => expect(result.current.loading).toBe(false))
    })
})
