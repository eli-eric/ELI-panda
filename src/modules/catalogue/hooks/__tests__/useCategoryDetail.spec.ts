import { waitFor } from '@testing-library/react'

import { renderHookWithQuery } from '@/testutils'
import * as fetcher from '@/utils/fetcher'

jest.mock('@/utils/fetcher')
const mockQueryFetcher = fetcher.queryFetcher as jest.MockedFunction<typeof fetcher.queryFetcher>

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { useCategoryDetail } = require('../useCategoryDetail')

describe('useCategoryDetail', () => {
    let mockFetchFn: jest.Mock

    beforeEach(() => {
        jest.clearAllMocks()
        mockFetchFn = jest.fn().mockResolvedValue({ uid: 'c-1', name: 'Cat' })
        mockQueryFetcher.mockReturnValue(mockFetchFn)
    })

    it('does not invoke fetch when uid is undefined (query disabled)', () => {
        const { result } = renderHookWithQuery(() => useCategoryDetail(undefined))
        expect(mockFetchFn).not.toHaveBeenCalled()
        expect(result.current.categoryDetail).toBeUndefined()
        expect(result.current.isLoading).toBe(false)
    })

    it('does not invoke fetch when uid is empty string', () => {
        const { result } = renderHookWithQuery(() => useCategoryDetail(''))
        expect(mockFetchFn).not.toHaveBeenCalled()
        expect(result.current.categoryDetail).toBeUndefined()
    })

    it('fetches and returns data when uid provided', async () => {
        const { result } = renderHookWithQuery(() => useCategoryDetail('c-1'))
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        expect(mockQueryFetcher).toHaveBeenCalledWith('catalogueCategoryEdit')
        expect(mockFetchFn).toHaveBeenCalled()
        expect(result.current.categoryDetail).toEqual({ uid: 'c-1', name: 'Cat' })
    })

    it('exposes queryKey for cache invalidation', () => {
        const { result } = renderHookWithQuery(() => useCategoryDetail('c-1'))
        expect(result.current.queryKey).toEqual(['categoryDetail', { uid: 'c-1' }])
    })

    it('keeps basic hook shape after render without wrapper (smoke guard)', () => {
        // sanity — useCategoryDetail does not crash when re-rendered with different uid
        const { result, rerender } = renderHookWithQuery(
            ({ uid }: { uid: string | undefined }) => useCategoryDetail(uid),
            { initialProps: { uid: 'c-1' } },
        )
        rerender({ uid: 'c-2' })
        expect(result.current.queryKey).toEqual(['categoryDetail', { uid: 'c-2' }])
    })
})

