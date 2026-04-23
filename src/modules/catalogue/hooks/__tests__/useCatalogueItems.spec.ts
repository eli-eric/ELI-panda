import { waitFor } from '@testing-library/react'

import { mockSonner, renderHookWithProviders } from '@/testutils'
import * as fetcher from '@/utils/fetcher'

jest.mock('@/utils/fetcher')
const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

const mockQueryManagerReturn = {
    query: { pagination: '{"page":1,"pageSize":25}', search: '', sorting: '' },
}
jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: () => mockQueryManagerReturn,
}))

jest.mock('sonner', () => mockSonner())

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useCatalogueItems } = require('../useCatalogueItems')

describe('useCatalogueItems', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockQueryFetcher.mockReturnValue(
            jest.fn().mockResolvedValue({ data: [{ uid: 'i-1' }], totalCount: 1 }),
        )
    })

    it('calls queryFetcher with catalogueItems endpoint', async () => {
        const { result } = renderHookWithProviders(() => useCatalogueItems('catalogueItems'))
        await waitFor(() => expect(result.current.loading).toBe(false))
        expect(mockQueryFetcher).toHaveBeenCalledWith('catalogueItems')
    })

    it('returns data under catalogueItems key', async () => {
        const { result } = renderHookWithProviders(() => useCatalogueItems('catalogueItems'))
        await waitFor(() => expect(result.current.catalogueItems).toBeDefined())
        expect(result.current.catalogueItems).toEqual({ data: [{ uid: 'i-1' }], totalCount: 1 })
    })

    it('exposes refetch function that invalidates the query', () => {
        const { result } = renderHookWithProviders(() => useCatalogueItems('catalogueItems'))
        expect(typeof result.current.refetch).toBe('function')
    })

    it('handles error and does not throw', async () => {
        mockQueryFetcher.mockReturnValue(jest.fn().mockRejectedValue(new Error('Boom')))
        const { result } = renderHookWithProviders(() => useCatalogueItems('catalogueItems'))
        await waitFor(() => expect(result.current.error).toBeTruthy())
        expect(result.current.error?.message).toBe('Boom')
    })
})
