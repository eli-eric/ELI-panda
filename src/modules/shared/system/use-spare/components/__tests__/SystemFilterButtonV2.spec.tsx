import { fireEvent, screen } from '@testing-library/react'

import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { useSystemsFilterSheetV2 } from '@/modules/systems/components/filters/hooks/useSystemsFilterSheetV2'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemFilterButtonV2 } from '../SystemFilterButtonV2'

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

jest.mock('@/modules/systems/components/filters/hooks/useSystemsFilterSheetV2', () => ({
    useSystemsFilterSheetV2: jest.fn(),
}))

const mockUseFormFilterState = useFormFilterState as jest.Mock
const mockUseSystemsFilterSheetV2 = useSystemsFilterSheetV2 as jest.Mock

let openFilterSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openFilterSheet = jest.fn()
    mockUseSystemsFilterSheetV2.mockReturnValue(openFilterSheet)
    mockUseFormFilterState.mockReturnValue({ storeFilters: [] })
})

describe('SystemFilterButtonV2', () => {
    it('tooltip "Open Filters" when no filters', () => {
        renderWithProviders(<SystemFilterButtonV2 />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Open Filters')
    })

    it('tooltip "Filters Applied" when filters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        renderWithProviders(<SystemFilterButtonV2 />)
        expect(screen.getByTestId('tt').dataset.content).toBe('Filters Applied')
    })

    it('icon gets fill-current when filters present', () => {
        mockUseFormFilterState.mockReturnValue({ storeFilters: [{ id: 'a' }] })
        const { container } = renderWithProviders(<SystemFilterButtonV2 />)
        expect(container.querySelector('svg')?.getAttribute('class')).toContain('fill-current')
    })

    it('click forwards defaults to openFilterSheet', () => {
        renderWithProviders(<SystemFilterButtonV2 />)
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'systems',
            enableQueryURL: true,
            disabledFields: undefined,
            side: 'left',
        })
    })

    it('respects custom tableId / enableQueryURL / side / disabledFields', () => {
        renderWithProviders(
            <SystemFilterButtonV2
                tableId="x"
                enableQueryURL={false}
                side="right"
                disabledFields={{ a: true }}
            />,
        )
        fireEvent.click(screen.getByRole('button'))
        expect(openFilterSheet).toHaveBeenCalledWith({
            tableId: 'x',
            enableQueryURL: false,
            disabledFields: { a: true },
            side: 'right',
        })
    })
})
