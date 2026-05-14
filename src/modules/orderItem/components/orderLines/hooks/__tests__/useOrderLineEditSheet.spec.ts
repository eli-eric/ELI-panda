import { act, renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useOrderLineEditSheet } from '../useOrderLineEditSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('useOrderLineEditSheet', () => {
    it('exposes openEditSheet + closeEditSheet', () => {
        mockUseDynamicModalStore.mockReturnValue({
            openModal: jest.fn(() => 'id-1'),
            closeModal: jest.fn(),
        })
        const { result } = renderHook(() => useOrderLineEditSheet())
        expect(typeof result.current.openEditSheet).toBe('function')
        expect(typeof result.current.closeEditSheet).toBe('function')
    })

    it('openEditSheet calls openModal with sheet type, fixed id, orderLine prop', () => {
        const openModal = jest.fn(() => 'modal-1')
        const closeModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
        const { result } = renderHook(() => useOrderLineEditSheet())

        const orderLine = { uid: 'ol-1' } as any
        const onSave = jest.fn()
        act(() => result.current.openEditSheet(orderLine, onSave))

        expect(openModal).toHaveBeenCalled()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('sheet')
        const config = callArgs[1]
        expect(config.id).toBe('order-line-edit')
        expect(config.props.orderLine).toBe(orderLine)
        expect(config.props.title).toBe('Edit Order Line')

        config.onSubmit({ uid: 'ol-1', name: 'X' })
        expect(onSave).toHaveBeenCalledWith({ uid: 'ol-1', name: 'X' })
        expect(closeModal).toHaveBeenCalledWith('modal-1')
    })

    it('closeEditSheet closes only if open was called first', () => {
        const closeModal = jest.fn()
        mockUseDynamicModalStore.mockReturnValue({ openModal: jest.fn(() => 'm'), closeModal })
        const { result } = renderHook(() => useOrderLineEditSheet())

        // Before opening: should be a no-op
        act(() => result.current.closeEditSheet())
        expect(closeModal).not.toHaveBeenCalled()

        // After opening: closes with stored id
        act(() => result.current.openEditSheet({} as any))
        act(() => result.current.closeEditSheet())
        expect(closeModal).toHaveBeenCalledWith('m')
    })
})
