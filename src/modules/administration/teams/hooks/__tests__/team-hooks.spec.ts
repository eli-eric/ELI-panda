import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { queryMutate } from '@/utils/fetcher'

import { useRemoveTeamMember } from '../useRemoveTeamMember'
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

    it('does not forward selection when the API returns no body', async () => {
        mockQueryMutate.mockReturnValue(jest.fn())
        const onSuccess = jest.fn()

        renderHook(() => useTeamCreate({ onSuccess }))
        const opts = mockUseMutation.mock.calls[0][0]
        await opts.onSuccess({ data: undefined })

        expect(onSuccess).not.toHaveBeenCalled()
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

        // Merges the response into the cached team rather than overwriting it.
        expect(setQueryData).toHaveBeenCalledWith(['team', { uid: 't-1' }], expect.any(Function))
        const updater = setQueryData.mock.calls[0][1]
        expect(
            updater({ uid: 't-1', name: 'Alpha', code: 'A', description: 'd', members: [{}] }),
        ).toEqual({ uid: 't-1', name: 'Alpha', code: 'A', description: 'd', members: [] })
        expect(updater(undefined)).toEqual({ uid: 't-1', members: [] })

        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['team', { uid: 't-1' }] })
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['teams'] })
    })

    it('skips setQueryData but still invalidates on an empty (204) response', () => {
        mockQueryMutate.mockReturnValue(jest.fn())
        const setQueryData = jest.fn()
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ setQueryData, invalidateQueries })

        renderHook(() => useTeamMembers('t-1'))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({ data: undefined })

        expect(setQueryData).not.toHaveBeenCalled()
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['team', { uid: 't-1' }] })
    })
})

describe('useRemoveTeamMember', () => {
    it('DELETEs the single member with itemUid and merges the response', () => {
        const inner = jest.fn().mockResolvedValue({ data: { uid: 't-1', members: [] } })
        mockQueryMutate.mockReturnValue(inner)
        const setQueryData = jest.fn()
        const invalidateQueries = jest.fn().mockResolvedValue(undefined)
        mockUseQueryClient.mockReturnValue({ setQueryData, invalidateQueries })

        renderHook(() => useRemoveTeamMember('t-1'))
        const opts = mockUseMutation.mock.calls[0][0]

        opts.mutationFn('u-9')
        expect(mockQueryMutate).toHaveBeenCalledWith('teamMember', 'delete', {
            uid: 't-1',
            endpointVariables: { itemUid: 'u-9' },
        })
        expect(inner).toHaveBeenCalledWith(undefined)

        opts.onSuccess({ data: { uid: 't-1', members: [] } })
        expect(setQueryData).toHaveBeenCalledWith(['team', { uid: 't-1' }], expect.any(Function))
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
