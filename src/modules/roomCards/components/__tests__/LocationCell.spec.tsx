import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useRoomCardDelete } from '../../hooks/useRoomCardDelete'
import { LocationCell } from '../LocationCell'

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

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../hooks/useRoomCardDelete', () => ({
    useRoomCardDelete: jest.fn(),
}))

const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseRoomCardDelete = useRoomCardDelete as jest.Mock

let deleteRoomCard: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    deleteRoomCard = jest.fn()
    mockUseRoomCardDelete.mockReturnValue({ deleteRoomCard })
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
    mockUsePermission.mockReturnValue(true)
})

const cellProps = (name = 'Lab A', uid = 'rc-1') =>
    ({
        getValue: () => name,
        row: { original: { uid, name } } as any,
    }) as any

describe('LocationCell', () => {
    it('renders the cell value inside a link to /room-card/:uid', () => {
        renderWithProviders(<LocationCell {...cellProps('Lab A', 'rc-99')} />)
        const link = screen.getByText('Lab A').closest('a')
        expect(link).toHaveAttribute('href', '/room-card/rc-99')
    })

    it('hides delete dropdown when permission denied', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(<LocationCell {...cellProps()} />)
        expect(screen.queryByRole('button')).toBeNull()
    })

    it('shows delete dropdown when permission granted', () => {
        renderWithProviders(<LocationCell {...cellProps()} />)
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('passes uid + name to useRoomCardDelete', () => {
        renderWithProviders(<LocationCell {...cellProps('My Room', 'rc-42')} />)
        expect(mockUseRoomCardDelete).toHaveBeenCalledWith('rc-42', 'My Room')
    })

    it('clicking Remove invokes warning-wrapped delete', () => {
        renderWithProviders(<LocationCell {...cellProps()} />)
        const buttons = screen.getAllByRole('button')
        // mocked DropdownMenuItem rendered as a button; click the Remove item (last button)
        fireEvent.click(buttons[buttons.length - 1])
        expect(deleteRoomCard).toHaveBeenCalled()
    })
})
