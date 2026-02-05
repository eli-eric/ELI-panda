import type { Cell, Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import type { FC } from 'react'
import React, { useId } from 'react'

import { cn } from '@/lib/utils'

import styles from './RowCell.module.css'

interface Props {
    row: Row<any>
    cell: Cell<any, unknown>
    loading?: boolean
}

export const RowCell: FC<Props> = ({ row, cell, loading }) => {
    const id = useId()
    const rowIndex = row.getAllCells().indexOf(cell)

    const stickyCellsSize =
        row.getAllCells().reduce((acc, cell, index) => {
            if (index < rowIndex) {
                if (cell.column.columnDef.meta?.sticky) {
                    return acc + cell.column.getSize()
                }
            }
            return acc
        }, 0) +
        1 * rowIndex

    return (
        <td
            key={cell.id}
            id={id}
            style={
                {
                    width: cell.column.getSize(),
                    '--left': cell.column.columnDef.meta?.sticky
                        ? `${rowIndex === 0 ? 0 : stickyCellsSize}px`
                        : undefined,
                } as React.CSSProperties
            }
            className={cn(
                ' border-r border-b border-gray-400 dark:text-gray-100 pl-3 pr-3',
                cell.column.columnDef.meta?.sticky
                    ? 'sticky z-30 backdrop-blur-2xl backdrop-filter border-r pt-1 pb-1'
                    : '',
                loading ? 'opacity-50' : '',
                styles.cell,
                cell.column.columnDef.meta?.className,
            )}
        >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
    )
}
