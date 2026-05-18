import { renderHook } from '@testing-library/react'

import { useCategoryUid } from '@/modules/catalogue/hooks/useCategoryUid'
import { useCategoryProperties } from '@/modules/systems/hooks/useCategoryProperties'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useCatalogueItemSelectColumns } from '../CatalogueItemSelect.columns'

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

describe('useCatalogueItemSelectColumns', () => {
    it('returns base 7 + update 2 = 9 columns when no category properties', () => {
        const { result } = renderHook(
            () =>
                useCatalogueItemSelectColumns({
                    tableId: 't1',
                    onItemToggle: jest.fn(),
                }),
            { wrapper: AllProvidersWrapper },
        )
        expect(result.current.length).toBe(9)
        expect(result.current.map(c => c.id)).toEqual([
            'selection',
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

    it('selection column is sticky + cannot filter', () => {
        const { result } = renderHook(
            () =>
                useCatalogueItemSelectColumns({
                    tableId: 't1',
                    onItemToggle: jest.fn(),
                }),
            { wrapper: AllProvidersWrapper },
        )
        const sel = result.current[0] as any
        expect(sel.meta?.sticky).toBe(true)
        expect(sel.enableColumnFilter).toBe(false)
    })

    it('name column sticky=false when hideButtons=true', () => {
        const { result } = renderHook(
            () =>
                useCatalogueItemSelectColumns({
                    tableId: 't1',
                    hideButtons: true,
                    onItemToggle: jest.fn(),
                }),
            { wrapper: AllProvidersWrapper },
        )
        const name = result.current[1] as any
        expect(name.meta?.sticky).toBe(false)
    })

    it('inserts detail columns before categoryName when properties present', () => {
        mockUseCategoryProperties.mockReturnValue({
            catalogueCategoryProperties: [
                { property: { uid: 'd1', name: 'Detail 1', type: { uid: 't' } } },
                { property: { uid: 'd2', name: 'Detail 2', type: { uid: 't' } } },
            ],
        })
        const { result } = renderHook(
            () =>
                useCatalogueItemSelectColumns({
                    tableId: 't1',
                    onItemToggle: jest.fn(),
                    catalogueItems: {
                        data: [{ details: [{ property: { uid: 'x', name: 'X' }, value: '1' }] }],
                    } as any,
                }),
            { wrapper: AllProvidersWrapper },
        )
        // 9 base + 2 detail = 11
        expect(result.current.length).toBe(11)
        const ids = result.current.map(c => c.id)
        expect(ids).toEqual([
            'selection',
            'name',
            'description',
            'partNumber',
            'd1',
            'd2',
            'categoryName',
            'supplier',
            'manufacturerUrl',
            'lastUpdateTime',
            'lastUpdateBy',
        ])
    })
})
