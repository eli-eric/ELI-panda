import { renderHook } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useItemCreateFormFields } from '../item-create.fields'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUsePermission = usePermission as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useItemCreateFormFields', () => {
    it('returns name, catalogueNumber, category fields', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useItemCreateFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect(Object.keys(result.current).sort()).toEqual(
            ['name', 'catalogueNumber', 'category'].sort(),
        )
    })

    it('category disabled when no CATALOGUE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useItemCreateFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect((result.current.category as any).disabled).toBe(true)
    })

    it('category enabled with CATALOGUE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useItemCreateFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect((result.current.category as any).disabled).toBe(false)
    })
})
