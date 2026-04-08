import type { Table } from '@tanstack/react-table'
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
}

export const ColumnVisibilityDropdown: FC<ColumnVisibilityDropdownProps> = ({
    table,
    excludeColumns = [],
}) => {
    const columns = table
        .getAllLeafColumns()
        .filter(column => !excludeColumns.includes(column.id))

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    data-testid="column-visibility-trigger"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={table.getIsAllColumnsVisible()}
                    onCheckedChange={table.getToggleAllColumnsVisibilityHandler()}
                >
                    Toggle All
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                {columns.map(column => (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={value => column.toggleVisibility(!!value)}
                    >
                        {typeof column.columnDef.header === 'string'
                            ? column.columnDef.header || column.id
                            : column.id}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
