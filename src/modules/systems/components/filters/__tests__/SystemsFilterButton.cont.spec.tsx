import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemFilterButtonContainer } from '../SystemsFilterButton.cont'
import { useSystemsFilterSheet } from '../hooks/useSystemsFilterSheet'

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ content, children }: { content: string; children: React.ReactNode }) => (
        <div data-testid="tt" data-content={content}>
            {children}
        </div>
    ),
}))

jest.mock('@/hooks/form/useFormFilters', () => ({
    useFormFilterState: jest.fn(),
}))

jest.mock('../hooks/useSystemsFilterSheet', () => ({
    useSystemsFilterSheet: jest.fn(),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseSystemsFilterSheet = useSystemsFilterSheet as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    mockUseSystemsFilterSheet.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

describe('SystemFilterButtonContainer', () => {
    it('tooltip Open Filters when no filters', () => {
        renderWithProviders(<SystemFilterButtonContainer />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Open Filters')
    })

    it('tooltip Filters Applied when filters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        renderWithProviders(<SystemFilterButtonContainer />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Filters Applied')
    })

    it('click forwards default args to openFilterSheet', () => {
        renderWithProviders(<SystemFilterButtonContainer />)
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'systems',
            enableQueryURL: true,
            disabledFields: undefined,
            side: 'left',
        })
    })

    it('legacy panelSlide=right still maps to side=left (default)', () => {
        renderWithProviders(
            <SystemFilterButtonContainer panelSlide="right" />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet.mock.calls[0][0].side).toBe('left')
    })

    it('new "side" prop wins over legacy fallback', () => {
        renderWithProviders(<SystemFilterButtonContainer side="right" />)
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet.mock.calls[0][0].side).toBe('right')
    })
})
