import { useQuery } from '@tanstack/react-query'
import { renderHook } from '@testing-library/react'

import axiosInstance from '@/core/axios/axiosInstance'

import { useItemProperties } from '../useItemProperties'

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}))

jest.mock('@/core/axios/axiosInstance', () => ({
    __esModule: true,
    default: { get: jest.fn() },
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQuery = useQuery as jest.Mock
const mockAxios = axiosInstance as unknown as { get: jest.Mock }
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQuery.mockReturnValue({ isError: false })
})

describe('useItemProperties', () => {
    it('configures queryKey + enabled + retry:false', () => {
        renderHook(() => useItemProperties('pi-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        expect(opts.queryKey).toEqual(['physical-item', 'pi-1', 'properties'])
        expect(opts.enabled).toBe(true)
        expect(opts.retry).toBe(false)
    })

    it('disabled when uid missing', () => {
        renderHook(() => useItemProperties())
        expect(mockUseQuery.mock.calls[0][0].enabled).toBe(false)
    })

    it('queryFn calls axios with /physical-item/{uid}/properties', async () => {
        mockAxios.get.mockResolvedValueOnce({ data: [{ uid: 'p' }] })
        renderHook(() => useItemProperties('uid-1'))
        const opts = mockUseQuery.mock.calls[0][0]
        const result = await opts.queryFn()
        expect(mockAxios.get).toHaveBeenCalledWith(expect.stringContaining('/physical-item/uid-1/properties'))
        expect(result).toEqual([{ uid: 'p' }])
    })

    it('fires toast.error when isError', () => {
        mockUseQuery.mockReturnValue({ isError: true })
        renderHook(() => useItemProperties('uid'))
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch item properties')
    })
})
