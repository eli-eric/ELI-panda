import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useSystemParent } from '../useSystemParent'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('@/hooks/fetch/useEndpoint', () => ({
    useEndpoint: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock
const mockUseEndpoint = useEndpoint as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ query: { parentUid: 'p-1' } })
    mockUseEndpoint.mockReturnValue({ system: '/system/p-1' })
    mockUseGraphQL.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
        refetch: jest.fn(),
    })
})

describe('useSystemParent', () => {
    it('passes router parentUid into where + enabled gating', () => {
        renderHook(() => useSystemParent())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where.uid).toBe('p-1')
        expect(opts.enabled).toBe(true)

        mockUseRouter.mockReturnValue({ query: {} })
        renderHook(() => useSystemParent())
        expect(mockUseGraphQL.mock.calls[1][1].enabled).toBe(false)
    })

    it('parentPath returns [] when data missing', () => {
        const { result } = renderHook(() => useSystemParent())
        expect(result.current.parentPath).toEqual([])
    })

    it('parentPath builds ancestors + current system entry', () => {
        mockUseGraphQL.mockReturnValue({
            data: {
                systems: [
                    {
                        uid: 'self',
                        name: 'Self',
                        parentPath: [
                            { uid: 'r1', name: 'Root', systemLevel: 'SYSTEM_DOMAIN' },
                            { uid: 'm1', name: 'Mid', systemLevel: 'KEY_SYSTEMS' },
                        ],
                    },
                ],
            },
            error: undefined,
            isLoading: false,
            refetch: jest.fn(),
        })
        const { result } = renderHook(() => useSystemParent())
        expect(result.current.parentPath).toEqual([
            { uid: 'r1', name: 'Root', systemLevel: 'SYSTEM_DOMAIN' },
            { uid: 'm1', name: 'Mid', systemLevel: 'KEY_SYSTEMS' },
            { uid: 'self', name: 'Self' },
        ])
        expect(result.current.parentSystem).toMatchObject({ uid: 'self' })
    })

    it('aliases loading + refetch + systemEndpoint', () => {
        const refetch = jest.fn()
        mockUseEndpoint.mockReturnValue({ system: '/system/p-1' })
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
            refetch,
        })
        const { result } = renderHook(() => useSystemParent())
        expect(result.current.loading).toBe(true)
        expect(result.current.refetch).toBe(refetch)
        expect(result.current.systemEndpoint).toBe('/system/p-1')
    })
})
