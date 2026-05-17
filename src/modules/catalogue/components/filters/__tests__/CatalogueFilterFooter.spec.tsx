import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CatalogueFilterFooter } from '../CatalogueFilterFooter.comp'

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('@/modules/shared/filters/FilterSaveSettings', () => ({
    FilterSaveSettings: () => <div data-testid="save-settings" />,
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock

let setColumnFilters: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    setColumnFilters = jest.fn()
    mockUseFormFilterState.mockReturnValue({ setColumnFilters })
})

describe('CatalogueFilterFooter', () => {
    it('passes tableId + enableQueryURL into useFormFilterState', () => {
        renderWithProviders(
            <CatalogueFilterFooter
                tableId="catalogue"
                enableQueryURL={true}
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'catalogue',
            enableQueryUrl: true,
        })
    })

    it('Clear button resets form + clears column filters', () => {
        const resetForm = jest.fn()
        renderWithProviders(
            <CatalogueFilterFooter
                tableId="catalogue"
                enableQueryURL={false}
                resetForm={resetForm as any}
                defaultFormValues={{ x: 1 }}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(resetForm).toHaveBeenCalledWith({ x: 1 }, { keepValues: false })
        expect(setColumnFilters).toHaveBeenCalledWith([])
    })

    it('renders save-settings + clear button', () => {
        renderWithProviders(
            <CatalogueFilterFooter
                tableId="catalogue"
                enableQueryURL={false}
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(screen.getByTestId('save-settings')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
