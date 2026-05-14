import { renderHook } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useRoles } from '../useRoles'

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
})

describe('useRoles', () => {
    it('returns role list from query', () => {
        mockUseGraphQL.mockReturnValue({
            data: { roles: [{ uid: 'r', name: 'Admin', code: 'ADMIN' }] },
            error: undefined,
        })
        const { result } = renderHook(() => useRoles())
        expect(result.current).toEqual([{ uid: 'r', name: 'Admin', code: 'ADMIN' }])
    })

    it('returns empty array when data is undefined', () => {
        mockUseGraphQL.mockReturnValue({ data: undefined, error: undefined })
        const { result } = renderHook(() => useRoles())
        expect(result.current).toEqual([])
    })

    it('fires toast.error when query errors', () => {
        mockUseGraphQL.mockReturnValue({ data: undefined, error: new Error('boom') })
        renderHook(() => useRoles())
        expect(mockToast.error).toHaveBeenCalledWith('Failed to fetch roles')
    })

    it('skips toast.error when no error', () => {
        mockUseGraphQL.mockReturnValue({ data: { roles: [] }, error: undefined })
        renderHook(() => useRoles())
        expect(mockToast.error).not.toHaveBeenCalled()
    })
})
