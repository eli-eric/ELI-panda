import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useGrantSelectionModal } from '../useGrantSelectionModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/grant-modal-content', () => ({
    GrantModalContent: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('m-1')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useGrantSelectionModal', () => {
    it('openGrantModal opens dialog with id "grant-select" + xl size', () => {
        const { result } = renderHook(() => useGrantSelectionModal())
        const onSelect = jest.fn()
        const id = result.current.openGrantModal(onSelect)
        expect(id).toBe('m-1')
        const [kind, opts] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(opts.id).toBe('grant-select')
        expect(opts.props.size).toBe('xl')
        expect(opts.props.onSelect).toBe(onSelect)
    })

    it('forwards initialSelected to modal props', () => {
        const initial = [{ uid: 'g1', name: 'Grant 1' }] as any
        const { result } = renderHook(() => useGrantSelectionModal())
        result.current.openGrantModal(jest.fn(), initial)
        expect(openModal.mock.calls[0][1].props.initialSelected).toBe(initial)
    })
})
