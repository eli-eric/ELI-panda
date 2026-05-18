import { renderHook } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import useCatalogueFormFields from '../CatalogueForm.fields'

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUsePermission = usePermission as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useCatalogueFormFields', () => {
    it('returns 7 field keys', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCatalogueFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect(Object.keys(result.current).sort()).toEqual(
            [
                'name',
                'catalogueNumber',
                'category',
                'supplier',
                'manufacturerUrl',
                'description',
                'itemUID',
            ].sort(),
        )
    })

    it('all fields disabled when no CATALOGUE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        const { result } = renderHook(() => useCatalogueFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        Object.values(result.current).forEach(f => {
            expect((f as any).disabled).toBe(true)
        })
    })

    it('all fields enabled with CATALOGUE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCatalogueFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        Object.values(result.current).forEach(f => {
            expect((f as any).disabled).toBe(false)
        })
    })

    it('codebook fields carry expected codebook refs', () => {
        mockUsePermission.mockReturnValue(true)
        const { result } = renderHook(() => useCatalogueFormFields(), {
            wrapper: AllProvidersWrapper,
        })
        expect((result.current.category as any).codebook).toBeDefined()
        expect((result.current.supplier as any).codebook).toBeDefined()
    })
})
