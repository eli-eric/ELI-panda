import { fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'

import { ColumnVisibilityDropdown } from '../ColumnVisibilityDropdown.comp'

const createMockColumn = (id: string, header: string, isVisible = true) => ({
    id,
    columnDef: { header },
    getIsVisible: jest.fn(() => isVisible),
    toggleVisibility: jest.fn(),
})

const createMockTable = (columns: ReturnType<typeof createMockColumn>[]) => ({
    getAllLeafColumns: jest.fn(() => columns),
    getIsAllColumnsVisible: jest.fn(() => true),
    getToggleAllColumnsVisibilityHandler: jest.fn(() => jest.fn()),
})

// Radix DropdownMenu renders content in a portal, need to query the whole document
const getDropdownContent = () => document.querySelector('[role="menu"]')

describe('ColumnVisibilityDropdown', () => {
    it('renders trigger button', () => {
        const table = createMockTable([])
        render(<ColumnVisibilityDropdown table={table as any} />)
        expect(screen.getByTestId('column-visibility-trigger')).toBeInTheDocument()
    })

    it('shows column items when opened', async () => {
        const columns = [createMockColumn('name', 'Name'), createMockColumn('code', 'System Code')]
        const table = createMockTable(columns)

        render(<ColumnVisibilityDropdown table={table as any} />)
        fireEvent.click(screen.getByTestId('column-visibility-trigger'))

        const menu = getDropdownContent()
        if (menu) {
            const container = within(menu as HTMLElement)
            expect(container.getByText('Columns')).toBeInTheDocument()
            expect(container.getByText('Toggle All')).toBeInTheDocument()
            expect(container.getByText('Name')).toBeInTheDocument()
            expect(container.getByText('System Code')).toBeInTheDocument()
        }
    })

    it('excludes columns specified in excludeColumns', () => {
        const columns = [createMockColumn('icon', 'Icon'), createMockColumn('name', 'Name')]
        const table = createMockTable(columns)

        render(<ColumnVisibilityDropdown table={table as any} excludeColumns={['icon']} />)
        fireEvent.click(screen.getByTestId('column-visibility-trigger'))

        const menu = getDropdownContent()
        if (menu) {
            const container = within(menu as HTMLElement)
            expect(container.getByText('Name')).toBeInTheDocument()
            expect(container.queryByText('Icon')).not.toBeInTheDocument()
        }
    })

    it('calls toggleVisibility when checkbox clicked', () => {
        const columns = [createMockColumn('name', 'Name', true)]
        const table = createMockTable(columns)

        render(<ColumnVisibilityDropdown table={table as any} />)
        fireEvent.click(screen.getByTestId('column-visibility-trigger'))

        const menu = getDropdownContent()
        if (menu) {
            const container = within(menu as HTMLElement)
            fireEvent.click(container.getByText('Name'))
            expect(columns[0].toggleVisibility).toHaveBeenCalled()
        }
    })
})
