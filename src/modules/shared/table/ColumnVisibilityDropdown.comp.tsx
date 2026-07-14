import type { Column, Table, VisibilityState } from '@tanstack/react-table'
import { SlidersHorizontal } from 'lucide-react'
import type { FC } from 'react'

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ColumnVisibilityDropdownProps {
    table: Table<any>
    excludeColumns?: string[]
    // Required when the dropdown is rendered outside the component that owns
    // the table state (e.g. via onTableReady): the table instance updates one
    // render after this component, so checked state must come from the
    // caller's own columnVisibility subscription to stay in sync.
    columnVisibility?: VisibilityState
}

export const ColumnVisibilityDropdown: FC<ColumnVisibilityDropdownProps> = ({
    table,
    excludeColumns = [],
    columnVisibility,
}) => {
    const columns = table
        .getAllLeafColumns()
        .filter(column => column.getCanHide() && !excludeColumns.includes(column.id))

    const isColumnVisible = (column: Column<any>) =>
        columnVisibility ? columnVisibility[column.id] !== false : column.getIsVisible()

    const areAllColumnsVisible = columnVisibility
        ? table.getAllLeafColumns().every(isColumnVisible)
        : table.getIsAllColumnsVisible()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" data-testid="column-visibility-trigger">
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={areAllColumnsVisible}
                    onCheckedChange={checked =>
                        table.getToggleAllColumnsVisibilityHandler()({ target: { checked } })
                    }
                >
                    Toggle All
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                {columns.map(column => (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={isColumnVisible(column)}
                        onCheckedChange={value => column.toggleVisibility(!!value)}
                    >
                        {column.columnDef.meta?.title ||
                            (typeof column.columnDef.header === 'string'
                                ? column.columnDef.header || column.id
                                : column.id)}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
