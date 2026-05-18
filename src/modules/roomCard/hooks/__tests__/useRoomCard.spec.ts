import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useRoomCard } from '../useRoomCard'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseGraphQL = useGraphQL as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseGraphQL.mockReturnValue({
        data: { roomCards: [] },
        error: undefined,
        isLoading: false,
        refetch: jest.fn(),
    })
})

describe('useRoomCard', () => {
    it('passes roomCardUid as where.uid variable', () => {
        renderHook(() => useRoomCard('uid-1'))
        const options = mockUseGraphQL.mock.calls[0][1]
        expect(options.variables.where.uid).toBe('uid-1')
    })

    it('returns the first roomCard from the array', () => {
        mockUseGraphQL.mockReturnValue({
            data: { roomCards: [{ name: 'R1' }, { name: 'R2' }] },
            error: undefined,
            isLoading: false,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useRoomCard('uid'))
        expect(result.current.roomCard).toEqual({ name: 'R1' })
    })

    it('exposes loading + refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
            refetch,
        })
        const { result } = renderHook(() => useRoomCard('uid'))
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
    })

    it('fires toast.error when error is set', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            error: new Error('boom'),
            isLoading: false,
            refetch: jest.fn(),
        })
        renderHook(() => useRoomCard('uid'))
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch room card')
    })

    it('does not toast when no error', () => {
        renderHook(() => useRoomCard('uid'))
        expect(mockToast.error).not.toHaveBeenCalled()
    })
})
