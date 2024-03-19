import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { LinkDecorator } from '@/components/decorators'
import { PATH } from '@/types/constants/paths'

import type { Order } from '../../types'
import TableActions from '../TableActions'

interface NameProps extends CellContext<Order, any> {
  isHoveringId?: number | string
}

export const NameCell = ({ getValue, row: { original, id } }: NameProps) => {
  return (
    <div className="flex items-center">
      <Link href={PATH.ORDER + '/' + original.uid} className="flex items-center">
        <LinkDecorator>{getValue() || 'N/A'}</LinkDecorator>
      </Link>
      <TableActions order={original} isHovering={true} />
    </div>
  )
}
