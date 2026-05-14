import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemSelectionModal } from '../useSystemSelectionModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/system-modal-content', () => ({
    SystemModalContent: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useSystemSelectionModal', () => {
    it('opens dialog modal with fixed id and onSelect callback wired', () => {
        const openModal = jest.fn(() => 'modal-1')
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemSelectionModal())

        const onSelect = jest.fn()
        const id = result.current.openSystemModal(onSelect)

        expect(id).toBe('modal-1')
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('dialog')
        const config = callArgs[1]
        expect(config.id).toBe('system-select')
        expect(config.props.size).toBe('xl')
        expect(config.props.onSelect).toBe(onSelect)
    })

    it('falls back to noop onSelect when not provided', () => {
        const openModal = jest.fn(() => 'modal-1')
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemSelectionModal())

        result.current.openSystemModal()
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        const config = callArgs[1]
        expect(typeof config.props.onSelect).toBe('function')
        expect(() => config.props.onSelect(null)).not.toThrow()
    })

    it('passes onSystemDetailSelect through to props', () => {
        const openModal = jest.fn(() => 'm')
        mockUseDynamicModalStore.mockReturnValue({ openModal })
        const { result } = renderHook(() => useSystemSelectionModal())

        const onSystemDetailSelect = jest.fn()
        result.current.openSystemModal(undefined, onSystemDetailSelect)
        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[1].props.onSystemDetailSelect).toBe(onSystemDetailSelect)
    })
})
