import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { CatalogueSelectFilterFooter } from '../CatalogueSelectFilterFooter'

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

describe('CatalogueSelectFilterFooter', () => {
    it('useFormFilterState wired with tableId + enableQueryUrl=false', () => {
        renderWithProviders(
            <CatalogueSelectFilterFooter
                tableId="select-tbl"
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'select-tbl',
            enableQueryUrl: false,
        })
    })

    it('Clear filters click resets form + columnFilters', () => {
        const resetForm = jest.fn()
        renderWithProviders(
            <CatalogueSelectFilterFooter
                tableId="t"
                resetForm={resetForm as any}
                defaultFormValues={{ a: 'x' }}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(resetForm).toHaveBeenCalledWith({ a: 'x' }, { keepValues: false })
        expect(setColumnFilters).toHaveBeenCalledWith([])
    })

    it('save-settings + clear button rendered', () => {
        renderWithProviders(
            <CatalogueSelectFilterFooter
                tableId="t"
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(screen.getByTestId('save-settings')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
