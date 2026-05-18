import { fireEvent, screen } from '@testing-library/react'

import { useRowSelection } from '@/modules/shared/table/pandaTable/hooks/useRowSelection'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useMoveSubmit } from '../../hooks/useMoveSubmit'
import { useSystemsMoveStore } from '../../store/useSystemsMoveStore'
import { SubmitMoveButton } from '../submit-move.button'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/modules/shared/table/pandaTable/hooks/useRowSelection', () => ({
    useRowSelection: jest.fn(),
}))

jest.mock('../../hooks/useMoveSubmit', () => ({
    useMoveSubmit: jest.fn(),
}))

jest.mock('../../store/useSystemsMoveStore', () => ({
    useSystemsMoveStore: jest.fn(),
}))

const mockUseRowSelection = useRowSelection as jest.Mock
const mockUseMoveSubmit = useMoveSubmit as jest.Mock
const mockUseSystemsMoveStore = useSystemsMoveStore as unknown as jest.Mock

let mutate: jest.Mock
let reset: jest.Mock
let setSelectedDestinationRows: jest.Mock
let setMovingSystemsRows: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    mutate = jest.fn()
    reset = jest.fn()
    setSelectedDestinationRows = jest.fn()
    setMovingSystemsRows = jest.fn()
    mockUseMoveSubmit.mockReturnValue({ mutate })
    mockUseRowSelection
        .mockReturnValueOnce([{}, setSelectedDestinationRows])
        .mockReturnValueOnce([{}, setMovingSystemsRows])
})

const storeMock = ({
    movingSystems = [] as any[],
    destinationSystem = null as any,
} = {}) => ({
    movingSystems,
    destinationSystem,
    reset,
    destinationSystemsTableId: 'dest',
    movingSystemsTableId: 'mov',
})

describe('SubmitMoveButton', () => {
    it('disabled with tooltip when no moving systems', () => {
        mockUseSystemsMoveStore.mockReturnValue(storeMock())
        renderWithProviders(<SubmitMoveButton />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('disabled when no destination even if moving systems exist', () => {
        mockUseSystemsMoveStore.mockReturnValue(
            storeMock({ movingSystems: [{ uid: 's1' }] }),
        )
        renderWithProviders(<SubmitMoveButton />)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('enabled when both movingSystems + destinationSystem set; click submits mutate', () => {
        mockUseSystemsMoveStore.mockReturnValue(
            storeMock({
                movingSystems: [{ uid: 's1' }, { uid: 's2' }],
                destinationSystem: { uid: 'd-1' },
            }),
        )
        renderWithProviders(<SubmitMoveButton />)
        const btn = screen.getByRole('button')
        expect(btn).not.toBeDisabled()
        fireEvent.click(btn)
        expect(mutate).toHaveBeenCalledWith({
            systemsToMoveUids: ['s1', 's2'],
            targetParentSystemUid: 'd-1',
        })
    })

    it('useMoveSubmit receives a resetSelection callback that clears both tables + store', () => {
        mockUseSystemsMoveStore.mockReturnValue(
            storeMock({
                movingSystems: [{ uid: 's1' }],
                destinationSystem: { uid: 'd' },
            }),
        )
        renderWithProviders(<SubmitMoveButton />)
        const args = mockUseMoveSubmit.mock.calls[0][0]
        args.resetSelection()
        expect(setSelectedDestinationRows).toHaveBeenCalledWith({})
        expect(setMovingSystemsRows).toHaveBeenCalledWith({})
        expect(reset).toHaveBeenCalled()
    })
})
