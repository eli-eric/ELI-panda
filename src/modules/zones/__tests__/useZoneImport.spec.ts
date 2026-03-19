import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act,renderHook, waitFor } from '@testing-library/react'
import React from 'react'

import * as fetchClient from '@/core/http/fetchClient'

import type { ZoneImportResult } from '../types/zone.types'

jest.mock('@/core/http/fetchClient')

const mockFetchRequestDetailed = fetchClient.fetchRequestDetailed as jest.MockedFunction<
    typeof fetchClient.fetchRequestDetailed
>

const mockImportResult: ZoneImportResult = {
    created: 5,
    skipped: 2,
    errors: ['Row 3: duplicate code'],
}

describe('useZoneImport', () => {
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
        mockFetchRequestDetailed.mockResolvedValue({
            data: mockImportResult,
            status: 200,
            statusText: 'OK',
            headers: {},
        })
    })

    it('sends file as FormData', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneImport } = require('../hooks/useZoneImport')
        const { result } = renderHook(() => useZoneImport(), {
            wrapper: createWrapper(),
        })

        const file = new File(['name,code\nZone A,ZA'], 'zones.csv', {
            type: 'text/csv',
        })

        await act(async () => {
            await result.current.mutateAsync(file)
        })

        expect(mockFetchRequestDetailed).toHaveBeenCalledWith(
            expect.stringContaining('/zones/import'),
            expect.objectContaining({
                method: 'POST',
                body: expect.any(FormData),
            }),
        )

        // Verify FormData contains the file
        const callArgs = mockFetchRequestDetailed.mock.calls[0]
        const formData = callArgs[1]?.body as FormData
        expect(formData.get('file')).toEqual(file)
    })

    it('returns import result data', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneImport } = require('../hooks/useZoneImport')
        const { result } = renderHook(() => useZoneImport(), {
            wrapper: createWrapper(),
        })

        const file = new File(['data'], 'zones.csv', { type: 'text/csv' })

        let importResult: ZoneImportResult | undefined
        await act(async () => {
            importResult = await result.current.mutateAsync(file)
        })

        expect(importResult).toEqual(mockImportResult)
    })

    it('invalidates zones query on success', async () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneImport } = require('../hooks/useZoneImport')
        const { result } = renderHook(() => useZoneImport(), {
            wrapper: createWrapper(),
        })

        const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries')
        const file = new File(['data'], 'zones.csv', { type: 'text/csv' })

        await act(async () => {
            await result.current.mutateAsync(file)
        })

        await waitFor(() => {
            expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['zones'] })
        })
    })

    it('handles import error', async () => {
        mockFetchRequestDetailed.mockRejectedValue(new Error('Import failed'))

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { useZoneImport } = require('../hooks/useZoneImport')
        const { result } = renderHook(() => useZoneImport(), {
            wrapper: createWrapper(),
        })

        const file = new File(['data'], 'zones.csv', { type: 'text/csv' })

        await act(async () => {
            try {
                await result.current.mutateAsync(file)
            } catch {
                // expected
            }
        })

        await waitFor(() => expect(result.current.isError).toBe(true))
    })
})
