import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useOrdersFilterSheet } from '../useOrdersFilterSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../OrdersFilterSheet.cont', () => ({
    OrdersFilterSheet: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useOrdersFilterSheet', () => {
    it('default args: tableId=orders, enableQueryURL=true, side=left', () => {
        const { result } = renderHook(() => useOrdersFilterSheet())
        result.current()
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('orders-filters-orders')
        expect(config.props).toEqual({
            title: 'Order Filters',
            size: 'l',
            side: 'left',
            tableId: 'orders',
            enableQueryURL: true,
        })
    })

    it('respects custom tableId/enableQueryURL/side', () => {
        const { result } = renderHook(() => useOrdersFilterSheet())
        result.current({ tableId: 't', enableQueryURL: false, side: 'right' })
        const config = openModal.mock.calls[0][1]
        expect(config.id).toBe('orders-filters-t')
        expect(config.props.side).toBe('right')
        expect(config.props.enableQueryURL).toBe(false)
    })
})
