import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useCatalogueFilterSheet } from '../useCatalogueFilterSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../CatalogueFilterSheet.cont', () => ({
    CatalogueFilterSheet: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useCatalogueFilterSheet', () => {
    it('default args: tableId=catalogueItems, enableQueryURL=true, side=left', () => {
        const { result } = renderHook(() => useCatalogueFilterSheet())
        const filterFormMethods = { id: 'fm' } as any
        result.current({ filterFormMethods })
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('catalogue-filters-catalogueItems')
        expect(config.props.side).toBe('left')
        expect(config.props.tableId).toBe('catalogueItems')
        expect(config.props.filterFormMethods).toBe(filterFormMethods)
    })

    it('respects custom tableId / side / enableQueryURL', () => {
        const { result } = renderHook(() => useCatalogueFilterSheet())
        result.current({
            filterFormMethods: {} as any,
            tableId: 'x',
            side: 'right',
            enableQueryURL: false,
        })
        const config = openModal.mock.calls[0][1]
        expect(config.id).toBe('catalogue-filters-x')
        expect(config.props.side).toBe('right')
        expect(config.props.enableQueryURL).toBe(false)
    })
})
