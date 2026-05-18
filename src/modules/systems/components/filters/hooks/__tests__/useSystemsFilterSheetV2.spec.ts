import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemsFilterSheetV2 } from '../useSystemsFilterSheetV2'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../SystemsFilterSheet.cont', () => ({
    SystemsFilterSheet: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('m-1')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useSystemsFilterSheetV2', () => {
    it('defaults: tableId=systems, enableQueryURL=true, side=left', () => {
        const { result } = renderHook(() => useSystemsFilterSheetV2())
        result.current()
        const [kind, opts] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(opts.id).toBe('system-filters-systems')
        expect(opts.props.tableId).toBe('systems')
        expect(opts.props.enableQueryURL).toBe(true)
        expect(opts.props.side).toBe('left')
    })

    it('honors custom tableId in modal id', () => {
        const { result } = renderHook(() => useSystemsFilterSheetV2())
        result.current({ tableId: 'inventory' })
        expect(openModal.mock.calls[0][1].id).toBe('system-filters-inventory')
    })

    it('honors disabledFields + side overrides', () => {
        const { result } = renderHook(() => useSystemsFilterSheetV2())
        result.current({ disabledFields: { category: true } as any, side: 'right' })
        const opts = openModal.mock.calls[0][1]
        expect(opts.props.disabledFields).toEqual({ category: true })
        expect(opts.props.side).toBe('right')
    })

    it('returns modal id from openModal', () => {
        const { result } = renderHook(() => useSystemsFilterSheetV2())
        expect(result.current()).toBe('m-1')
    })
})
