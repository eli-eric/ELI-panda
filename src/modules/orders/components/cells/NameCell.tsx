import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { PATH } from '@/types/constants/paths'

import type { Order } from '../../types'
import TableActions from '../TableActions'

interface NameProps extends CellContext<Order, any> {
  isHoveringId?: number | string
}

export const NameCell = ({ getValue, row: { original, id }, isHoveringId }: NameProps) => (
  <div className="flex items-center pt-1 pb-1">
    <Link href={PATH.ORDER + '/' + original.uid} className={'text-blue-500 cursor-pointer hover:underline'}>
      <span>{getValue()}</span>
    </Link>
    <TableActions order={original} isHovering={id === isHoveringId} />
  </div>
)
