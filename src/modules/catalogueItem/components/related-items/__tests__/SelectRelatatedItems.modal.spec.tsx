import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { openSelectRelatedItemsModal } from '../SelectRelatatedItems.modal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as {
    getState: jest.Mock
}

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid-x')
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
})

describe('openSelectRelatedItemsModal', () => {
    it('opens an l-size dialog with id "related-items" + Select Related Item title', () => {
        const id = openSelectRelatedItemsModal()
        expect(id).toBe('mid-x')
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('related-items')
        expect(config.props).toEqual({ title: 'Select Related Item', size: 'l' })
        // component lazily rendered inside; just verify it's a function
        expect(typeof config.component).toBe('function')
    })
})
