import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useWizardStore } from '../../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../../store/useModalWizardStore'
import { MOVE_TYPE } from '../../types/constants'
import { InitWizardPath } from '../InitWizardPath.step'

jest.mock('../../store/useModalWizardStore', () => ({
    useModalWizardStore: jest.fn(),
}))

jest.mock('../../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('../components/InitWizard.btn', () => ({
    InitWizardButton: ({
        onClick,
        children,
    }: {
        onClick: () => void
        children: React.ReactNode
    }) => (
        <button data-testid="init-btn" onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/components/overlays/modal/modal.buttons', () => ({
    __esModule: true,
    default: ({ buttons }: { buttons: any }) => (
        <button data-testid="close-btn" onClick={buttons.goNext.onClick}>
            Close
        </button>
    ),
}))

const mockUseModalWizardStore = useModalWizardStore as unknown as jest.Mock
const mockUseWizardStore = useWizardStore as unknown as jest.Mock

let setOpen: jest.Mock
let setSelectedSystem: jest.Mock
let setMoveType: jest.Mock
let setIsMovingToNewSystem: jest.Mock
let goNext: jest.Mock
let resetWizard: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setOpen = jest.fn()
    setSelectedSystem = jest.fn()
    setMoveType = jest.fn()
    setIsMovingToNewSystem = jest.fn()
    goNext = jest.fn()
    resetWizard = jest.fn()
    mockUseModalWizardStore.mockReturnValue({
        setOpen,
        setSelectedSystem,
        setMoveType,
        setIsMovingToNewSystem,
    })
    mockUseWizardStore.mockReturnValue({ goNext, resetWizard })
})

describe('InitWizardPath', () => {
    it('renders 2 InitWizardButtons + Close button', () => {
        renderWithProviders(<InitWizardPath />)
        expect(screen.getAllByTestId('init-btn').length).toBe(2)
        expect(screen.getByTestId('close-btn')).toBeInTheDocument()
    })

    it('Create New System button sets moveType=NEW_SYSTEM + isMovingToNewSystem=true', () => {
        renderWithProviders(<InitWizardPath />)
        const buttons = screen.getAllByTestId('init-btn')
        // first = create new system
        fireEvent.click(buttons[0])
        expect(goNext).toHaveBeenCalled()
        expect(setMoveType).toHaveBeenCalledWith(MOVE_TYPE.NEW_SYSTEM)
        expect(setIsMovingToNewSystem).toHaveBeenCalledWith(true)
    })

    it('Destination System button sets moveType=DESTINATION_SYSTEM + isMovingToNewSystem=false', () => {
        renderWithProviders(<InitWizardPath />)
        const buttons = screen.getAllByTestId('init-btn')
        fireEvent.click(buttons[1])
        expect(setMoveType).toHaveBeenCalledWith(MOVE_TYPE.DESTINATION_SYSTEM)
        expect(setIsMovingToNewSystem).toHaveBeenCalledWith(false)
    })

    it('Close button closes modal + resets wizard + clears selectedSystem', () => {
        renderWithProviders(<InitWizardPath />)
        fireEvent.click(screen.getByTestId('close-btn'))
        expect(setOpen).toHaveBeenCalledWith(false)
        expect(resetWizard).toHaveBeenCalled()
        expect(setSelectedSystem).toHaveBeenCalledWith(null)
    })
})
