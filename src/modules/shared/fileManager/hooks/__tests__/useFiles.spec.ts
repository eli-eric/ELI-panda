import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import axiosInstance from '@/core/axios/axiosInstance'

import type { FILE_TYPE } from '../../types'
import { useFileDelete, useFiles } from '../useFiles'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
    useQueryClient: jest.fn(),
}))

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: { get: jest.fn(), delete: jest.fn(), post: jest.fn(), put: jest.fn() },
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

const mockUseQuery = useQuery as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseQueryClient = useQueryClient as jest.Mock
const mockAxios = axiosInstance as unknown as {
    get: jest.Mock
    delete: jest.Mock
}

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({})
    mockUseMutation.mockReturnValue({ mutate: jest.fn() })
    mockUseQueryClient.mockReturnValue({ setQueryData: jest.fn() })
})

const ITEM_TYPE = 'systems' as FILE_TYPE

describe('useFiles', () => {
    it('configures queryKey + enabled gating on uid', () => {
        renderHook(() => useFiles({ itemType: ITEM_TYPE, uid: 'u-1' }))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['files', ITEM_TYPE, 'u-1'])
        expect(opts.enabled).toBe(true)

        renderHook(() => useFiles({ itemType: ITEM_TYPE }))
        expect(mockUseQuery.mock.calls[1][0].enabled).toBe(false)
    })

    it('queryFn hits axios get with the items path', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: [{ id: 'f1' }] })
        renderHook(() => useFiles({ itemType: ITEM_TYPE, uid: 'u-1' }))
        const opts = mockUseQuery.mock.calls[0][0]
        const result = await opts.queryFn()
        expect(mockAxios.get).toHaveBeenCalledWith(`/api/${ITEM_TYPE}/u-1/files`)
        expect(result).toEqual([{ id: 'f1' }])
    })
})

describe('useFileDelete', () => {
    it('onSuccess removes the file from cached list', () => {
        const setQueryData = jest.fn()
        mockUseQueryClient.mockReturnValue({ setQueryData })
        renderHook(() => useFileDelete({ itemType: ITEM_TYPE, uid: 'u', id: 'f1' }))

        const opts = mockUseMutation.mock.calls[0][0]
        opts.onSuccess()
        const updater = setQueryData.mock.calls[0][1]
        expect(updater([{ id: 'f1' }, { id: 'f2' }])).toEqual([{ id: 'f2' }])
        expect(updater(undefined)).toEqual([])
    })

    it('onError fires toast.error', () => {
        renderHook(() => useFileDelete({ itemType: ITEM_TYPE, uid: 'u', id: 'f1' }))
        const opts = mockUseMutation.mock.calls[0][0]
        opts.onError('nope')
        // toast.error is invoked - just verify shape via mock
        const { toast } = require('sonner')
        expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('nope'))
    })

    it('mutationFn calls axios delete on the correct endpoint', async () => {
        mockAxios.delete.mockResolvedValueOnce({ data: 'ok' })
        renderHook(() => useFileDelete({ itemType: ITEM_TYPE, uid: 'u', id: 'f1' }))
        const opts = mockUseMutation.mock.calls[0][0]
        const result = await opts.mutationFn()
        expect(mockAxios.delete).toHaveBeenCalledWith(`/api/${ITEM_TYPE}/u/files/f1`)
        expect(result).toBe('ok')
    })
})
