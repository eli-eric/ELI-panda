import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { UseItemCreateDialog } from '../use-item-create.dialog'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../components/item-create-form', () => ({
    ItemCreateForm: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock
let closeModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid-1')
    closeModal = jest.fn()
    mockUseDynamicModalStore.mockReturnValue({ openModal, closeModal })
})

describe('UseItemCreateDialog', () => {
    it('returns openDialog function', () => {
        const { result } = renderHook(() => UseItemCreateDialog())
        expect(typeof result.current).toBe('function')
    })

    it('openDialog opens item-create dialog with onItemCreated callback', () => {
        const onCreated = jest.fn()
        const { result } = renderHook(() => UseItemCreateDialog())
        const id = result.current(onCreated)
        expect(id).toBe('mid-1')
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('item-create')
        expect(config.props.onItemCreated).toBe(onCreated)
    })

    it('onClose handler closes the opened modal', () => {
        const { result } = renderHook(() => UseItemCreateDialog())
        result.current()
        const onClose = openModal.mock.calls[0][1].props.onClose
        onClose()
        expect(closeModal).toHaveBeenCalledWith('mid-1')
    })
})
