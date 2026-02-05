import type { Row, RowModel } from '@tanstack/react-table'
import type { FC } from 'react'

import type { GetRowPropsReturnType } from '../PandaTable'
import { TableRow } from './TableRow'

interface Props {
    getRowModel: () => RowModel<any>
    getRowProps: (row: Row<any>) => GetRowPropsReturnType
}
export const TableBody: FC<Props> = ({ getRowModel, getRowProps }) => (
    <tbody className="bg-white dark:bg-gray-800">
        {getRowModel().rows.map((row, index) => (
            <TableRow key={row.id} row={row} index={index} getRowProps={getRowProps} />
        ))}
    </tbody>
)
