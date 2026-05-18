import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useCatalogueSelectFilterSheet } from '../useCatalogueSelectFilterSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../CatalogueSelectFilterSheet', () => ({
    CatalogueSelectFilterSheet: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useCatalogueSelectFilterSheet', () => {
    it('opens sheet with id catalogue-select-filters-{tableId} and default side=right', () => {
        const { result } = renderHook(() => useCatalogueSelectFilterSheet())
        result.current({ tableId: 't1' })
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('catalogue-select-filters-t1')
        expect(config.props.side).toBe('right')
        expect(config.props.tableId).toBe('t1')
    })

    it('respects custom side', () => {
        const { result } = renderHook(() => useCatalogueSelectFilterSheet())
        result.current({ tableId: 't', side: 'left' })
        expect(openModal.mock.calls[0][1].props.side).toBe('left')
    })

    it('passes catalogueCategoryProperties through', () => {
        const props = [{ uid: 'p1' }] as any
        const { result } = renderHook(() => useCatalogueSelectFilterSheet())
        result.current({ tableId: 't', catalogueCategoryProperties: props })
        expect(openModal.mock.calls[0][1].props.catalogueCategoryProperties).toBe(props)
    })
})
