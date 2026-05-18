import { useMutation, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import useQueryManager from '@/hooks/useQueryManager'

import { useSystemsReload } from '../useSystemsReload'

jest.mock('@tanstack/react-query', () => ({
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/hooks/useQueryManager', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/utils/fetcher', () => ({
    queryMutate: jest.fn(() => 'mutate-fn'),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockUseQueryManager = useQueryManager as unknown as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryManager.mockReturnValue({ query: { p: 1 } })
    mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: false })
    mockUseQueryClient.mockReturnValue({
        getQueryData: jest.fn(),
        setQueryData: jest.fn(),
        invalidateQueries: jest.fn(),
    })
})

describe('useSystemsReload', () => {
    it('returns tuple [reload, isPending]', () => {
        mockUseMutation.mockReturnValue({ mutate: jest.fn(), isPending: true })
        const { result } = renderHook(() => useSystemsReload({}))
        expect(typeof result.current[0]).toBe('function')
        expect(result.current[1]).toBe(true)
    })

    it('defaults tableId="systems" and enableQueryURL=true', () => {
        renderHook(() => useSystemsReload({}))
        expect(mockUseQueryManager).toHaveBeenCalledWith('systems', undefined, true)
    })

    it('reload(): mutates with pruned cache data when present', () => {
        const mutate = jest.fn()
        const getQueryData = jest.fn(() => ({
            data: [{ uid: 'a' }, { uid: 'b', subSystems: [{ uid: 'b1' }] }],
        }))
        mockUseMutation.mockReturnValue({ mutate, isPending: false })
        mockUseQueryClient.mockReturnValue({
            getQueryData,
            setQueryData: jest.fn(),
            invalidateQueries: jest.fn(),
        })

        const { result } = renderHook(() => useSystemsReload({}))
        result.current[0]()
        expect(mutate).toHaveBeenCalledWith([
            { uid: 'a', children: undefined },
            { uid: 'b', children: [{ uid: 'b1', children: undefined }] },
        ])
    })

    it('reload() invalidates + onSuccess when no cache data', () => {
        const invalidateQueries = jest.fn()
        const onSuccess = jest.fn()
        mockUseQueryClient.mockReturnValue({
            getQueryData: () => undefined,
            setQueryData: jest.fn(),
            invalidateQueries,
        })

        const { result } = renderHook(() => useSystemsReload({ onSuccess }))
        result.current[0]()
        expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ['systems'] })
        expect(onSuccess).toHaveBeenCalled()
    })

    it('mutation onSuccess replaces cache data + calls onSuccess', () => {
        const onSuccess = jest.fn()
        const setQueryData = jest.fn()
        mockUseQueryClient.mockReturnValue({
            getQueryData: jest.fn(),
            setQueryData,
            invalidateQueries: jest.fn(),
        })
        renderHook(() => useSystemsReload({ onSuccess }))

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess({ data: [{ uid: 'x' }] })
        expect(setQueryData).toHaveBeenCalled()
        expect(onSuccess).toHaveBeenCalled()
    })

    it('mutation onError fires toast.error', () => {
        renderHook(() => useSystemsReload({}))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError({ message: 'boom' })
        expect(mockToast.error).toHaveBeenCalledWith('Something went wrong: boom')
    })
})
