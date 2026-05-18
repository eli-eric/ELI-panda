import { act, fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useOrders } from '../../hooks/useOrders'
import { TableActions } from '../TableActions'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        onClick,
        children,
    }: {
        onClick?: () => void
        children: ReactNode
    }) => (
        <button type="button" onClick={onClick}>
            {children}
        </button>
    ),
}))

jest.mock('@/components/overlays/modal/warning/modal-warning.comp', () => ({
    __esModule: true,
    default: ({ open, buttons }: { open: boolean; buttons: any }) =>
        open ? (
            <div data-testid="warn-modal">
                <button onClick={buttons.goNext.onClick}>continue</button>
                <button onClick={buttons.goBack.onClick}>cancel</button>
            </div>
        ) : null,
}))

jest.mock('@/hooks/fetch/useEndpoint', () => ({
    useEndpoint: jest.fn(),
}))

jest.mock('@/hooks/fetch/useSubmit', () => ({
    useSubmit: jest.fn(),
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../hooks/useOrders', () => ({
    useOrders: jest.fn(),
}))

const mockUseEndpoint = useEndpoint as jest.Mock
const mockUseSubmit = useSubmit as jest.Mock
const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseOrders = useOrders as jest.Mock

let submit: jest.Mock
let mutate: jest.Mock
let submitOnSuccess: (() => void) | undefined

beforeEach(() => {
    jest.clearAllMocks()
    submit = jest.fn()
    mutate = jest.fn()
    mockUseEndpoint.mockReturnValue({ order: '/api/orders/1' })
    mockUseSubmit.mockImplementation(({ onSuccess }: any) => {
        submitOnSuccess = onSuccess
        return { submit, loading: false }
    })
    mockUseOrders.mockReturnValue({ mutate, orderList: [{ uid: 'o-1' }] })
    mockUsePermission.mockReturnValue(true)
})

const order = { uid: 'o-1', name: 'My Order' } as any

describe('TableActions (orders)', () => {
    it('returns null when user lacks ORDERS_EDIT', () => {
        mockUsePermission.mockReturnValue(false)
        const { container } = renderWithProviders(<TableActions order={order} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('renders dropdown trigger when canEdit', () => {
        renderWithProviders(<TableActions order={order} />)
        expect(screen.getByLabelText('Order actions')).toBeInTheDocument()
    })

    it('clicking Delete menu item opens the warning modal', () => {
        renderWithProviders(<TableActions order={order} />)
        // mocked DropdownMenuItem -> button. Click first (and only) menu button.
        const buttons = screen.getAllByRole('button')
        const deleteItem = buttons[buttons.length - 1]
        fireEvent.click(deleteItem)
        expect(screen.getByTestId('warn-modal')).toBeInTheDocument()
    })

    it('Continue click in warning modal triggers delete submit', () => {
        renderWithProviders(<TableActions order={order} />)
        fireEvent.click(screen.getAllByRole('button').slice(-1)[0]) // open
        fireEvent.click(screen.getByText('continue'))
        expect(submit).toHaveBeenCalled()
    })

    it('On submit success: closes modal + calls mutate when orderList present', () => {
        renderWithProviders(<TableActions order={order} />)
        fireEvent.click(screen.getAllByRole('button').slice(-1)[0]) // open warn modal
        act(() => {
            submitOnSuccess?.()
        })
        expect(mutate).toHaveBeenCalled()
        expect(screen.queryByTestId('warn-modal')).toBeNull()
    })
})
