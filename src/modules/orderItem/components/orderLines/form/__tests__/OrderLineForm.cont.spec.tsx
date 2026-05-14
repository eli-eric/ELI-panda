import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { AllProvidersWrapper } from '@/testutils/wrappers/AllProvidersWrapper'

import { useOrderLineModal } from '../OrderLineForm.cont'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../OrderLineWizard', () => ({
    OrderLineWizard: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid')
    mockUseDynamicModalStore.mockReturnValue({ openModal })
})

describe('useOrderLineModal', () => {
    it('opens dialog with order-line-add id + xl size', () => {
        const { result } = renderHook(() => useOrderLineModal(), {
            wrapper: AllProvidersWrapper,
        })
        const id = result.current.openOrderLineModal()
        expect(id).toBe('mid')
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('order-line-add')
        expect(config.props.size).toBe('xl')
        expect(config.props.side).toBe('left')
    })

    it('Component closure accepts optional onSave callback', () => {
        const { result } = renderHook(() => useOrderLineModal(), {
            wrapper: AllProvidersWrapper,
        })
        result.current.openOrderLineModal()
        const config = openModal.mock.calls[0][1]
        // component is the inline-wrapped OrderLineModalContent
        expect(typeof config.component).toBe('function')
    })
})
