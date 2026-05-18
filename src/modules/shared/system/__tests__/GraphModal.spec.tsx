import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { openGraphModal } from '../GraphModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as {
    getState: jest.Mock
}

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
})

describe('openGraphModal', () => {
    it('opens xl-size dialog keyed by uid', () => {
        const id = openGraphModal('sys-9')
        expect(id).toBe('mid')
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('system-graph-sys-9')
        expect(config.props).toEqual({ title: 'System Graph', size: 'xl' })
    })
})
