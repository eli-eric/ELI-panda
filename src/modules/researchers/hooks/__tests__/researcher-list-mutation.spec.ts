import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useResearcherMutation } from '../useResearcherMutation'
import { useResearchers } from '../useResearchers'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'fn'),
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQueryClient.mockReturnValue({ invalidateQueries: jest.fn().mockResolvedValue(undefined) })
    mockUseQueryManager.mockReturnValue({ query: { p: 1 } })
})

describe('useResearchers', () => {
    it('threads tableId + queryKey', () => {
        renderHook(() => useResearchers('table-1'))
        expect(mockUseQueryManager).toHaveBeenCalledWith('table-1', undefined, true)
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual([
            'researchers',
            { query: { p: 1 } },
        ])
    })
})

describe('useResearcherMutation', () => {
    it('uses POST + ["create-researcher"] without uid', () => {
        renderHook(() => useResearcherMutation())
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['create-researcher'])
    })

    it('uses PUT + ["researcher", uid] with uid', () => {
        renderHook(() => useResearcherMutation({ uid: 'r-1' }))
        const opts = mockUseMutation.mock.calls[0][0]
        expect(opts.mutationKey).toEqual(['researcher', 'r-1'])
    })

    it('onSuccess invalidates ["researchers"] always + ["researcher", { uid }] when uid set, then calls onSuccess prop', async () => {
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ invalidateQueries })
        const onSuccess = jest.fn()

        renderHook(() => useResearcherMutation({ uid: 'r-1', onSuccess }))
        const opts = mockUseMutation.mock.calls[0][0]
        await opts.onSuccess({ data: { uid: 'r-1', name: 'R' } })

        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['researchers'] })
        expect(invalidateQueries).toHaveBeenCalledWith({
            queryKey: ['researcher', { uid: 'r-1' }],
        })
        expect(onSuccess).toHaveBeenCalledWith({ uid: 'r-1', name: 'R' })
    })

    it('onSuccess skips per-uid invalidation when no uid', async () => {
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ invalidateQueries })

        renderHook(() => useResearcherMutation())
        const opts = mockUseMutation.mock.calls[0][0]
        await opts.onSuccess({ data: { uid: 'new' } })

        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['researchers'] })
        expect(invalidateQueries).toHaveBeenCalledTimes(1)
    })
})
