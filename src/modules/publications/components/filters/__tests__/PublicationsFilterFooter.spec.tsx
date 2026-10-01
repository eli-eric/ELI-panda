import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { PublicationsFilterFooter } from '../PublicationsFilterFooter.comp'

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

describe('PublicationsFilterFooter', () => {
    it('offers saved filter settings', () => {
        renderWithProviders(
            <PublicationsFilterFooter
                tableId="publications"
                enableQueryURL
                resetForm={jest.fn()}
                defaultFormValues={{}}
            />,
        )

        expect(screen.getByTestId('save-settings')).toBeInTheDocument()
    })

    it('clearing resets the form and empties the applied filters', () => {
        const resetForm = jest.fn()
        const defaultFormValues = { title: '', mediaType: [] }

        renderWithProviders(
            <PublicationsFilterFooter
                tableId="publications"
                enableQueryURL
                resetForm={resetForm}
                defaultFormValues={defaultFormValues}
            />,
        )

        fireEvent.click(screen.getByRole('button', { name: /clear/i }))

        // Both halves matter: the form fields and the state driving the query.
        expect(resetForm).toHaveBeenCalledWith(defaultFormValues, { keepValues: false })
        expect(setColumnFilters).toHaveBeenCalledWith([])
    })
})
