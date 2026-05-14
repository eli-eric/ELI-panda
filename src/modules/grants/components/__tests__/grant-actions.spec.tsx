import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import { useAccessControl } from '@/hooks/useAccessControl'
import useWarningModal from '@/hooks/useWarningModal'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { useGrantDelete } from '../../hooks/useGrantDelete'
import { GrantActionsCell } from '../grant-actions.comp'

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

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: jest.fn(),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: jest.fn(),
}))

jest.mock('../../hooks/useGrantDelete', () => ({
    useGrantDelete: jest.fn(),
}))

const mockUseAccessControl = useAccessControl as jest.Mock
const mockUseWarningModal = useWarningModal as unknown as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock
const mockUseGrantDelete = useGrantDelete as jest.Mock

let openModal: jest.Mock
let deleteGrant: jest.Mock
let warningWrap: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn()
    deleteGrant = jest.fn()
    warningWrap = jest.fn((cb: () => void) => () => cb())
    mockUseAccessControl.mockReturnValue(() => true)
    mockUseDynamicModalStore.mockReturnValue({ openModal })
    mockUseGrantDelete.mockReturnValue(deleteGrant)
    mockUseWarningModal.mockReturnValue(warningWrap)
})

const props = (name = 'My Grant', uid = 'g-1') => ({
    getValue: () => name,
    row: { original: { uid } } as any,
}) as any

describe('GrantActionsCell', () => {
    it('renders grant name', () => {
        renderWithProviders(<GrantActionsCell {...props('Hello')} />)
        expect(screen.getByText('Hello')).toBeInTheDocument()
    })

    it('shows actions dropdown trigger when canEdit', () => {
        renderWithProviders(<GrantActionsCell {...props()} />)
        expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('hides dropdown trigger when permission denied', () => {
        mockUseAccessControl.mockReturnValue(() => false)
        renderWithProviders(<GrantActionsCell {...props()} />)
        expect(screen.queryByRole('button')).toBeNull()
    })

    it('clicking Edit opens sheet via dynamic modal store', () => {
        renderWithProviders(<GrantActionsCell {...props('G', 'g-42')} />)
        // dropdown items rendered as buttons (mocked); index 1 = Edit, 2 = Delete
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[1])
        expect(openModal).toHaveBeenCalledWith(
            'sheet',
            expect.objectContaining({
                id: 'grant-edit-g-42',
                props: expect.objectContaining({ uid: 'g-42' }),
            }),
        )
    })

    it('clicking Delete invokes warning-modal-wrapped delete callback', () => {
        renderWithProviders(<GrantActionsCell {...props()} />)
        const buttons = screen.getAllByRole('button')
        fireEvent.click(buttons[2])
        expect(warningWrap).toHaveBeenCalled()
        expect(deleteGrant).toHaveBeenCalled()
    })
})
