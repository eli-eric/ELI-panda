import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { UseItemCreateDialog } from '@/modules/shared/catalogue/create/use-item-create.dialog'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { OrderLineStep1Catalogue } from '../order-line-step1-catalogue'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('@/modules/shared/catalogue/create/use-item-create.dialog', () => ({
    UseItemCreateDialog: jest.fn(),
}))

let lastSelectProps: any = null
jest.mock('@/modules/shared/catalogue/select/CatalogueItemSelect', () => ({
    CatalogueItemSelect: (props: any) => {
        lastSelectProps = props
        return (
            <div data-testid="cat-select">
                {props.right}
            </div>
        )
    },
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseItemCreateDialog = UseItemCreateDialog as jest.Mock

let setColumnFilters: jest.Mock
let openCreateDialog: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setColumnFilters = jest.fn()
    openCreateDialog = jest.fn()
    mockUseFormFilterState.mockReturnValue({ setColumnFilters })
    mockUseItemCreateDialog.mockReturnValue(openCreateDialog)
    lastSelectProps = null
})

describe('OrderLineStep1Catalogue', () => {
    it('Next button is disabled when no item selected', () => {
        renderWithProviders(
            <OrderLineStep1Catalogue handleNext={jest.fn()} isProcessing={false} />,
            { withForm: true },
        )
        const nextBtn = screen.getAllByRole('button').slice(-1)[0]
        expect(nextBtn).toBeDisabled()
    })

    it('Next button is enabled when _selectedCatalogueItem present in form', () => {
        renderWithProviders(
            <OrderLineStep1Catalogue handleNext={jest.fn()} isProcessing={false} />,
            {
                withForm: true,
                formProps: {
                    defaultValues: { _selectedCatalogueItem: { uid: 'c-1', name: 'X' } },
                },
            },
        )
        const nextBtn = screen.getAllByRole('button').slice(-1)[0]
        expect(nextBtn).not.toBeDisabled()
    })

    it('Next click calls handleNext', () => {
        const handleNext = jest.fn()
        renderWithProviders(
            <OrderLineStep1Catalogue handleNext={handleNext} isProcessing={false} />,
            {
                withForm: true,
                formProps: {
                    defaultValues: { _selectedCatalogueItem: { uid: 'c-1', name: 'X' } },
                },
            },
        )
        fireEvent.click(screen.getAllByRole('button').slice(-1)[0])
        expect(handleNext).toHaveBeenCalledTimes(1)
    })

    it('Create button opens create dialog', () => {
        renderWithProviders(
            <OrderLineStep1Catalogue handleNext={jest.fn()} isProcessing={false} />,
            { withForm: true },
        )
        // Click the create button (first button — rendered in right slot)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[0])
        expect(openCreateDialog).toHaveBeenCalledTimes(1)
    })

    it('Next disabled while isProcessing', () => {
        renderWithProviders(
            <OrderLineStep1Catalogue handleNext={jest.fn()} isProcessing={true} />,
            {
                withForm: true,
                formProps: {
                    defaultValues: { _selectedCatalogueItem: { uid: 'c-1', name: 'X' } },
                },
            },
        )
        const nextBtn = screen.getAllByRole('button').slice(-1)[0]
        expect(nextBtn).toBeDisabled()
    })

    it('passes pageSizeDefault=10 + tableId to CatalogueItemSelect', () => {
        renderWithProviders(
            <OrderLineStep1Catalogue handleNext={jest.fn()} isProcessing={false} />,
            { withForm: true },
        )
        expect(lastSelectProps.pageSizeDefault).toBe(10)
        expect(lastSelectProps.tableId).toBeDefined()
    })
})
