import type { Row } from '@tanstack/react-table'
import type { FC } from 'react'

import type { GetRowPropsReturnType } from '../PandaTable'
import { TableRow } from './TableRow'

interface Props {
  getRowModel()
  loading?: boolean
  getRowProps: (row: Row<any>) => GetRowPropsReturnType
}
export const TableBody: FC<Props> = ({ getRowModel, loading, getRowProps }) => (
  <tbody className="bg-white">
    {getRowModel().rows.map((row, index) => (
      <TableRow key={row.id} loading={loading} row={row} index={index} getRowProps={getRowProps} />
    ))}
  </tbody>
)
