import { render } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ItemMoveModal, ItemMoveModalContent, openItemMoveModal } from '../item-move.modal'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

jest.mock('../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('../store/useModalWizardStore', () => ({
    useModalWizardStore: jest.fn(),
}))

jest.mock('../item-move.cont', () => ({
    ItemMoveContainer: () => <div data-testid="cont" />,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as { getState: jest.Mock }
const mockUseWizardStore = useWizardStore as unknown as jest.Mock
const mockUseModalWizardStore = useModalWizardStore as unknown as jest.Mock

let openModal: jest.Mock
let resetWizard: jest.Mock
let setSelectedSystem: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid-1')
    resetWizard = jest.fn()
    setSelectedSystem = jest.fn()
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
    mockUseWizardStore.mockReturnValue({ resetWizard })
    mockUseModalWizardStore.mockReturnValue({ setSelectedSystem })
})

describe('openItemMoveModal', () => {
    it('opens a l-size dialog with id "item-move"', () => {
        const id = openItemMoveModal()
        expect(id).toBe('mid-1')
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('item-move')
        expect(config.props).toEqual({ title: 'Move Item', size: 'l' })
    })
})

describe('ItemMoveModalContent', () => {
    it('renders ItemMoveContainer', () => {
        const { getByTestId } = render(<ItemMoveModalContent />)
        expect(getByTestId('cont')).toBeInTheDocument()
    })

    it('resets wizard + clears selected system on unmount', () => {
        const { unmount } = render(<ItemMoveModalContent />)
        unmount()
        expect(resetWizard).toHaveBeenCalled()
        expect(setSelectedSystem).toHaveBeenCalledWith(null)
    })
})

describe('ItemMoveModal (deprecated)', () => {
    it('returns null', () => {
        const { container } = render(<ItemMoveModal />)
        expect(container).toBeEmptyDOMElement()
    })
})
