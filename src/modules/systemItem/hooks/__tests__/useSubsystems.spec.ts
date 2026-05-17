import { renderHook } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useSystemSubsystems } from '../useSubsystems'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({
    toast: { error: jest.fn() },
}))

import { toast } from 'sonner'

const mockUseRouter = useRouter as jest.Mock
const mockUseGraphQL = useGraphQL as jest.Mock
const mockToast = toast as unknown as { error: jest.Mock }

beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({ query: { uid: 'sys-1' } })
    mockUseGraphQL.mockReturnValue({
        data: undefined,
        error: undefined,
        isLoading: false,
        status: 'success',
    })
})

describe('useSystemSubsystems', () => {
    it('builds where with deleted:false + parentSystem.uid from router', () => {
        renderHook(() => useSystemSubsystems())
        const opts = mockUseGraphQL.mock.calls[0][1]
        expect(opts.variables.where).toEqual({
            deleted: false,
            parentSystem: { uid: 'sys-1' },
        })
        expect(opts.refetchOnMount).toBe('always')
        expect(opts.refetchOnReconnect).toBe('always')
    })

    it('returns systems data, loading, error', () => {
        mockUseGraphQL.mockReturnValue({
            data: { systems: [{ uid: 's', name: 'S' }] },
            error: undefined,
            isLoading: true,
            status: 'pending',
        })
        const { result } = renderHook(() => useSystemSubsystems())
        expect(result.current.subsystems).toEqual([{ uid: 's', name: 'S' }])
        expect(result.current.loading).toBe(true)
    })

    it('fires toast.error when error is set', () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            error: new Error('boom'),
            isLoading: false,
            status: 'error',
        })
        renderHook(() => useSystemSubsystems())
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch system detail')
    })
})
