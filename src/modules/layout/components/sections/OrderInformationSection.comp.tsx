import { type FC } from 'react'

import { Disclosure } from '@/components/ui'
import { PATH } from '@/types/constants/paths'

import { SystemDetailParameter } from '../system-detail-parameter.comp'
import { SystemLink } from '../SystemLink.comp'

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
        <SystemDetailParameter
          title="Order Name"
          value={physicalItem.order.name || 'N/A'}
        />
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
          <SystemLink href={`${PATH.ORDER}/${physicalItem.order.uid}`} external>
            View Order Details
          </SystemLink>
        </div>
      </div>
    </Disclosure>
  )
}
