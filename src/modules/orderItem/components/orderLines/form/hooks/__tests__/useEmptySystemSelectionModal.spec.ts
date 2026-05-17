import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useEmptySystemSelectionModal } from '../useEmptySystemSelectionModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/empty-system-modal-content', () => ({
    EmptySystemModalContent: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('modal-id-1')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useEmptySystemSelectionModal', () => {
    it('returns openEmptySystemModal function', () => {
        const { result } = renderHook(() => useEmptySystemSelectionModal())
        expect(typeof result.current.openEmptySystemModal).toBe('function')
    })

    it('openEmptySystemModal calls openModal with dialog config + provided onSelect', () => {
        const { result } = renderHook(() => useEmptySystemSelectionModal())
        const onSelect = jest.fn()
        const id = result.current.openEmptySystemModal(onSelect)
        expect(id).toBe('modal-id-1')
        expect(openModal).toHaveBeenCalledTimes(1)
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('order-line-empty-system-select')
        expect(config.props.onSelect).toBe(onSelect)
        expect(config.props.title).toBe('Select System (Empty Only)')
        expect(config.props.size).toBe('xl')
    })

    it('defaults onSelect to a noop when omitted', () => {
        const { result } = renderHook(() => useEmptySystemSelectionModal())
        result.current.openEmptySystemModal()
        const config = openModal.mock.calls[0][1]
        expect(typeof config.props.onSelect).toBe('function')
        // calling the default onSelect should not throw
        expect(() => config.props.onSelect(null)).not.toThrow()
    })
})
