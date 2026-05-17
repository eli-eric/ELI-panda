import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useSystemCreateParentStore } from '../../store/useSystemCreateParentStore'
import { useSystemCreateParent } from '../useSystemCreateParent'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

const mockUseGraphQL = useGraphQL as jest.Mock

const resetStore = () => useSystemCreateParentStore.setState({ parentUid: null })

beforeEach(() => {
    jest.clearAllMocks()
    resetStore()
    mockUseGraphQL.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
        refetch: jest.fn(),
    })
})

describe('useSystemCreateParent', () => {
    it('prefers store parentUid over arg', () => {
        useSystemCreateParentStore.setState({ parentUid: 'from-store' })
        renderHook(() => useSystemCreateParent('from-arg'))
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.uid).toBe('from-store')
        expect(opts.enabled).toBe(true)
    })

    it('falls back to arg uid when store is empty', () => {
        renderHook(() => useSystemCreateParent('from-arg'))
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.uid).toBe('from-arg')
    })

    it('disables query when both are empty', () => {
        renderHook(() => useSystemCreateParent())
        expect(mockUseGraphQL.mock.calls[0][1].enabled).toBe(false)
    })

    it('builds parentPath: filtered ancestors + current system as last entry', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                systems: [
                    {
                        uid: 'self',
                        name: 'Self',
                        systemLevel: 'TECHNOLOGY_UNIT',
                        parentPath: [
                            { uid: 'r1', name: 'Root', systemLevel: 'SYSTEM_DOMAIN' },
                            null,
                            {},
                            { uid: 'm1', name: 'Mid', systemLevel: 'KEY_SYSTEMS' },
                        ],
                    },
                ],
            },
            error: undefined,
            isLoading: false,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemCreateParent('self'))
        expect(result.current.parentPath).toEqual([
            { uid: 'r1', name: 'Root', systemLevel: 'SYSTEM_DOMAIN' },
            { uid: 'm1', name: 'Mid', systemLevel: 'KEY_SYSTEMS' },
            { uid: 'self', name: 'Self', systemLevel: 'TECHNOLOGY_UNIT' },
        ])
    })

    it('returns only the current system entry when parentPath is empty/missing', () => {
        mockUseGraphQL.mockReturnValue({
            data: { systems: [{ uid: 'only', name: 'Only', systemLevel: 'X' }] },
            error: undefined,
            isLoading: false,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemCreateParent('only'))
        expect(result.current.parentPath).toEqual([
            { uid: 'only', name: 'Only', systemLevel: 'X' },
        ])
    })

    it('aliases parentSystem, loading, refetch', () => {
        const refetch = jest.fn()
        mockUseGraphQL.mockReturnValue({
            data: { systems: [{ uid: 'p', name: 'P' }] },
            error: undefined,
            isLoading: true,
            refetch,
        })
        const { result } = renderHook(() => useSystemCreateParent('p'))
        expect(result.current.parentSystem).toEqual({ uid: 'p', name: 'P' })
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
    })
})
