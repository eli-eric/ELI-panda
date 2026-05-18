import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useSystemTypeSelectionModal } from '../useSystemTypeSelectionModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/system-type-modal-content', () => ({
    SystemTypeModalContent: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('m-1')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useSystemTypeSelectionModal', () => {
    it('openSystemTypeModal opens dialog with expected id + size', () => {
        const { result } = renderHook(() => useSystemTypeSelectionModal())
        const id = result.current.openSystemTypeModal(jest.fn())
        expect(id).toBe('m-1')
        const [kind, opts] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(opts.id).toBe('system-type-select')
        expect(opts.props.size).toBe('l')
        expect(opts.props.title).toBe('Select System Type')
    })

    it('passes onSelect callback', () => {
        const onSelect = jest.fn()
        const { result } = renderHook(() => useSystemTypeSelectionModal())
        result.current.openSystemTypeModal(onSelect)
        expect(openModal.mock.calls[0][1].props.onSelect).toBe(onSelect)
    })

    it('falls back to no-op onSelect when not provided', () => {
        const { result } = renderHook(() => useSystemTypeSelectionModal())
        result.current.openSystemTypeModal()
        const opts = openModal.mock.calls[0][1]
        expect(typeof opts.props.onSelect).toBe('function')
        opts.props.onSelect(null)
    })
})
