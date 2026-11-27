import { render } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useWizardStore } from '../../wizard/store/useWizardStore'
import { ItemMoveModal, ItemMoveModalContent, openItemMoveModal } from '../item-move.modal'
import { useModalWizardStore } from '../store/useModalWizardStore'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

jest.mock('../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('../store/useModalWizardStore', () => {
    const store = jest.fn() as jest.Mock & { getState: jest.Mock }
    store.getState = jest.fn()
    return { useModalWizardStore: store }
})

jest.mock('../hooks/useWizardContextSystem', () => ({
    useWizardContextSystem: jest.fn().mockReturnValue({}),
}))

jest.mock('../item-move.cont', () => ({
    ItemMoveContainer: () => <div data-testid="cont" />,
}))

const mockUseDynamicModalStore = useDynamicModalStore as unknown as { getState: jest.Mock }
const mockUseWizardStore = useWizardStore as unknown as jest.Mock
const mockUseModalWizardStore = useModalWizardStore as unknown as jest.Mock & {
    getState: jest.Mock
}

let openModal: jest.Mock
let resetWizard: jest.Mock
let setSelectedSystem: jest.Mock
let setContextSystem: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('mid-1')
    resetWizard = jest.fn()
    setSelectedSystem = jest.fn()
    setContextSystem = jest.fn()
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
    mockUseWizardStore.mockReturnValue({ resetWizard })
    mockUseModalWizardStore.mockReturnValue({ setSelectedSystem, setContextSystem })
    mockUseModalWizardStore.getState.mockReturnValue({ setContextSystem })
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

    it('stores the passed source system snapshot', () => {
        const system = { uid: 'sys-1', name: 'Sys 1' }
        openItemMoveModal(system)
        expect(setContextSystem).toHaveBeenCalledWith(system)
    })

    it('clears the context system when called without one', () => {
        openItemMoveModal()
        expect(setContextSystem).toHaveBeenCalledWith(null)
    })
})

describe('ItemMoveModalContent', () => {
    it('renders ItemMoveContainer', () => {
        const { getByTestId } = render(<ItemMoveModalContent />)
        expect(getByTestId('cont')).toBeInTheDocument()
    })

    it('resets wizard + clears selected system on unmount, keeps context uid', () => {
        const { unmount } = render(<ItemMoveModalContent />)
        unmount()
        expect(resetWizard).toHaveBeenCalled()
        expect(setSelectedSystem).toHaveBeenCalledWith(null)
        // StrictMode re-runs the cleanup right after mount — clearing the uid
        // here would break the wizard while the modal is still open
        expect(setContextSystem).not.toHaveBeenCalled()
    })
})

describe('ItemMoveModal (deprecated)', () => {
    it('returns null', () => {
        const { container } = render(<ItemMoveModal />)
        expect(container).toBeEmptyDOMElement()
    })
})
