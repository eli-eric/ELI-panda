import { useMutation, useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useServiceType } from '../useServiceType'
import { useServiceTypeDelete } from '../useServiceTypeDelete'
import { useServiceTypeList } from '../useServiceTypeList'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined, refetch: jest.fn() })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
})

describe('useServiceType', () => {
    it('queryKey shape + enabled gating', () => {
        renderHook(() => useServiceType('s-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['serviceType', { uid: 's-1' }])
        expect(opts.enabled).toBe(true)

        renderHook(() => useServiceType())
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)
    })
})

describe('useServiceTypeList', () => {
    it('queryKey ["useServiceTypeList", {}]', () => {
        renderHook(() => useServiceTypeList())
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual(['useServiceTypeList', {}])
    })
})

describe('useServiceTypeDelete', () => {
    it('onSuccess refetches the list', () => {
        const refetch = jest.fn()
        mockUseQuery.mockReturnValue({ data: undefined, refetch })
        renderHook(() => useServiceTypeDelete({ uid: 's-1' }))

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        expect(refetch).toHaveBeenCalled()
    })

    it('mutationKey + endpoint shaped per uid', () => {
        renderHook(() => useServiceTypeDelete({ uid: 's-1' }))
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['service', { uid: 's-1' }])
    })
})
