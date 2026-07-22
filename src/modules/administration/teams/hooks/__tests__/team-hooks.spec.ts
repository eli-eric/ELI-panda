import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { queryMutate } from '@/utils/fetcher'

import { useTeam } from '../useTeam'
import { useTeamCreate } from '../useTeamCreate'
import { useTeamFieldUpdate } from '../useTeamFieldUpdate'
import { useTeamMembers } from '../useTeamMembers'
import { useTeams } from '../useTeams'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryFetcher: jest.fn(() => 'query-fn'),
    queryMutate: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { promise: jest.fn(), error: jest.fn() } }))

jest.mock('react-intl', () => ({
    useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }),
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockQueryMutate = queryMutate as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ data: undefined })
    mockUseMutation.mockImplementation((opts: any) => ({ ...opts, mutateAsync: jest.fn() }))
    mockUseQueryClient.mockReturnValue({
        invalidateQueries: jest.fn().mockResolvedValue(undefined),
        setQueryData: jest.fn(),
    })
})

describe('useTeams', () => {
    it('queries the teams list', () => {
        renderHook(() => useTeams())
        expect(mockUseQuery.mock.calls[0][0].queryKey).toEqual(['teams'])
    })
})

describe('useTeam', () => {
    it('keys by uid and gates on enabled', () => {
        renderHook(() => useTeam('t-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['team', { uid: 't-1' }])
        expect(opts.enabled).toBe(true)

        renderHook(() => useTeam(null))
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)
    })
})

describe('useTeamCreate', () => {
    it('POSTs a trimmed payload, dropping empty code/description', async () => {
        const inner = jest.fn().mockResolvedValue({ data: { uid: 'new' } })
        mockQueryMutate.mockReturnValue(inner)

        renderHook(() => useTeamCreate())
        const opts = mockUseMutation.mock.calls[0][0]
        await opts.mutationFn({ name: '  Alpha  ', code: '  ', description: '' })

        expect(mockQueryMutate).toHaveBeenCalledWith('teams', 'post')
        expect(inner).toHaveBeenCalledWith({
            name: 'Alpha',
            code: undefined,
            description: undefined,
        })
    })
})

describe('useTeamMembers', () => {
    it('PUTs to teamMembers and refreshes caches on success', () => {
        const inner = jest.fn()
        mockQueryMutate.mockReturnValue(inner)
        const setQueryData = jest.fn()
        const invalidateQueries = jest.fn()
        mockUseQueryClient.mockReturnValue({ setQueryData, invalidateQueries })

        renderHook(() => useTeamMembers('t-1'))
        expect(mockQueryMutate).toHaveBeenCalledWith('teamMembers', 'put', { uid: 't-1' })

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({ data: { uid: 't-1', members: [] } })
        expect(setQueryData).toHaveBeenCalledWith(
            ['team', { uid: 't-1' }],
            { uid: 't-1', members: [] },
        )
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['teams'] })
    })
})

describe('useTeamFieldUpdate', () => {
    it('PATCHes teamDetail with a single-key payload', async () => {
        const inner = jest.fn().mockResolvedValue({ data: {} })
        mockQueryMutate.mockReturnValue(inner)

        const { result } = renderHook(() => useTeamFieldUpdate())
        await result.current.updateField('t-1', 'code', null)

        expect(mockQueryMutate).toHaveBeenCalledWith('teamDetail', 'patch', { uid: 't-1' })
        expect(inner).toHaveBeenCalledWith({ code: null })
    })
})
