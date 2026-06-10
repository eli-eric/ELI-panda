import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { IntlProvider } from 'react-intl'

import { LeavesTableComponent } from '../LeavesTable.comp'

// PandaTableV2 is virtualized and renders nothing in jsdom — stub it with a
// plain table that drives getRowProps so the context-menu wiring is what's tested.
jest.mock('@/modules/shared/table/pandaTableV2/PandaTableV2', () => ({
    PandaTableV2: ({ data, getRowProps }: any) => (
        <table>
            <tbody>
                {(data ?? []).map((original: any) => {
                    const { onClick, onContextMenu } = getRowProps({ original })
                    return (
                        <tr
                            key={original.uid}
                            data-testid={`row-${original.uid}`}
                            onClick={onClick}
                            onContextMenu={onContextMenu}
                        >
                            <td>{original.name}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    ),
}))

jest.mock('@/modules/shared/table/PaginationV2', () => ({ PaginationV2: () => null }))

const leaves = [
    { uid: 'leaf-1', name: 'Pump A' },
    { uid: 'leaf-2', name: 'Valve B' },
]

const renderTable = (props: Partial<React.ComponentProps<typeof LeavesTableComponent>> = {}) =>
    render(
        <IntlProvider locale="en" messages={{ 'systemHierarchy.delete.menuItem': 'Delete System' }}>
            <LeavesTableComponent
                data={leaves as never}
                totalCount={leaves.length}
                isLoading={false}
                isInitialLoad={false}
                onRowClick={jest.fn()}
                table={{} as never}
                canEdit
                onDeleteSystem={jest.fn()}
                {...props}
            />
        </IntlProvider>,
    )

describe('LeavesTableComponent context menu', () => {
    it('enables Delete and calls handler with the right-clicked row uid and name', () => {
        const onDeleteSystem = jest.fn()
        renderTable({ onDeleteSystem })

        fireEvent.contextMenu(screen.getByTestId('row-leaf-2'))
        const deleteItem = screen.getByTestId('context-delete-system')
        expect(deleteItem).not.toHaveAttribute('data-disabled')

        fireEvent.click(deleteItem)
        expect(onDeleteSystem).toHaveBeenCalledWith('leaf-2', 'Valve B')
    })

    it('disables Delete when right-clicking outside a row (no row captured)', () => {
        renderTable()

        fireEvent.contextMenu(screen.getByTestId('system-hierarchy-leaves-table'))
        expect(screen.getByTestId('context-delete-system')).toHaveAttribute('data-disabled')
    })

    it('disables Delete when the user cannot edit', () => {
        renderTable({ canEdit: false })

        fireEvent.contextMenu(screen.getByTestId('row-leaf-1'))
        expect(screen.getByTestId('context-delete-system')).toHaveAttribute('data-disabled')
    })

    it('does not wrap in a context menu when no delete handler is provided', () => {
        renderTable({ onDeleteSystem: undefined })

        fireEvent.contextMenu(screen.getByTestId('row-leaf-1'))
        expect(screen.queryByTestId('context-delete-system')).not.toBeInTheDocument()
    })
})
