import { fireEvent, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useMoveWizardSubmit } from '../../hooks/useMoveWizardSubmit'
import { SummaryStep } from '../Summary.step'

jest.mock('../../hooks/useMoveWizardSubmit', () => ({
    useMoveWizardSubmit: jest.fn(),
}))

jest.mock('../components/SymmaryListParam.comp', () => ({
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
        formData: {
            name: 'Sys-1',
            system: { systemCode: 'SC-1', zone: { name: 'Z-1' } },
            location: { name: 'L-1' },
            itemUsage: { name: 'Usage-1' },
            conditionStatus: { name: 'Good' },
        },
        physicalItem: { serialNumber: 'SN-1', eun: 'E-1' },
        catalogueItem: { catalogueNumber: 'CN-1' },
        isMovingToNewSystem: false,
        updateFormData,
        oldItemParentSystem: null,
    })
})

describe('SummaryStep', () => {
    it('renders destination system + moving item params', () => {
        renderWithProviders(<SummaryStep />)
        expect(screen.getByTestId('param-System Name').dataset.value).toBe('Sys-1')
        expect(screen.getByTestId('param-Code').dataset.value).toBe('SC-1')
        expect(screen.getByTestId('param-Zone').dataset.value).toBe('Z-1')
        expect(screen.getByTestId('param-Location').dataset.value).toBe('L-1')
        expect(screen.getByTestId('param-Usage').dataset.value).toBe('Usage-1')
        expect(screen.getByTestId('param-Serial Number').dataset.value).toBe('SN-1')
        expect(screen.getByTestId('param-Eun').dataset.value).toBe('E-1')
        expect(screen.getByTestId('param-Part Number').dataset.value).toBe('CN-1')
    })

    it('renders "New System" header when isMovingToNewSystem', () => {
        mockUseMoveWizardSubmit.mockReturnValue({
            submitWizard,
            isPending: false,
            goBack,
            formData: { name: 'X' },
            physicalItem: null,
            catalogueItem: null,
            isMovingToNewSystem: true,
            updateFormData,
            oldItemParentSystem: null,
        })
        renderWithProviders(<SummaryStep />)
        expect(screen.getByText(/New System/)).toBeInTheDocument()
    })

    it('renders 3rd column when oldItemParentSystem present', () => {
        mockUseMoveWizardSubmit.mockReturnValue({
            submitWizard,
            isPending: false,
            goBack,
            formData: { name: 'X' },
            physicalItem: null,
            catalogueItem: null,
            isMovingToNewSystem: false,
            updateFormData,
            oldItemParentSystem: {
                name: 'Old Sys',
                systemCode: 'OC-1',
                zone: { name: 'OZ' },
                location: { name: 'OL' },
            },
        })
        renderWithProviders(<SummaryStep />)
        // 'System Name' appears twice now (destination + old item parent)
        expect(screen.getAllByTestId('param-System Name').length).toBe(2)
    })

    it('Next button calls submitWizard', () => {
        renderWithProviders(<SummaryStep />)
        fireEvent.click(screen.getByTestId('next'))
        expect(submitWizard).toHaveBeenCalled()
    })

    it('Back button calls goBack', () => {
        renderWithProviders(<SummaryStep />)
        fireEvent.click(screen.getByTestId('back'))
        expect(goBack).toHaveBeenCalled()
    })

    it('Delete-source checkbox calls updateFormData', () => {
        renderWithProviders(<SummaryStep />)
        fireEvent.click(screen.getByTestId('delete-checkbox'))
        expect(updateFormData).toHaveBeenCalledWith({ deleteSourceSystem: true })
    })
})
