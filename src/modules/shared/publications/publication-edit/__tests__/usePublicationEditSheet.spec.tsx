import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { usePublicationEditSheet } from '../usePublicationEditSheet'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../publication-edit.cont', () => ({
    PublicationEditContainer: () => null,
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

describe('usePublicationEditSheet', () => {
    it('returns [onEdit, onClose] tuple', () => {
        const { result } = renderHook(() => usePublicationEditSheet('pub-1'))
        expect(typeof result.current[0]).toBe('function')
        expect(typeof result.current[1]).toBe('function')
    })

    it('onEdit opens sheet keyed by uid', () => {
        const { result } = renderHook(() => usePublicationEditSheet('pub-9'))
        result.current[0]()
        expect(openModal).toHaveBeenCalledWith('sheet', expect.objectContaining({
            id: 'publication-edit-pub-9',
            props: expect.objectContaining({ uid: 'pub-9', title: 'Edit publication' }),
        }))
    })

    it('onClose closes the modal opened by onEdit', () => {
        const { result } = renderHook(() => usePublicationEditSheet('pub-1'))
        result.current[0]()
        result.current[1]()
        expect(closeModal).toHaveBeenCalledWith('mid-1')
    })

    it('onClose is a no-op when onEdit was never called', () => {
        const { result } = renderHook(() => usePublicationEditSheet('pub-1'))
        result.current[1]()
        expect(closeModal).not.toHaveBeenCalled()
    })
})
