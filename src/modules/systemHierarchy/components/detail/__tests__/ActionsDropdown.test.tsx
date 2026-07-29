import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { openItemAssignModal } from '@/modules/shared/form/itemAssign/item-assign.modal'
import { openItemMoveModal } from '@/modules/shared/form/itemMoving/item-move.modal'

import type { SystemLeaf } from '../../../types'
import { ActionsDropdown } from '../ActionsDropdown.comp'
import { openSetMinimalSparesModal } from '../set-minimal-spares.modal'

jest.mock('@/modules/shared/form/itemMoving/item-move.modal', () => ({
    openItemMoveModal: jest.fn(),
}))
jest.mock('@/modules/shared/form/itemAssign/item-assign.modal', () => ({
    openItemAssignModal: jest.fn(),
}))
jest.mock('../set-minimal-spares.modal', () => ({
    openSetMinimalSparesModal: jest.fn(),
}))

const mockAssignSpares = jest.fn()
jest.mock('@/modules/shared/hooks/useAssignSparesNavigation', () => ({
    useAssignSparesNavigation: () => mockAssignSpares,
}))

const mockCanEditSystem = jest.fn()
jest.mock('@/modules/shared/system/edit-permission/hooks/useSystemEditPermission', () => ({
    useSystemEditPermission: () => ({
        canEdit: mockCanEditSystem(),
        responsibles: [],
        status: 'allowed',
        refetch: jest.fn(),
    }),
}))

// Mock Radix dropdown to render content directly (avoids portal/pointer issues)
jest.mock('@/components/ui/dropdown-menu', () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    DropdownMenuContent: ({ children, ...props }: { children: React.ReactNode }) => (
        <div {...props}>{children}</div>
    ),
    DropdownMenuItem: ({
        children,
        onClick,
        ...props
    }: {
        children: React.ReactNode
        onClick?: () => void
    }) => (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    ),
}))

const messages: Record<string, string> = {
    'systemHierarchy.detail.moveItem': 'Move Item',
    'systemHierarchy.detail.assignSpares': 'Assign Spares',
    'systemHierarchy.detail.setMinimalSpares': 'Set Minimal Spares',
    'systemHierarchy.detail.assignItem': 'Assign Item',
}

const baseSystem: SystemLeaf = {
    uid: 'sys-1',
    name: 'Test System',
    systemCode: 'SYS-001',
    physicalItem: null,
    parentPath: null,
}

const systemWithPhysicalItem: SystemLeaf = {
    ...baseSystem,
    physicalItem: {
        uid: 'pi-1',
        eun: 'EUN-1',
        name: 'Physical Item 1',
        catalogueNumber: 'CAT-001',
    },
}

const renderDropdown = (system: SystemLeaf) =>
    render(
        <IntlProvider locale="en" messages={messages}>
            <ActionsDropdown system={system} />
        </IntlProvider>,
    )

describe('ActionsDropdown', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockCanEditSystem.mockReturnValue(true)
    })

    it('renders Move Item when system has physicalItem', () => {
        renderDropdown(systemWithPhysicalItem)
        expect(screen.getByText('Move Item')).toBeInTheDocument()
    })

    it('does not render Move Item when system has no physicalItem', () => {
        renderDropdown(baseSystem)
        expect(screen.queryByText('Move Item')).not.toBeInTheDocument()
    })

    it('renders Assign Item when system has no physicalItem', () => {
        renderDropdown(baseSystem)
        expect(screen.getByText('Assign Item')).toBeInTheDocument()
    })

    it('does not render Assign Item when system has physicalItem', () => {
        renderDropdown(systemWithPhysicalItem)
        expect(screen.queryByText('Assign Item')).not.toBeInTheDocument()
    })

    it('always renders Assign Spares', () => {
        renderDropdown(baseSystem)
        expect(screen.getByText('Assign Spares')).toBeInTheDocument()
    })

    it('calls openItemMoveModal on Move Item click', () => {
        renderDropdown(systemWithPhysicalItem)
        fireEvent.click(screen.getByText('Move Item'))
        expect(openItemMoveModal).toHaveBeenCalled()
    })

    it('calls openItemAssignModal on Assign Item click', () => {
        renderDropdown(baseSystem)
        fireEvent.click(screen.getByText('Assign Item'))
        expect(openItemAssignModal).toHaveBeenCalled()
    })

    it('calls assign spares handler on Assign Spares click', () => {
        renderDropdown(baseSystem)
        fireEvent.click(screen.getByText('Assign Spares'))
        expect(mockAssignSpares).toHaveBeenCalled()
    })

    // Visible even without spare parts — setting a minimum on a system with none
    // is what flags it as under-covered.
    it('always renders Set Minimal Spares', () => {
        renderDropdown(baseSystem)
        expect(screen.getByText('Set Minimal Spares')).toBeInTheDocument()
    })

    it('calls openSetMinimalSparesModal with the system and its current minimum', () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <ActionsDropdown system={baseSystem} minimalSpareParstCount={0.25} />
            </IntlProvider>,
        )
        fireEvent.click(screen.getByText('Set Minimal Spares'))
        expect(openSetMinimalSparesModal).toHaveBeenCalledWith({
            system: baseSystem,
            title: 'Set Minimal Spares',
            currentValue: 0.25,
        })
    })

    it('disables the actions when the user cannot edit the system', () => {
        mockCanEditSystem.mockReturnValue(false)
        renderDropdown(systemWithPhysicalItem)
        expect(screen.getByText('Move Item').closest('button')).toBeDisabled()
        expect(screen.getByText('Assign Spares').closest('button')).toBeDisabled()
        expect(screen.getByText('Set Minimal Spares').closest('button')).toBeDisabled()
    })
})
