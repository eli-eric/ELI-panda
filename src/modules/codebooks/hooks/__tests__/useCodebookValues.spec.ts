import { renderHook } from '@testing-library/react'

import { useCodebook } from '@/hooks/fetch/useCodebook'
import { QueryClientWrapper } from '@/testutils/wrappers/QueryClientWrapper'

import { useCodebookValues } from '../useCodebookValues'

jest.mock('@/hooks/fetch/useCodebook', () => ({
    useCodebook: jest.fn(),
}))

const mockUseCodebook = useCodebook as jest.Mock

describe('useCodebookValues', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseCodebook.mockReturnValue({ data: undefined, isLoading: false, queryKey: [] })
    })

    it('delegates to useCodebook with limit=5000', () => {
        renderHook(() => useCodebookValues('FOO' as any), { wrapper: QueryClientWrapper })
        expect(mockUseCodebook).toHaveBeenCalledWith('FOO', { limit: 5000 })
    })

    it('passes null codebook type through to useCodebook (cast to CODEBOOK)', () => {
        renderHook(() => useCodebookValues(null), { wrapper: QueryClientWrapper })
        expect(mockUseCodebook).toHaveBeenCalledWith(null, { limit: 5000 })
    })

    it('returns whatever useCodebook returns', () => {
        const inner = { data: { items: [{ uid: 'x' }] }, isLoading: true, queryKey: ['codebook'] }
        mockUseCodebook.mockReturnValue(inner)
        const { result } = renderHook(() => useCodebookValues('BAR' as any), {
            wrapper: QueryClientWrapper,
        })
        expect(result.current).toBe(inner)
    })
})
