import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { LeavesFilterFooter } from '../LeavesFilterFooter.comp'

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

describe('LeavesFilterFooter', () => {
    it('passes tableId + enableQueryURL to useFormFilterState', () => {
        renderWithProviders(
            <LeavesFilterFooter
                tableId="leaves"
                enableQueryURL={true}
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'leaves',
            enableQueryUrl: true,
        })
    })

    it('Clear filters click resets form to defaults and clears column filters', () => {
        const resetForm = jest.fn()
        const defaults = { a: 1 }
        renderWithProviders(
            <LeavesFilterFooter
                tableId="leaves"
                enableQueryURL={false}
                resetForm={resetForm as any}
                defaultFormValues={defaults}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(resetForm).toHaveBeenCalledWith(defaults, { keepValues: false })
        expect(setColumnFilters).toHaveBeenCalledWith([])
    })

    it('renders FilterSaveSettings + Clear button', () => {
        renderWithProviders(
            <LeavesFilterFooter
                tableId="leaves"
                enableQueryURL={false}
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(screen.getByTestId('save-settings')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
