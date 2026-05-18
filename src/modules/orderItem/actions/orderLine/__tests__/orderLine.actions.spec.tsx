import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import useWarningModal from '@/hooks/useWarningModal'
import { useOrderLineContext } from '@/modules/orderItem/context'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useOrderLineEditSheet } from '../../../components/orderLines/hooks/useOrderLineEditSheet'
import { ButtonsWrapperNew, OrderLineActionButtons } from '../orderLine.actions'

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

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/modules/orderItem/context', () => ({
    useOrderLineContext: jest.fn(),
}))

jest.mock('../../../components/orderLines/hooks/useOrderLineEditSheet', () => ({
    useOrderLineEditSheet: jest.fn(),
}))

const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseOrderLineContext = useOrderLineContext as unknown as jest.Mock
const mockUseOrderLineEditSheet = useOrderLineEditSheet as jest.Mock

let deleteOrderLine: jest.Mock
let setOrderLine: jest.Mock
let openEditSheet: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    deleteOrderLine = jest.fn()
    setOrderLine = jest.fn()
    openEditSheet = jest.fn()
    mockUseOrderLineContext.mockReturnValue({ deleteOrderLine, setOrderLine })
    mockUseOrderLineEditSheet.mockReturnValue({ openEditSheet })
    mockUseWarningModal.mockReturnValue(
        (cb: (line: unknown) => void) => (line: unknown) => cb(line),
    )
})

describe('ButtonsWrapperNew', () => {
    it('renders children inside absolute-positioned wrapper', () => {
        const { container } = renderWithProviders(
            <ButtonsWrapperNew>
                <span data-testid="child" />
            </ButtonsWrapperNew>,
        )
        expect(container.querySelector('[data-testid="child"]')).not.toBeNull()
        expect(container.firstChild).toHaveClass('absolute')
    })

    it('respects position prop', () => {
        const { container } = renderWithProviders(
            <ButtonsWrapperNew position="left-0">x</ButtonsWrapperNew>,
        )
        expect(container.firstChild).toHaveClass('left-0')
    })
})

describe('OrderLineActionButtons', () => {
    const line = { id: 'line-1', uid: 'l-uid', name: 'Widget' } as any

    it('Edit click invokes openEditSheet with the orderLine + setter', () => {
        renderWithProviders(<OrderLineActionButtons orderLine={line} />)
        const buttons = screen.getAllByRole('button')
        // First button is trigger, second is Edit (mocked DropdownMenuItem as button)
        fireEvent.click(buttons[1])
        expect(openEditSheet).toHaveBeenCalledWith(line, expect.any(Function))
    })

    it('Delete click invokes deleteOrderLine via warning modal', () => {
        renderWithProviders(<OrderLineActionButtons orderLine={line} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[2])
        expect(deleteOrderLine).toHaveBeenCalledWith(line)
    })

    it('Delete click is a no-op when orderLine.id missing', () => {
        renderWithProviders(
            <OrderLineActionButtons orderLine={{ uid: 'x', name: 'Y' } as any} />,
        )
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[2])
        expect(deleteOrderLine).not.toHaveBeenCalled()
    })
})
