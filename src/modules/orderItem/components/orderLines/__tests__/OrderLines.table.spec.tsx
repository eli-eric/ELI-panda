import { fireEvent, render, screen } from '@testing-library/react'

import { useOrderLineContext } from '../../../context'
import { useOrderLineModal } from '../form/OrderLineForm.cont'
import OrderLinesTable from '../OrderLines.table'

jest.mock('../../../context', () => ({
    useOrderLineContext: jest.fn(),
}))

jest.mock('../components/OrderLines.columns', () => ({
    __esModule: true,
    default: jest.fn(() => []),
}))

jest.mock('../form/OrderLineForm.cont', () => ({
    useOrderLineModal: jest.fn(),
}))

jest.mock('@/components/Buttons', () => ({
    PlusButton: ({ onClick }: { onClick?: () => void }) => (
        <button data-testid="plus" onClick={onClick}>
            +
        </button>
    ),
}))

jest.mock('@/components/Tooltip', () => ({
    Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

jest.mock('@/components/ui/table/table', () => ({
    Table: ({ data }: { data: unknown[] }) => (
        <div data-testid="table" data-count={data.length} />
    ),
}))

jest.mock('@/components/layout/Heading', () => ({
    Heading: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}))

const mockUseOrderLineContext = useOrderLineContext as unknown as jest.Mock
const mockUseOrderLineModal = useOrderLineModal as jest.Mock

let openOrderLineModal: jest.Mock
let setOrderLine: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openOrderLineModal = jest.fn()
    setOrderLine = jest.fn()
    mockUseOrderLineModal.mockReturnValue({ openOrderLineModal })
    mockUseOrderLineContext.mockReturnValue({ setOrderLine, fields: [] })
})

describe('OrderLinesTable', () => {
    it('hides Plus button when disabledEdit', () => {
        render(<OrderLinesTable disabledEdit />)
        expect(screen.queryByTestId('plus')).toBeNull()
    })

    it('shows Plus button when not disabled', () => {
        render(<OrderLinesTable />)
        expect(screen.getByTestId('plus')).toBeInTheDocument()
    })

    it('Plus click opens order-line modal', () => {
        render(<OrderLinesTable />)
        fireEvent.click(screen.getByTestId('plus'))
        expect(openOrderLineModal).toHaveBeenCalledTimes(1)
    })

    it('callback on modal resolution forwards to setOrderLine', () => {
        render(<OrderLinesTable />)
        fireEvent.click(screen.getByTestId('plus'))
        const cb = openOrderLineModal.mock.calls[0][0]
        cb({ uid: 'ol-1' })
        expect(setOrderLine).toHaveBeenCalledWith({ uid: 'ol-1' })
    })

    it('passes order-line fields into Table', () => {
        mockUseOrderLineContext.mockReturnValue({
            setOrderLine,
            fields: [{ uid: '1' }, { uid: '2' }],
        })
        render(<OrderLinesTable />)
        expect(screen.getByTestId('table').dataset.count).toBe('2')
    })
})
