import { renderHook } from '@testing-library/react'

import { useGraphQLMutation } from '@/hooks/fetch/useGraphQL'

import { makeRoomCardsCreateData, useRoomCardCreate } from '../useRoomCardCreate'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQLMutation: jest.fn(),
}))

const mockUseGraphQLMutation = useGraphQLMutation as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('makeRoomCardsCreateData', () => {
    it('wraps form data into input[] with name and undefined cleaning date', () => {
        const result = makeRoomCardsCreateData({
            name: 'L1',
            status: 'CLEAN_MODE',
            purityClass: 'CLASS_100',
        } as any)
        expect(result.input).toHaveLength(1)
        expect(result.input[0].name).toBe('L1')
        expect(result.input[0].cleaningScheduleDate).toBeUndefined()
    })

    it('defaults missing name to ""', () => {
        const result = makeRoomCardsCreateData({ status: 'CLEAN_MODE' } as any)
        expect(result.input[0].name).toBe('')
    })

    it('preserves cleaningScheduleDate when present', () => {
        const result = makeRoomCardsCreateData({
            name: 'X',
            cleaningScheduleDate: '2026-01-01',
        } as any)
        expect(result.input[0].cleaningScheduleDate).toBe('2026-01-01')
    })

    it('converts operationalState into GraphQL connect payload', () => {
        const result = makeRoomCardsCreateData({
            name: 'X',
            operationalState: { uid: 'op-1', name: 'On' },
        } as any)
        expect(result.input[0].operationalState).toEqual({
            connect: { where: { node: { uid: 'op-1' } } },
        })
    })

    it('omits operationalState when uid missing/null', () => {
        const noState = makeRoomCardsCreateData({ name: 'X' } as any)
        expect(noState.input[0].operationalState).toBeUndefined()

        const nullState = makeRoomCardsCreateData({
            name: 'X',
            operationalState: null,
        } as any)
        expect(nullState.input[0].operationalState).toBeUndefined()
    })
})

describe('useRoomCardCreate', () => {
    it('returns createRoomCard wrapped from mutateAsync', () => {
        const mutateAsync = jest.fn().mockResolvedValue('ok')
        mockUseGraphQLMutation.mockReturnValue({ mutateAsync })
        const { result } = renderHook(() => useRoomCardCreate())
        expect(result.current.createRoomCard).toBe(mutateAsync)
    })
})
