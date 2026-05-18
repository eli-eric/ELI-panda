import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemsFilterSheet } from '../useSystemsFilterSheet'

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
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useSystemsFilterSheet', () => {
    it('default args: tableId=systems, enableQueryURL=true, side=left', () => {
        const { result } = renderHook(() => useSystemsFilterSheet())
        result.current()
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('sheet')
        expect(config.id).toBe('system-filters-systems')
        expect(config.props.tableId).toBe('systems')
        expect(config.props.enableQueryURL).toBe(true)
        expect(config.props.side).toBe('left')
    })

    it('passes disabledFields through', () => {
        const { result } = renderHook(() => useSystemsFilterSheet())
        result.current({ disabledFields: { a: true } })
        expect(openModal.mock.calls[0][1].props.disabledFields).toEqual({ a: true })
    })

    it('respects custom tableId', () => {
        const { result } = renderHook(() => useSystemsFilterSheet())
        result.current({ tableId: 'custom' })
        expect(openModal.mock.calls[0][1].id).toBe('system-filters-custom')
    })
})
