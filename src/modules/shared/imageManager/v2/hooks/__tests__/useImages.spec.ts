import { renderHook, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { uniFetcher } from '@/utils/fetcher'

import { useImages } from '../useImages'

jest.mock('@/utils/fetcher', () => ({
    uniFetcher: jest.fn(),
}))

const mockUniFetcher = uniFetcher as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useImages', () => {
    it('fetches /api/{type}/{id}/image when itemId provided', async () => {
        mockUniFetcher.mockResolvedValue([{ id: 'i-1', name: 'a.png' }])
        const { result } = renderHook(
            () => useImages({ itemType: 'catalogue' as any, itemId: 'sys-1' }),
            { wrapper: QueryClientWrapper },
        )
        await waitFor(() => expect(result.current.data).toBeDefined())
        expect(mockUniFetcher).toHaveBeenCalledWith('/api/catalogue/sys-1/image')
        expect(result.current.data).toEqual([{ id: 'i-1', name: 'a.png' }])
    })

    it('returns empty array when itemId falsy (disabled query)', () => {
        const { result } = renderHook(
            () => useImages({ itemType: 'catalogue' as any, itemId: '' }),
            { wrapper: QueryClientWrapper },
        )
        expect(result.current.isLoading).toBe(false)
        expect(mockUniFetcher).not.toHaveBeenCalled()
    })
})
