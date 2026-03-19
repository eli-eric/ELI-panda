import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { messages } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { ZoneActionsCell } from '../components/zone-actions.comp'
import type { Zone } from '../types/zone.types'

// Mock dependencies
const mockOpenModal = jest.fn()
const mockCloseModal = jest.fn()
const mockDeleteMutate = jest.fn()
const mockWithWarning = jest.fn((callback: () => void) => () => callback())

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: () => ({
        openModal: mockOpenModal,
        closeModal: mockCloseModal,
    }),
}))

jest.mock('@/hooks/useWarningModal', () => ({
    __esModule: true,
    default: () => mockWithWarning,
}))

jest.mock('@/hooks/useAccessControl', () => ({
    useAccessControl: (role: string) => () => role === ROLE.ZONES_EDIT,
}))

jest.mock('../hooks/useZoneDelete', () => ({
    useZoneDelete: () => mockDeleteMutate,
}))

jest.mock('sonner', () => ({
    toast: {
        promise: jest.fn(),
        error: jest.fn(),
        success: jest.fn(),
    },
}))

// Mock dropdown to avoid portal issues
jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuItem: ({
        onClick,
        children,
        className,
    }: {
        onClick?: () => void
        children: React.ReactNode
        className?: string
    }) => (
        <button onClick={onClick} className={className}>
            {children}
        </button>
    ),
}))

const mockZone: Zone = {
    uid: 'zone-123',
    name: 'Test Zone',
    code: 'TZ',
    parentZone: null,
}

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
})

const renderCell = (zone: Zone = mockZone) => {
    const cellProps = {
        getValue: () => zone.name,
        row: { original: zone, id: '0', index: 0 },
        column: { id: 'name' },
        table: {},
        cell: {},
        renderValue: () => zone.name,
    } as any

    return render(
        <IntlProvider locale="en" messages={messages.en}>
            <QueryClientProvider client={queryClient}>
                <ZoneActionsCell {...cellProps} />
            </QueryClientProvider>
        </IntlProvider>,
    )
}

describe('ZoneActionsCell', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders zone name', () => {
        renderCell()
        expect(screen.getByText('Test Zone')).toBeInTheDocument()
    })

    it('renders edit and delete buttons when user has edit role', () => {
        renderCell()
        expect(screen.getByText('Edit')).toBeInTheDocument()
        expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('opens edit modal on edit click', () => {
        renderCell()
        fireEvent.click(screen.getByText('Edit'))

        expect(mockOpenModal).toHaveBeenCalledWith('sheet', {
            id: 'zone-edit-zone-123',
            component: expect.any(Function),
            props: expect.objectContaining({
                uid: 'zone-123',
            }),
        })
    })

    it('triggers delete with warning on delete click', () => {
        renderCell()
        fireEvent.click(screen.getByText('Delete'))

        expect(mockWithWarning).toHaveBeenCalled()
    })
})

describe('ZoneActionsCell without edit permission', () => {
    it('hides actions when user lacks edit role', () => {
        // Mock useAccessControl to return false for this test
        const useAccessControlMock = require('@/hooks/useAccessControl') // eslint-disable-line @typescript-eslint/no-require-imports
        const originalImpl = useAccessControlMock.useAccessControl
        useAccessControlMock.useAccessControl = () => () => false

        const cellProps = {
            getValue: () => 'Test Zone',
            row: { original: mockZone, id: '0', index: 0 },
            column: { id: 'name' },
            table: {},
            cell: {},
            renderValue: () => 'Test Zone',
        } as any

        render(
            <IntlProvider locale="en" messages={messages.en}>
                <QueryClientProvider client={queryClient}>
                    <ZoneActionsCell {...cellProps} />
                </QueryClientProvider>
            </IntlProvider>,
        )

        expect(screen.getByText('Test Zone')).toBeInTheDocument()
        expect(screen.queryByText('Edit')).not.toBeInTheDocument()
        expect(screen.queryByText('Delete')).not.toBeInTheDocument()

        // Restore
        useAccessControlMock.useAccessControl = originalImpl
    })
})
