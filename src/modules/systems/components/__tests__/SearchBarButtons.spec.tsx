import { fireEvent, render, screen } from '@testing-library/react'

import { useCreateSystemFromOverview } from '@/modules/systems/hooks/useCreateSystemFromOverview'

import { SearchBarButtons } from '../SearchBarButtons'

jest.mock('@/modules/systems/hooks/useCreateSystemFromOverview', () => ({
    useCreateSystemFromOverview: jest.fn(),
}))

jest.mock('@/modules/shared/table/SearchBar', () => ({
    SearchBarButtonsComponent: ({
        handleAdd,
        handleRefresh,
        editRole,
        children,
    }: {
        handleAdd: () => void
        handleRefresh: () => void
        editRole: string
        children?: React.ReactNode
    }) => (
        <div data-testid="bar" data-role={editRole}>
            <button data-testid="add" onClick={handleAdd}>
                add
            </button>
            <button data-testid="refresh" onClick={handleRefresh}>
                refresh
            </button>
            {children}
        </div>
    ),
}))

jest.mock('../ExportCsvButton', () => ({
    ExportCsvButton: () => <div data-testid="csv" />,
}))

jest.mock('../filters/SystemsFilterButton.cont', () => ({
    SystemFilterButtonContainer: () => <div data-testid="filter-btn" />,
}))

const mockUseCreateSystemFromOverview = useCreateSystemFromOverview as unknown as jest.Mock

let openCreateSystem: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openCreateSystem = jest.fn()
    mockUseCreateSystemFromOverview.mockReturnValue(openCreateSystem)
})

describe('SearchBarButtons (systems)', () => {
    it('passes SYSTEM_EDIT role + renders filter button + CSV export', () => {
        render(<SearchBarButtons />)
        expect(screen.getByTestId('bar').dataset.role).toBe('systems-edit')
        expect(screen.getByTestId('filter-btn')).toBeInTheDocument()
        expect(screen.getByTestId('csv')).toBeInTheDocument()
    })

    it('Add click invokes openCreateSystem', () => {
        render(<SearchBarButtons />)
        fireEvent.click(screen.getByTestId('add'))
        expect(openCreateSystem).toHaveBeenCalledWith()
    })

    it('Refresh button rendered (handler currently a no-op TODO)', () => {
        render(<SearchBarButtons />)
        expect(screen.getByTestId('refresh')).toBeInTheDocument()
        // Click should not throw
        expect(() => fireEvent.click(screen.getByTestId('refresh'))).not.toThrow()
    })
})
