import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import { useLinkCreate, useLinkDelete, useLinks, useLinkUpdate } from '../useLinks'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
    keepPreviousData: 'keepPreviousData',
}))

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ isError: false })
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQueryClient.mockReturnValue({ setQueryData: jest.fn() })
})

describe('useLinks', () => {
    it('builds queryKey ["links", uid]', () => {
        renderHook(() => useLinks({ uid: 'p-1' }))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['links', 'p-1'])
    })

    it('fires toast.error when isError flips', () => {
        mockUseQuery.mockReturnValue({ isError: true, error: { message: 'oops' } })
        renderHook(() => useLinks({ uid: 'p' }))
        expect(mockToast.error).toHaveBeenCalledWith(expect.stringContaining('oops'))
    })
})

describe('useLinkCreate', () => {
    it('onSuccess appends to cached list', () => {
        const setQueryData = jest.fn()
        mockUseQueryClient.mockReturnValue({ setQueryData })
        renderHook(() => useLinkCreate({ parentUid: 'p-1' }))

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({ uid: 'new', url: 'x' })
        const updater = setQueryData.mock.calls[0][1]
        expect(updater([{ uid: 'old' }])).toEqual([{ uid: 'old' }, { uid: 'new', url: 'x' }])
        expect(updater(undefined)).toEqual([{ uid: 'new', url: 'x' }])
    })
})

describe('useLinkUpdate', () => {
    it('onSuccess maps and replaces matching uid in cache', () => {
        const setQueryData = jest.fn()
        mockUseQueryClient.mockReturnValue({ setQueryData })
        renderHook(() => useLinkUpdate({ parentUid: 'p-1' }))

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({ uid: 'a', url: 'new' })
        const updater = setQueryData.mock.calls[0][1]
        expect(updater([{ uid: 'a', url: 'old' }, { uid: 'b' }])).toEqual([
            { uid: 'a', url: 'new' },
            { uid: 'b' },
        ])
        expect(updater(undefined)).toEqual([])
    })
})

describe('useLinkDelete', () => {
    it('onSuccess filters out the matching uid', () => {
        const setQueryData = jest.fn()
        mockUseQueryClient.mockReturnValue({ setQueryData })
        renderHook(() => useLinkDelete({ parentUid: 'p-1', uid: 'a' }))

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        const updater = setQueryData.mock.calls[0][1]
        expect(updater([{ uid: 'a' }, { uid: 'b' }])).toEqual([{ uid: 'b' }])
        expect(updater(undefined)).toEqual([])
    })
})
