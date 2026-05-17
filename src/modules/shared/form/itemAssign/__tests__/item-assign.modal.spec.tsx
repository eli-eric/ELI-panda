import { render } from '@testing-library/react'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ItemAssignModal, ItemAssignModalContent, openItemAssignModal } from '../item-assign.modal'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../../itemMoving/store/useModalWizardStore'

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: { getState: jest.fn() } as any,
}))

jest.mock('../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('../../itemMoving/store/useModalWizardStore', () => ({
    useModalWizardStore: jest.fn(),
}))

jest.mock('../item-assign.cont', () => ({
    ItemAssignContainer: () => <div data-testid="cont" />,
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

describe('openItemAssignModal', () => {
    it('opens an xl-size dialog with id "item-assign"', () => {
        openItemAssignModal()
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('item-assign')
        expect(config.props).toEqual({ title: 'Assign Item', size: 'xl' })
    })
})

describe('ItemAssignModalContent', () => {
    it('renders ItemAssignContainer', () => {
        const { getByTestId } = render(<ItemAssignModalContent />)
        expect(getByTestId('cont')).toBeInTheDocument()
    })

    it('resets wizard + clears selected system on unmount', () => {
        const { unmount } = render(<ItemAssignModalContent />)
        unmount()
        expect(resetWizard).toHaveBeenCalled()
        expect(setSelectedSystem).toHaveBeenCalledWith(null)
    })
})

describe('ItemAssignModal (deprecated)', () => {
    it('returns null', () => {
        const { container } = render(<ItemAssignModal />)
        expect(container).toBeEmptyDOMElement()
    })
})
