import { renderHook } from '@testing-library/react'

import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useCatalogueItemsColumns } from '../CatalogueItems.columns'

jest.mock('@/modules/catalogue/hooks/useCategoryUid', () => ({
    useCategoryUid: jest.fn(),
}))

jest.mock('@/modules/systems/hooks/useCategoryProperties', () => ({
    useCategoryProperties: jest.fn(),
}))

const mockUseCategoryUid = useCategoryUid as jest.Mock
const mockUseCategoryProperties = useCategoryProperties as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mockUseCategoryUid.mockReturnValue(undefined)
    mockUseCategoryProperties.mockReturnValue({ catalogueCategoryProperties: undefined })
})

describe('useCatalogueItemsColumns', () => {
    it('returns the base 7 + 2 update columns without category props', () => {
        const { result } = renderHook(() => useCatalogueItemsColumns({ tableId: 't' }), {
            wrapper: AllProvidersWrapper,
        })
        expect(result.current.map(c => c.id)).toEqual([
            'miniImageUrl',
            'name',
            'description',
            'partNumber',
            'categoryName',
            'supplier',
            'manufacturerUrl',
            'lastUpdateTime',
            'lastUpdateBy',
        ])
    })

    it('miniImageUrl is sticky + non-filterable', () => {
        const { result } = renderHook(() => useCatalogueItemsColumns({ tableId: 't' }), {
            wrapper: AllProvidersWrapper,
        })
        const img = result.current[0] as any
        expect(img.meta?.sticky).toBe(true)
        expect(img.enableColumnFilter).toBe(false)
    })

    it('name column meta.sticky=true unless hideButtons', () => {
        const { result } = renderHook(
            () => useCatalogueItemsColumns({ tableId: 't', hideButtons: false }),
            { wrapper: AllProvidersWrapper },
        )
        const name = result.current[1] as any
        expect(name.meta?.sticky).toBe(true)

        const { result: result2 } = renderHook(
            () => useCatalogueItemsColumns({ tableId: 't', hideButtons: true }),
            { wrapper: AllProvidersWrapper },
        )
        expect((result2.current[1] as any).meta?.sticky).toBe(false)
    })

    it('inserts detail columns before categoryName when category properties present', () => {
        mockUseCategoryProperties.mockReturnValue({
            catalogueCategoryProperties: [
                { property: { uid: 'd1', name: 'D1', type: { uid: 't' } } },
            ],
        })
        const { result } = renderHook(
            () =>
                useCatalogueItemsColumns({
                    tableId: 't',
                    catalogueItems: {
                        data: [{ details: [{ property: { uid: 'p1' }, value: 1 }] }],
                    } as any,
                }),
            { wrapper: AllProvidersWrapper },
        )
        const ids = result.current.map(c => c.id)
        expect(ids).toEqual([
            'miniImageUrl',
            'name',
            'description',
            'partNumber',
            'd1',
            'categoryName',
            'supplier',
            'manufacturerUrl',
            'lastUpdateTime',
            'lastUpdateBy',
        ])
    })
})
