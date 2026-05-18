import { renderHook } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useResearcherSelectionModal } from '../useResearcherSelectionModal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../components/researcher-modal-content', () => ({
    ResearcherModalContent: () => null,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock

beforeEach(() => jest.clearAllMocks())

describe('useResearcherSelectionModal', () => {
    it('opens dialog with researcher-select id and "xl" size', () => {
        const openModal = jest.fn(() => 'r-1')
        mockUseDynamicModalStore.mockReturnValue({ openModal })

        const { result } = renderHook(() => useResearcherSelectionModal())
        const onSelect = jest.fn()
        const initial = [{ uid: 'r' } as any]
        result.current.openResearcherModal(onSelect, initial)

        const callArgs = openModal.mock.calls[0] as unknown as [string, any]
        expect(callArgs[0]).toBe('dialog')
        const config = callArgs[1]
        expect(config.id).toBe('researcher-select')
        expect(config.props.size).toBe('xl')
        expect(config.props.onSelect).toBe(onSelect)
        expect(config.props.initialSelected).toBe(initial)
        expect(config.props.title).toBe('Select ELI Authors')
    })
})
