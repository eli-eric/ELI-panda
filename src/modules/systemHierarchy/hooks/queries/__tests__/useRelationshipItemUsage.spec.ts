import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useRelationshipItemUsage } from '../useRelationshipItemUsage'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useRelationshipItemUsage', () => {
    it('disabled when uids empty', () => {
        mockUseGraphQL.mockReturnValue({ data: undefined, isLoading: false })
        renderHook(() => useRelationshipItemUsage([]))
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    it('passes uids as uid_IN var with deleted:false', () => {
        mockUseGraphQL.mockReturnValue({ data: undefined, isLoading: false })
        renderHook(() => useRelationshipItemUsage(['a', 'b']))
        expect(mockUseGraphQL.mock.calls[0][1].variables).toEqual({
            where: { uid_IN: ['a', 'b'], deleted: false },
        })
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(true)
    })

    it('builds map { uid -> itemUsage.uid } from response', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                systems: [
                    { uid: 's1', physicalItem: { itemUsage: { uid: 'u-1' } } },
                    { uid: 's2', physicalItem: { itemUsage: { uid: 'u-2' } } },
                    { uid: 's3', physicalItem: null },
                    { uid: 's4', physicalItem: { itemUsage: null } },
                ],
            },
            isLoading: false,
        })
        const { result } = renderHook(() => useRelationshipItemUsage(['s1', 's2', 's3', 's4']))
        expect(result.current.itemUsageMap).toEqual({
            s1: 'u-1',
            s2: 'u-2',
            s3: undefined,
            s4: undefined,
        })
    })

    it('empty map when data undefined', () => {
        mockUseGraphQL.mockReturnValue({ data: undefined, isLoading: false })
        const { result } = renderHook(() => useRelationshipItemUsage(['s1']))
        expect(result.current.itemUsageMap).toEqual({})
    })
})
