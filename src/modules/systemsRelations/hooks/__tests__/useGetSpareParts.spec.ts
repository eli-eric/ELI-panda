import { renderHook, waitFor } from '@testing-library/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'

import { useGetSpareParts, useGetSparePartsFor } from '../useGetSpareParts'

jest.mock('@/hooks/fetch/useGraphQL', () => ({
    useGraphQL: jest.fn(),
}))

jest.mock('sonner', () => ({ toast: { error: jest.fn() } }))
const sonner = jest.requireMock('sonner')

const mockUseGraphQL = useGraphQL as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useGetSpareParts', () => {
    it('passes uid into variables.where', () => {
        mockUseGraphQL.mockReturnValue({
            data: { systems: [{ spareParts: [] }] },
            isLoading: false,
            error: undefined,
        })
        renderHook(() => useGetSpareParts('sys-1'))
        expect(mockUseGraphQL).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                variables: { where: { uid: 'sys-1' } },
            }),
        )
    })

    it('returns first system spareParts list', () => {
        const sps = [{ name: 'A' }]
        mockUseGraphQL.mockReturnValue({
            data: { systems: [{ spareParts: sps }] },
            isLoading: false,
            error: undefined,
        })
        const { result } = renderHook(() => useGetSpareParts('s'))
        expect(result.current.spareParts).toBe(sps)
        expect(result.current.loading).toBe(false)
    })

    it('toasts error when error returned', async () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            isLoading: false,
            error: new Error('boom'),
        })
        renderHook(() => useGetSpareParts('s'))
        await waitFor(() =>
            expect(sonner.toast.error).toHaveBeenCalledWith('Failed to fetch spare parts'),
        )
    })
})

describe('useGetSparePartsFor', () => {
    it('returns first system sparePartsFor list', () => {
        const list = [{ name: 'B' }]
        mockUseGraphQL.mockReturnValue({
            data: { systems: [{ sparePartsFor: list }] },
            isLoading: true,
            error: undefined,
        })
        const { result } = renderHook(() => useGetSparePartsFor('s'))
        expect(result.current.spareParts).toBe(list)
        expect(result.current.loading).toBe(true)
    })

    it('toasts on error', async () => {
        mockUseGraphQL.mockReturnValue({
            data: undefined,
            isLoading: false,
            error: new Error('x'),
        })
        renderHook(() => useGetSparePartsFor('s'))
        await waitFor(() =>
            expect(sonner.toast.error).toHaveBeenCalledWith('Failed to fetch spare parts'),
        )
    })
})
