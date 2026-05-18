import { screen } from '@testing-library/react'
import type { ReactNode } from 'react'

import usePermission from '@/hooks/usePermission'
import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { SystemTypeItem } from '../SystemTypeItem'

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

const baseType = { uid: 't-1', name: 'Pump', code: 'PMP' } as any

beforeEach(() => {
    jest.clearAllMocks()
    mockUsePermission.mockReturnValue(true)
})

describe('SystemTypeItem', () => {
    it('renders systemType name + code', () => {
        renderWithProviders(
            <SystemTypeItem systemType={baseType} refetch={jest.fn() as any} groupUid="g-1" />,
        )
        expect(screen.getByText('Pump')).toBeInTheDocument()
        expect(screen.getByText('PMP')).toBeInTheDocument()
    })

    it('omits code line when code missing', () => {
        renderWithProviders(
            <SystemTypeItem
                systemType={{ uid: 't', name: 'NoCode' } as any}
                refetch={jest.fn() as any}
                groupUid="g-1"
            />,
        )
        expect(screen.queryByText('PMP')).toBeNull()
    })

    it('shows Edit but not Delete menu item without SYSTEM_TYPE_EDIT permission', () => {
        mockUsePermission.mockReturnValue(false)
        renderWithProviders(
            <SystemTypeItem systemType={baseType} refetch={jest.fn() as any} groupUid="g-1" />,
        )
        // Trigger + Edit = 2; Delete gated by canEdit
        expect(screen.queryAllByRole('button').length).toBe(2)
    })

    it('shows Trigger + Edit + Delete menu items with SYSTEM_TYPE_EDIT permission', () => {
        renderWithProviders(
            <SystemTypeItem systemType={baseType} refetch={jest.fn() as any} groupUid="g-1" />,
        )
        expect(screen.queryAllByRole('button').length).toBe(3)
    })
})
