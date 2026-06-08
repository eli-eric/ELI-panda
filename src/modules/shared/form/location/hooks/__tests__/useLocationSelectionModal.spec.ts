import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useLocationSelectionModal } from '../useLocationSelectionModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/location-modal-content', () => ({
    LocationModalContent: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useLocationSelectionModal', () => {
    it('opens dialog with location-select id and "l" size + filtering flags', () => {
        const openModal = jest.fn(() => 'modal-1')
        mockUseDynamicModalStore.mockReturnValue({ openModal })

        const { result } = renderHook(() => useLocationSelectionModal())
        const onSelect = jest.fn()
        const id = result.current.openLocationModal(onSelect)

        expect(id).toBe('modal-1')
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('dialog')
        const config = callArgs[1]
        expect(config.id).toBe('location-select')
        expect(config.props.size).toBe('l')
        expect(config.props.enableFiltering).toBe(true)
        expect(config.props.manualFiltering).toBe(true)
        expect(config.props.selectParent).toBe(true)
        expect(config.props.onSelect).toBe(onSelect)
    })

    it('falls back to noop onSelect when missing', () => {
        const openModal = jest.fn(() => 'm')
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useLocationSelectionModal())

        result.current.openLocationModal()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(typeof callArgs[1].props.onSelect).toBe('function')
        expect(() => callArgs[1].props.onSelect(null)).not.toThrow()
    })
})
