import { fireEvent, render, screen } from '@testing-library/react'

import { useSystemCreateSheet } from '@/modules/shared/system/system-create/useSystemCreateSheet'

import { SearchBarButtons } from '../SearchBarButtons'

jest.mock('@/modules/shared/system/system-create/useSystemCreateSheet', () => ({
    useSystemCreateSheet: jest.fn(),
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

const mockUseSystemCreateSheet = useSystemCreateSheet as unknown as jest.Mock

let openCreateSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openCreateSheet = jest.fn()
    mockUseSystemCreateSheet.mockReturnValue(openCreateSheet)
})

describe('SearchBarButtons (systems)', () => {
    it('passes SYSTEM_EDIT role + renders filter button + CSV export', () => {
        render(<SearchBarButtons />)
        expect(screen.getByTestId('bar').dataset.role).toBe('systems-edit')
        expect(screen.getByTestId('filter-btn')).toBeInTheDocument()
        expect(screen.getByTestId('csv')).toBeInTheDocument()
    })

    it('Add click invokes openCreateSheet', () => {
        render(<SearchBarButtons />)
        fireEvent.click(screen.getByTestId('add'))
        expect(openCreateSheet).toHaveBeenCalled()
    })

    it('Refresh button rendered (handler currently a no-op TODO)', () => {
        render(<SearchBarButtons />)
        expect(screen.getByTestId('refresh')).toBeInTheDocument()
        // Click should not throw
        expect(() => fireEvent.click(screen.getByTestId('refresh'))).not.toThrow()
    })
})
