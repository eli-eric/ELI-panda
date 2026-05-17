import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useOrders } from '../../hooks/useOrders'
import { HeaderButtons } from '../HeaderButtons'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('../../hooks/useOrders', () => ({
    useOrders: jest.fn(),
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
        <div data-testid="search-bar" data-role={editRole}>
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

jest.mock('../filters/OrderFilterButton.cont', () => ({
    OrderFilterButton: () => <div data-testid="filter-btn" />,
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseOrders = useOrders as jest.Mock

let push: jest.Mock
let mutate: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    push = jest.fn()
    mutate = jest.fn()
    mockUseRouter.mockReturnValue({ push })
    mockUseOrders.mockReturnValue({ mutate })
})

describe('HeaderButtons (orders)', () => {
    it('renders search-bar wrapper + filter button', () => {
        render(<HeaderButtons />)
        expect(screen.getByTestId('search-bar')).toBeInTheDocument()
        expect(screen.getByTestId('filter-btn')).toBeInTheDocument()
    })

    it('passes ORDERS_EDIT role to SearchBarButtonsComponent', () => {
        render(<HeaderButtons />)
        expect(screen.getByTestId('search-bar').dataset.role).toBe('orders-edit')
    })

    it('Add click pushes to PATH.ORDER', () => {
        render(<HeaderButtons />)
        fireEvent.click(screen.getByTestId('add'))
        expect(push).toHaveBeenCalledWith('/order')
    })

    it('Refresh click invokes mutate', () => {
        render(<HeaderButtons />)
        fireEvent.click(screen.getByTestId('refresh'))
        expect(mutate).toHaveBeenCalled()
    })
})
