import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useMoveWizardSubmit } from '../../../itemMoving/hooks/useMoveWizardSubmit'
import { ItemAssignSummaryStep } from '../item-assign-summary.step'

jest.mock('../../../itemMoving/hooks/useMoveWizardSubmit', () => ({
    useMoveWizardSubmit: jest.fn(),
}))

jest.mock('../../../itemMoving/steps/components/SymmaryListParam.comp', () => ({
    SummaryListParam: ({ name, value }: { name: string; value?: string }) => (
        <li data-testid={`param-${name}`} data-value={value ?? ''} />
    ),
}))

jest.mock('@/components/layout/Card', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

jest.mock('@/components/overlays/modal/modal.buttons', () => ({
    __esModule: true,
    default: ({ buttons }: { buttons: any }) => (
        <div>
            <button data-testid="next" onClick={buttons.goNext.onClick}>
                next
            </button>
            <button data-testid="back" onClick={buttons.goBack.onClick}>
                back
            </button>
        </div>
    ),
}))

jest.mock('@/components/ui/checkbox', () => ({
    CheckboxWithLabel: ({ onChange }: { onChange: (v: boolean) => void }) => (
        <input
            type="checkbox"
            data-testid="delete-checkbox"
            onChange={e => onChange((e.target as HTMLInputElement).checked)}
        />
    ),
}))

const mockUseMoveWizardSubmit = useMoveWizardSubmit as jest.Mock

let submitWizard: jest.Mock
let goBack: jest.Mock
let updateFormData: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    submitWizard = jest.fn()
    goBack = jest.fn()
    updateFormData = jest.fn()
    mockUseMoveWizardSubmit.mockReturnValue({
        submitWizard,
        isPending: false,
        goBack,
        formData: {},
        updateFormData,
        selectedSystem: {
            uid: 's-1',
            name: 'My System',
            systemCode: 'SC-1',
            zone: { name: 'Z-1' },
            location: { name: 'L-1' },
            physicalItem: {
                itemUsage: { name: 'Usage-X' },
                serialNumber: 'SN-1',
                eun: 'E-1',
                conditionStatus: { name: 'Good' },
                catalogueItem: { catalogueNumber: 'CN-1' },
            },
        },
    })
})

describe('ItemAssignSummaryStep', () => {
    it('renders source system + assigning item summary', () => {
        renderWithProviders(<ItemAssignSummaryStep />)
        expect(screen.getByTestId('param-Name').dataset.value).toBe('My System')
        expect(screen.getByTestId('param-Code').dataset.value).toBe('SC-1')
        expect(screen.getByTestId('param-Zone').dataset.value).toBe('Z-1')
        expect(screen.getByTestId('param-Location').dataset.value).toBe('L-1')
        expect(screen.getByTestId('param-Usage').dataset.value).toBe('Usage-X')
        expect(screen.getByTestId('param-Serial Number').dataset.value).toBe('SN-1')
        expect(screen.getByTestId('param-Eun').dataset.value).toBe('E-1')
        expect(screen.getByTestId('param-Condition Status').dataset.value).toBe('Good')
        expect(screen.getByTestId('param-Part Number').dataset.value).toBe('CN-1')
    })

    it('Next button calls submitWizard', () => {
        renderWithProviders(<ItemAssignSummaryStep />)
        fireEvent.click(screen.getByTestId('next'))
        expect(submitWizard).toHaveBeenCalled()
    })

    it('Back button calls goBack', () => {
        renderWithProviders(<ItemAssignSummaryStep />)
        fireEvent.click(screen.getByTestId('back'))
        expect(goBack).toHaveBeenCalled()
    })

    it('Delete-source checkbox calls updateFormData', () => {
        renderWithProviders(<ItemAssignSummaryStep />)
        fireEvent.click(screen.getByTestId('delete-checkbox'))
        expect(updateFormData).toHaveBeenCalledWith({ deleteSourceSystem: true })
    })

    it('handles missing physicalItem gracefully', () => {
        mockUseMoveWizardSubmit.mockReturnValue({
            submitWizard,
            isPending: false,
            goBack,
            formData: {},
            updateFormData,
            selectedSystem: { uid: 's-1', name: 'N' },
        })
        renderWithProviders(<ItemAssignSummaryStep />)
        expect(screen.getByTestId('param-Name').dataset.value).toBe('N')
        expect(screen.getByTestId('param-Usage').dataset.value).toBe('')
    })
})
