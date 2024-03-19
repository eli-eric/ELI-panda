import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { LinkDecorator } from '@/components/decorators'
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
      <Link href={PATH.ORDER + '/' + original.uid}>
        <LinkDecorator>
          <span>{getValue() || 'N/A'}</span>
        </LinkDecorator>
      </Link>
      <TableActions order={original} isHovering={id === hoveringId} />
    </div>
  )
}
