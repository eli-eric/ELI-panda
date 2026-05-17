import { fireEvent, render, screen } from '@testing-library/react'

import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'

import { useUserDelete } from '../../hooks/useUserDelete'
import { UserNameCell } from '../UserNameCell'

jest.mock('@/components/Buttons', () => ({
    TableActionsButtons: ({
        onDeleteClick,
        canEdit,
    }: {
        onDeleteClick?: () => void
        canEdit?: boolean
    }) =>
        canEdit ? (
            <button data-testid="delete-btn" onClick={onDeleteClick}>
                delete
            </button>
        ) : null,
}))

jest.mock('@/components/decorators', () => ({
    LinkDecorator: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

jest.mock('@/hooks/usePermission', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('../../hooks/useUserDelete', () => ({
    useUserDelete: jest.fn(),
}))

const mockUsePermission = usePermission as unknown as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseUserDelete = useUserDelete as jest.Mock

let deleteUser: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    deleteUser = jest.fn()
    mockUseUserDelete.mockReturnValue([deleteUser])
    mockUseWarningModal.mockReturnValue((cb: () => void) => () => cb())
    mockUsePermission.mockReturnValue(true)
})

const cellProps = (value: string, original: any) => ({
    getValue: () => value,
    row: { original } as any,
}) as any

describe('UserNameCell', () => {
    it('renders link to ADMIN_USER/:uid wrapping the value', () => {
        render(
            <UserNameCell
                {...cellProps('jdoe', {
                    uid: 'u-1',
                    firstName: 'J',
                    lastName: 'Doe',
                    username: 'jdoe',
                })}
            />,
        )
        const link = screen.getByText('jdoe').closest('a')
        expect(link).toHaveAttribute('href', '/administration/user/u-1')
    })

    it('hides delete button when not admin', () => {
        mockUsePermission.mockReturnValue(false)
        render(<UserNameCell {...cellProps('x', { uid: 'u', firstName: 'A', lastName: 'B' })} />)
        expect(screen.queryByTestId('delete-btn')).toBeNull()
    })

    it('clicking delete invokes warning-wrapped deleteUser with uid', () => {
        render(
            <UserNameCell
                {...cellProps('x', {
                    uid: 'u-42',
                    firstName: 'A',
                    lastName: 'B',
                    username: 'ab',
                })}
            />,
        )
        fireEvent.click(screen.getByTestId('delete-btn'))
        expect(deleteUser).toHaveBeenCalledWith({ where: { uid: 'u-42' } })
    })

    it('passes username into useUserDelete', () => {
        render(<UserNameCell {...cellProps('x', { uid: 'u', username: 'jdoe' })} />)
        expect(mockUseUserDelete).toHaveBeenCalledWith('jdoe')
    })
})
