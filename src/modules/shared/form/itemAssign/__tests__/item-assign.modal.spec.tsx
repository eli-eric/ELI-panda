import { render } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useModalWizardStore } from '../../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { ItemAssignModal, ItemAssignModalContent, openItemAssignModal } from '../item-assign.modal'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

jest.mock('../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('../../itemMoving/store/useModalWizardStore', () => {
    const store = jest.fn() as jest.Mock & { getState: jest.Mock }
    store.getState = jest.fn()
    return { useModalWizardStore: store }
})

jest.mock('../../itemMoving/hooks/useWizardContextSystem', () => ({
    useWizardContextSystem: jest.fn().mockReturnValue({}),
}))

jest.mock('../item-assign.cont', () => ({
    ItemAssignContainer: () => <div data-testid="cont" />,
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

describe('openItemAssignModal', () => {
    it('opens an xl-size dialog with id "item-assign"', () => {
        openItemAssignModal()
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('item-assign')
        expect(config.props).toEqual({ title: 'Assign Item', size: 'xl' })
    })

    it('stores the passed destination system snapshot', () => {
        const system = { uid: 'sys-1', name: 'Sys 1' }
        openItemAssignModal(system)
        expect(setContextSystem).toHaveBeenCalledWith(system)
    })

    it('clears the context system when called without one', () => {
        openItemAssignModal()
        expect(setContextSystem).toHaveBeenCalledWith(null)
    })
})

describe('ItemAssignModalContent', () => {
    it('renders ItemAssignContainer', () => {
        const { getByTestId } = render(<ItemAssignModalContent />)
        expect(getByTestId('cont')).toBeInTheDocument()
    })

    it('resets wizard + clears selected system on unmount, keeps context uid', () => {
        const { unmount } = render(<ItemAssignModalContent />)
        unmount()
        expect(resetWizard).toHaveBeenCalled()
        expect(setSelectedSystem).toHaveBeenCalledWith(null)
        // StrictMode re-runs the cleanup right after mount — clearing the uid
        // here would break the wizard while the modal is still open
        expect(setContextSystem).not.toHaveBeenCalled()
    })
})

describe('ItemAssignModal (deprecated)', () => {
    it('returns null', () => {
        const { container } = render(<ItemAssignModal />)
        expect(container).toBeEmptyDOMElement()
    })
})
