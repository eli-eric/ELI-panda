import { fireEvent, screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemTypeGroup } from '../SystemTypeGroup'

jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        children,
        onClick,
    }: {
        children: ReactNode
        onClick?: () => void
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
    default: jest.fn(() => (cb: () => void) => () => cb()),
}))

jest.mock('@tanstack/react-query', () => {
    const actual = jest.requireActual('@tanstack/react-query')
    return { ...actual, useMutation: () => ({ mutate: jest.fn(), isPending: false }) }
})

const mockUsePermission = usePermission as unknown as jest.Mock

const group = { uid: 'g-1', name: 'Pumps' } as any

beforeEach(() => {
    jest.clearAllMocks()
    mockUsePermission.mockReturnValue(true)
})

describe('SystemTypeGroup', () => {
    it('renders the group name', () => {
        renderWithProviders(
            <SystemTypeGroup
                systemTypeGroup={group}
                selectedGroup={null}
                setSelectedGroup={jest.fn()}
                refetch={jest.fn() as any}
            />,
        )
        expect(screen.getByText('Pumps')).toBeInTheDocument()
    })

    it('highlights when selected (text-primary class)', () => {
        const { container } = renderWithProviders(
            <SystemTypeGroup
                systemTypeGroup={group}
                selectedGroup="g-1"
                setSelectedGroup={jest.fn()}
                refetch={jest.fn() as any}
            />,
        )
        expect(container.firstChild).toHaveClass('text-primary')
    })

    it('row click invokes setSelectedGroup with uid', () => {
        const setSelectedGroup = jest.fn()
        const { container } = renderWithProviders(
            <SystemTypeGroup
                systemTypeGroup={group}
                selectedGroup={null}
                setSelectedGroup={setSelectedGroup}
                refetch={jest.fn() as any}
            />,
        )
        fireEvent.click(container.firstChild as Element)
        expect(setSelectedGroup).toHaveBeenCalledWith('g-1')
    })

    it('hides dropdown menu when no SYSTEM_TYPE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(
            <SystemTypeGroup
                systemTypeGroup={group}
                selectedGroup={null}
                setSelectedGroup={jest.fn()}
                refetch={jest.fn() as any}
            />,
        )
        expect(screen.queryByLabelText('Group actions')).toBeNull()
    })
})
