import Link from 'next/link'
import { type FC } from 'react'

import { Button } from '@/components/Buttons'
import { Disclosure } from '@/components/ui'
import { PATH } from '@/types/constants/paths'

import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface OrderInformationSectionProps {
  physicalItem: {
    order?: {
      uid: string
      name?: string | null
      orderDate?: string | null
    } | null
    orderConnection?: {
      edges?: Array<{
        isDelivered?: boolean | null
      } | null> | null
    } | null
  }
}

export const OrderInformationSection: FC<OrderInformationSectionProps> = ({
  physicalItem
}) => {
  if (!physicalItem?.order) {
    return null
  }

  return (
    <Disclosure
      title="Order Information"
      defaultOpen={false}
      className="w-full border rounded-md overflow-hidden"
      buttonClassName="p-3 bg-green-50 dark:bg-green-900/20"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Order:</span>
          <Link href={`/orders/${physicalItem.order.uid}`} target="_blank">
            <span className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
              {physicalItem.order.name}
            </span>
          </Link>
        </div>
        <SystemDetailParameter
          title="Order Date"
          value={
            physicalItem.order.orderDate
              ? new Date(physicalItem.order.orderDate).toLocaleDateString()
              : undefined
          }
        />
        {physicalItem.orderConnection?.edges &&
          physicalItem.orderConnection.edges.length > 0 && (
            <SystemDetailParameter
              title="Delivery Status"
              value={
                physicalItem.orderConnection.edges[0]?.isDelivered
                  ? 'Delivered'
                  : 'Pending'
              }
            />
          )}

        {/* Link to order detail */}
        <div className="pt-2">
          <Link
            href={`${PATH.ORDER}/${physicalItem.order.uid}`}
            target="_blank"
          >
            <Button className="w-full justify-center text-sm py-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50">
              View Order Details
            </Button>
          </Link>
        </div>
      </div>
    </Disclosure>
  )
}
