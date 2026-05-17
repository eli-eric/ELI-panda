import { fireEvent, render, screen } from '@testing-library/react'

import { useSystems } from '@/modules/systems/hooks/useSystems'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useModalWizardStore } from '../../../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../../../wizard/store/useWizardStore'
import { SelectItemStep } from '../select-item.step'

jest.mock('../../../itemMoving/store/useModalWizardStore', () => ({
    useModalWizardStore: jest.fn(),
}))

jest.mock('../../../wizard/store/useWizardStore', () => ({
    useWizardStore: jest.fn(),
}))

jest.mock('@/modules/systems/hooks/useSystems', () => ({
    useSystems: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock(
    '../../../itemMoving/steps/system-selection/SystemSelect.columns',
    () => ({ useDestinationColumns: () => [] }),
)

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
    PaginationV2: () => <div data-testid="pagination" />,
}))

jest.mock('@/modules/shared/table/SearchBar', () => ({
    SearchBar: () => <div data-testid="search-bar" />,
}))

jest.mock('../../../itemMoving/steps/system-selection/filter/FilterButton', () => ({
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
            <button data-testid="close" onClick={buttons.goBack.onClick}>
                close
            </button>
        </div>
    ),
}))

const mockUseModalWizard = useModalWizardStore as unknown as jest.Mock
const mockUseWizard = useWizardStore as unknown as jest.Mock
const mockUseSystems = useSystems as jest.Mock
const mockUseDynamic = useDynamicModalStore as unknown as jest.Mock

let setSelectedSystem: jest.Mock
let goNext: jest.Mock
let updateFormData: jest.Mock
let closeModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setSelectedSystem = jest.fn()
    goNext = jest.fn()
    updateFormData = jest.fn()
    closeModal = jest.fn()
    mockUseModalWizard.mockReturnValue({ setSelectedSystem, selectedSystem: null })
    mockUseWizard.mockReturnValue({ goNext, updateFormData })
    mockUseSystems.mockReturnValue({ systems: { data: [], totalCount: 0 } })
    mockUseDynamic.mockReturnValue({ closeModal })
    lastTableProps = null
})

describe('SelectItemStep', () => {
    it('Next disabled when no selectedSystem', () => {
        render(<SelectItemStep />)
        expect(screen.getByTestId('next')).toBeDisabled()
    })

    it('Next click forwards sourceSystemUid to wizard formData', () => {
        mockUseModalWizard.mockReturnValue({
            setSelectedSystem,
            selectedSystem: { uid: 's-1' },
        })
        render(<SelectItemStep />)
        fireEvent.click(screen.getByTestId('next'))
        expect(updateFormData).toHaveBeenCalledWith({ sourceSystemUid: 's-1' })
        expect(goNext).toHaveBeenCalled()
    })

    it('Close clears selectedSystem + closes item-assign modal', () => {
        render(<SelectItemStep />)
        fireEvent.click(screen.getByTestId('close'))
        expect(setSelectedSystem).toHaveBeenCalledWith(null)
        expect(closeModal).toHaveBeenCalledWith('item-assign')
    })

    it('row click with physicalItem sets selectedSystem (assign-only flow)', () => {
        render(<SelectItemStep />)
        const props = lastTableProps.getRowProps({
            original: {
                uid: 'r-1',
                physicalItem: { uid: 'p-1' },
                statistics: {},
            },
        })
        props.onClick()
        expect(setSelectedSystem).toHaveBeenCalledWith(
            expect.objectContaining({ uid: 'r-1' }),
        )
    })

    it('row click without physicalItem is ignored', () => {
        render(<SelectItemStep />)
        const props = lastTableProps.getRowProps({
            original: {
                uid: 'r-2',
                physicalItem: null,
                statistics: {},
            },
        })
        props.onClick()
        expect(setSelectedSystem).not.toHaveBeenCalled()
    })
})
