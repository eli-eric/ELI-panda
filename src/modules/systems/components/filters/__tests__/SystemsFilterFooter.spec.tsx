import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemsFilterFooter } from '../SystemsFilterFooter.comp'

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

describe('SystemsFilterFooter', () => {
    it('passes tableId + enableQueryURL into useFormFilterState', () => {
        renderWithProviders(
            <SystemsFilterFooter
                tableId="systems"
                enableQueryURL={true}
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(mockUseFormFilterState).toHaveBeenCalledWith({
            tableId: 'systems',
            enableQueryUrl: true,
        })
    })

    it('Clear button click resets form + clears column filters', () => {
        const resetForm = jest.fn()
        const defaults = { name: '' }
        renderWithProviders(
            <SystemsFilterFooter
                tableId="systems"
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
            <SystemsFilterFooter
                tableId="systems"
                enableQueryURL={false}
                resetForm={jest.fn() as any}
                defaultFormValues={{}}
            />,
        )
        expect(screen.getByTestId('save-settings')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
