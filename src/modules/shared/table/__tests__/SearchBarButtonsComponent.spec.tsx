import { fireEvent, render, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'

import { SearchBarButtonsComponent } from '../SearchBar'

jest.mock('@/components/Buttons', () => ({
    PlusButton: ({ onClick }: { onClick?: () => void }) => (
        <button data-testid="plus" onClick={onClick}>
            +
        </button>
    ),
    RefreshButton: ({ onClick }: { onClick?: () => void }) => (
        <button data-testid="refresh" onClick={onClick}>
            ⟳
        </button>
    ),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

const mockUsePermission = usePermission as unknown as jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
})

describe('SearchBarButtonsComponent', () => {
    it('always renders Refresh button', () => {
        mockUsePermission.mockReturnValue(false)
        render(
            <SearchBarButtonsComponent
                editRole={'X' as any}
                handleAdd={jest.fn()}
                handleRefresh={jest.fn()}
            />,
        )
        expect(screen.getByTestId('refresh')).toBeInTheDocument()
    })

    it('hides Plus button when no edit permission', () => {
        mockUsePermission.mockReturnValue(false)
        render(
            <SearchBarButtonsComponent
                editRole={'X' as any}
                handleAdd={jest.fn()}
                handleRefresh={jest.fn()}
            />,
        )
        expect(screen.queryByTestId('plus')).toBeNull()
    })

    it('shows Plus button when has permission', () => {
        mockUsePermission.mockReturnValue(true)
        render(
            <SearchBarButtonsComponent
                editRole={'X' as any}
                handleAdd={jest.fn()}
                handleRefresh={jest.fn()}
            />,
        )
        expect(screen.getByTestId('plus')).toBeInTheDocument()
    })

    it('Refresh click invokes handleRefresh', () => {
        const handleRefresh = jest.fn()
        mockUsePermission.mockReturnValue(true)
        render(
            <SearchBarButtonsComponent
                editRole={'X' as any}
                handleAdd={jest.fn()}
                handleRefresh={handleRefresh}
            />,
        )
        fireEvent.click(screen.getByTestId('refresh'))
        expect(handleRefresh).toHaveBeenCalled()
    })

    it('Plus click invokes handleAdd', () => {
        const handleAdd = jest.fn()
        mockUsePermission.mockReturnValue(true)
        render(
            <SearchBarButtonsComponent
                editRole={'X' as any}
                handleAdd={handleAdd}
                handleRefresh={jest.fn()}
            />,
        )
        fireEvent.click(screen.getByTestId('plus'))
        expect(handleAdd).toHaveBeenCalled()
    })

    it('renders children after the action buttons', () => {
        mockUsePermission.mockReturnValue(true)
        render(
            <SearchBarButtonsComponent
                editRole={'X' as any}
                handleAdd={jest.fn()}
                handleRefresh={jest.fn()}
            >
                <span data-testid="child">extra</span>
            </SearchBarButtonsComponent>,
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })
})
