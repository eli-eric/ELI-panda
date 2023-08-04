import type { Row } from '@tanstack/react-table'
import type { FC } from 'react'

import type { GetRowPropsReturnType } from '../PandaTable'
import { TableRow } from './TableRow'

interface Props {
  getRowModel()
  loading?: boolean
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
  tableId: string
}
export const TableBody: FC<Props> = ({ getRowModel, loading, getRowProps, tableId }) => (
  <tbody className="bg-white">
    {getRowModel().rows.map((row, index) => (
      <TableRow key={row.id} tableId={tableId} loading={loading} row={row} index={index} getRowProps={getRowProps} />
    ))}
  </tbody>
)
