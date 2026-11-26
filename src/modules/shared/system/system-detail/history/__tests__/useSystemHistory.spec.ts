import { renderHook, waitFor } from '@testing-library/react'

import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'
import { queryFetcher } from '@/utils/fetcher'

import { useSystemHistory } from '../useSystemHistory'

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(),
}))

const mockQueryFetcher = queryFetcher as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useSystemHistory', () => {
    it('disabled when uid null', () => {
        mockQueryFetcher.mockReturnValue(jest.fn())
        const { result } = renderHook(() => useSystemHistory(null), {
            wrapper: QueryClientWrapper,
        })
        expect(result.current.isFetching).toBe(false)
    })

    it('fetches history queryFetcher when uid present + normalizes structured changes', async () => {
        const items = [
            { uid: 'h1', changes: [{ field: 'name', oldValue: 'a', newValue: 'b' }] },
            { uid: 'h2', changes: '[{"field":"zone","oldValue":null,"newValue":{"uid":"z"}}]' },
            { uid: 'h3', changes: undefined },
            { uid: 'h4', changes: 'invalid-json' },
        ]
        mockQueryFetcher.mockReturnValue(jest.fn().mockResolvedValue(items))
        const { result } = renderHook(() => useSystemHistory('sys-1'), {
            wrapper: QueryClientWrapper,
        })
        await waitFor(() => expect(result.current.data).toBeDefined())
        const data = result.current.data!
        expect(data[0].changes).toEqual([{ field: 'name', oldValue: 'a', newValue: 'b' }])
        expect(data[1].changes).toEqual([
            { field: 'zone', oldValue: null, newValue: { uid: 'z' } },
        ])
        expect(data[2].changes).toBeUndefined()
        expect(data[3].changes).toBeUndefined()
    })
})
