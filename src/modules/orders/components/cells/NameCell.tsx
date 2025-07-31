import type { CellContext } from '@tanstack/react-table'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { PATH } from '@/types/constants/paths'
import type { Order } from '@/types/responses/orders'

import TableActions from '../TableActions'

export const NameCell = ({
  getValue,
  row: { original }
}: CellContext<Order, any>) => {
  return (
    <div className="flex items-center truncate">
      <Link
        href={PATH.ORDER + '/' + original.uid}
        className="flex items-center cursor-pointer"
      >
        <Button variant={'link'} className="cursor-pointer text-ellipsis">
          {getValue() || 'N/A'}
        </Button>
      </Link>
      <TableActions order={original} />
    </div>
  )
}
