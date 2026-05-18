import { fireEvent, render, screen } from '@testing-library/react'

import { useSystems } from '@/modules/systems/hooks/useSystems'

import { useWizardStore } from '../../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../../store/useModalWizardStore'
import { OldItemDestinationStep } from '../OldItemDestination.step'

jest.mock('../../store/useModalWizardStore', () => ({
    useModalWizardStore: jest.fn(),
}))

jest.mock('../../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('@/modules/systems/hooks/useSystems', () => ({
    useSystems: jest.fn(),
}))

jest.mock('../system-selection/SystemSelect.columns', () => ({
    useDestinationColumns: () => [],
}))

jest.mock('@/modules/shared/table/pandaTable/hooks/usePandaTable', () => ({
    usePandaTable: () => ({}),
}))

let lastTableProps: any = null
jest.mock('@/modules/shared/table/pandaTableV2/PandaTableV2', () => ({
    __esModule: true,
    PandaTableV2: (props: any) => {
        lastTableProps = props
        return <div data-testid="panda" />
    },
}))

jest.mock('@/modules/shared/table/PaginationV2', () => ({
    PaginationV2: ({ settings }: { settings: any }) => (
        <div data-testid="pagination" data-total={settings.total ?? 0} />
    ),
}))

jest.mock('@/modules/shared/table/SearchBar', () => ({
    SearchBar: () => <div data-testid="search-bar" />,
}))

jest.mock('../system-selection/filter/FilterButton', () => ({
    FilterButton: () => <div data-testid="filter-btn" />,
}))

jest.mock('../../../FilterBadges', () => ({
    FilterBadges: () => <div data-testid="badges" />,
}))

jest.mock('@/components/overlays/modal/modal.buttons', () => ({
    __esModule: true,
    default: ({ buttons }: { buttons: any }) => (
        <div>
            <button
                data-testid="next"
                disabled={buttons.goNext.disabled}
                onClick={buttons.goNext.onClick}
            >
                next
            </button>
            <button data-testid="back" onClick={buttons.goBack.onClick}>
                back
            </button>
        </div>
    ),
}))

const mockUseModalWizard = useModalWizardStore as unknown as jest.Mock
const mockUseWizard = useWizardStore as unknown as jest.Mock
const mockUseSystems = useSystems as jest.Mock

let setOldItemParentSystem: jest.Mock
let goNext: jest.Mock
let goBack: jest.Mock
let updateFormData: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setOldItemParentSystem = jest.fn()
    goNext = jest.fn()
    goBack = jest.fn()
    updateFormData = jest.fn()
    mockUseModalWizard.mockReturnValue({
        setOldItemParentSystem,
        oldItemParentSystem: null,
    })
    mockUseWizard.mockReturnValue({ goNext, goBack, updateFormData })
    mockUseSystems.mockReturnValue({ systems: { data: [], totalCount: 0 } })
    lastTableProps = null
})

describe('OldItemDestinationStep', () => {
    it('Next disabled when no oldItemParentSystem selected', () => {
        render(<OldItemDestinationStep />)
        expect(screen.getByTestId('next')).toBeDisabled()
    })

    it('Next enabled + click calls goNext + updateFormData with parentSystemUid', () => {
        mockUseModalWizard.mockReturnValue({
            setOldItemParentSystem,
            oldItemParentSystem: { uid: 'parent-1' },
        })
        render(<OldItemDestinationStep />)
        const next = screen.getByTestId('next')
        expect(next).not.toBeDisabled()
        fireEvent.click(next)
        expect(goNext).toHaveBeenCalled()
        expect(updateFormData).toHaveBeenCalledWith({ parentSystemUid: 'parent-1' })
    })

    it('Back resets old item parent + calls goBack', () => {
        render(<OldItemDestinationStep />)
        fireEvent.click(screen.getByTestId('back'))
        expect(goBack).toHaveBeenCalled()
        expect(setOldItemParentSystem).toHaveBeenCalledWith(null)
    })

    it('row click without physicalItem sets oldItemParentSystem', () => {
        render(<OldItemDestinationStep />)
        const props = lastTableProps.getRowProps({
            original: { uid: 'r-1', systemLevel: 'KeySystems', physicalItem: null, statistics: {} },
        })
        props.onClick()
        expect(setOldItemParentSystem).toHaveBeenCalledWith(
            expect.objectContaining({ uid: 'r-1' }),
        )
    })

    it('row click with physicalItem is ignored', () => {
        render(<OldItemDestinationStep />)
        const props = lastTableProps.getRowProps({
            original: {
                uid: 'r-1',
                systemLevel: 'KeySystems',
                physicalItem: { uid: 'p-1' },
                statistics: {},
            },
        })
        props.onClick()
        expect(setOldItemParentSystem).not.toHaveBeenCalled()
    })

    it('selected row gets orange highlight className', () => {
        mockUseModalWizard.mockReturnValue({
            setOldItemParentSystem,
            oldItemParentSystem: { uid: 'r-1' },
        })
        render(<OldItemDestinationStep />)
        const props = lastTableProps.getRowProps({
            original: {
                uid: 'r-1',
                systemLevel: 'KeySystems',
                physicalItem: null,
                statistics: {},
            },
        })
        expect(props.className).toContain('bg-orange-200')
    })
})
