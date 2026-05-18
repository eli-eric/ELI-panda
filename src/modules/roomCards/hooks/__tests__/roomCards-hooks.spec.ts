import { renderHook } from '@testing-library/react'
import { useQueryState } from 'next-usequerystate'

import { useGraphQL, useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { useRoomCardDelete } from '../useRoomCardDelete'
import { useRoomCards } from '../useRoomCards'

jest.mock('next-usequerystate', () => ({
    useQueryState: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
    useGraphQLMutation: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn(), success: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseQueryState = useQueryState as unknown as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock
const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock; success: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseQueryState.mockReturnValue(['', jest.fn()])
    mockUseGraphQL.mockReturnValue({
        data: undefined,
        isFetching: false,
        error: undefined,
        refetch: jest.fn(),
    })
    mockUseGraphQLMutation.mockReturnValue({ mutate: jest.fn() })
})

describe('useRoomCards', () => {
    it('threads search into name_CONTAINS where', () => {
        mockUseQueryState.mockReturnValue(['cleanroom', jest.fn()])
        renderHook(() => useRoomCards())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.name_CONTAINS).toBe('cleanroom')
    })

    it('defaults search to empty string', () => {
        renderHook(() => useRoomCards())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.name_CONTAINS).toBe('')
    })

    it('aliases roomCards/loading/refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: { roomCards: [{ uid: 'r' }] },
            isFetching: true,
            error: undefined,
            refetch,
        })
        const { result } = renderHook(() => useRoomCards())
        expect(result.current.roomCards).toEqual([{ uid: 'r' }])
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
    })

    it('fires toast.error on error', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            isFetching: false,
            error: new Error('boom'),
            refetch: jest.fn(),
        })
        renderHook(() => useRoomCards())
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch room cards')
    })
})

describe('useRoomCardDelete', () => {
    it('mutate uses uid for both where clauses', () => {
        const mutate = jest.fn()
        mockUseGraphQLMutation.mockReturnValue({ mutate })
        const { result } = renderHook(() => useRoomCardDelete('rc-1', 'Lab 1'))
        result.current.deleteRoomCard()
        expect(mutate).toHaveBeenCalledWith({
            where: { uid: 'rc-1' },
            deleteHallContactPeopleWhere: { roomCard: { uid: 'rc-1' } },
        })
    })

    it('onSuccess refetches + success toast with name', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            isFetching: false,
            error: undefined,
            refetch,
        })
        renderHook(() => useRoomCardDelete('rc-1', 'Lab 1'))
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onSuccess()
        expect(refetch).toHaveBeenCalled()
        expect(mockToast.success).toHaveBeenCalledWith('Room card Lab 1 was deleted')
    })

    it('onError fires error toast with name', () => {
        renderHook(() => useRoomCardDelete('rc-1', 'Lab 1'))
        const opts = mockUseGraphQLMutation.mock.calls[0][1]
        opts.onError()
        expect(mockToast.error).toHaveBeenCalledWith(
            'Something went wrong with delete Lab 1 room card!',
        )
    })
})
