import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { useHoveringId } from '@/store/useHoveringId'
import { PATH } from '@/types/constants/paths'

import type { Order } from '../../types'
import TableActions from '../TableActions'

interface NameProps extends CellContext<Order, any> {
  isHoveringId?: number | string
}

export const NameCell = ({ getValue, row: { original, id } }: NameProps) => {
  const { hoveringId } = useHoveringId()

  return (
    <div className="flex items-center">
      <Link href={PATH.ORDER + '/' + original.uid} className={'text-blue-700 cursor-pointer hover:underline'}>
        <span>{getValue() || 'N/A'}</span>
      </Link>
      <TableActions order={original} isHovering={id === hoveringId} />
    </div>
  )
}
