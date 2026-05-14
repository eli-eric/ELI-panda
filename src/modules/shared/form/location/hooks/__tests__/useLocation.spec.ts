import { renderHook } from '@testing-library/react'
import { useSession } from 'next-auth/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import useTableStateStore from '@/store/useTableStateStore'

import { useLocation, useSubLocations } from '../useLocation'

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('@/store/useTableStateStore', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUseSession = useSession as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock
const mockUseTableStateStore = useTableStateStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseSession.mockReturnValue({ data: { user: { facilityCode: 'FAC1' } } })
    mockUseGraphQL.mockReturnValue({ data: undefined, isLoading: false, error: undefined })
    mockUseTableStateStore.mockReturnValue({ instances: {} })
})

describe('useLocation', () => {
    it('queries root locations (parentLocationAggregate count=0) when no column filter', () => {
        renderHook(() => useLocation())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.parentLocationAggregate).toEqual({ count: 0 })
        expect(opts.variables.where.facility.code).toBe('FAC1')
    })

    it('uses CONTAINS filters when columnFilter is set', () => {
        mockUseTableStateStore.mockReturnValue({
            instances: {
                'location-tree': {
                    columnFilter: [
                        { id: 'name', value: 'foo' },
                        { id: 'code', value: 'C01' },
                    ],
                },
            },
        })
        renderHook(() => useLocation())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.name_CONTAINS).toBe('foo')
        expect(opts.variables.where.code_CONTAINS).toBe('C01')
    })

    it('disables query without facilityCode', () => {
        mockUseSession.mockReturnValue({ data: undefined })
        renderHook(() => useLocation())
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    it('sorts locations by code', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                locations: [
                    { uid: 'a', code: 'C', name: 'C' },
                    { uid: 'b', code: 'A', name: 'A' },
                    { uid: 'c', code: 'B', name: 'B' },
                ],
            },
            isLoading: false,
            error: undefined,
        })
        const { result } = renderHook(() => useLocation())
        expect(result.current.locations?.map(l => l.code)).toEqual(['A', 'B', 'C'])
    })

    it('handles undefined code gracefully', () => {
        mockUseGraphQL.mockReturnValue({
            data: { locations: [{ uid: 'a' }, { uid: 'b', code: 'B' }] },
            isLoading: false,
            error: undefined,
        })
        const { result } = renderHook(() => useLocation())
        expect(result.current.locations).toHaveLength(2)
    })
})

describe('useSubLocations', () => {
    it('disables query without uid', () => {
        renderHook(() => useSubLocations())
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    it('passes uid into where', () => {
        renderHook(() => useSubLocations('loc-1'))
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.uid).toBe('loc-1')
        expect(opts.enabled).toBe(true)
    })

    it('sorts subLocations by code', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                locations: [
                    {
                        subLocations: [
                            { uid: 'a', code: 'B' },
                            { uid: 'b', code: 'A' },
                        ],
                    },
                ],
            },
            isLoading: false,
            error: undefined,
        })
        const { result } = renderHook(() => useSubLocations('loc'))
        expect(result.current.subLocations?.map(s => s.code)).toEqual(['A', 'B'])
    })
})
