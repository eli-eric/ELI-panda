import Link from 'next/link'
import { type FC } from 'react'

import { Disclosure } from '@/components/ui'
import { Badge } from '@/components/visuals/Badge'
import { PATH } from '@/types/constants/paths'
import { cx } from '@/utils'

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
  serviceItems?: Array<{
    node: {
      uid: string
      name?: string | null
      isDelivered?: boolean | null
      order?: {
        uid: string
        name?: string | null
        orderDate?: string | null
      } | null
    }
    created?: string | null
  }>
}

type OrderTableData = {
  uid: string
  name: string
  type: 'order' | 'service'
  isDelivered: boolean
  orderDate: string
}

const safeFormatDate = (date: string | null | undefined) => {
  if (!date) return 'N/A'
  try {
    return new Date(date).toLocaleDateString()
  } catch {
    return 'N/A'
  }
}

export const OrderInformationSection: FC<OrderInformationSectionProps> = ({
  physicalItem,
  serviceItems = []
}) => {
  const mainOrder = physicalItem?.order
  const orderConnection = physicalItem?.orderConnection?.edges?.[0]

  // If there's no main order and no service items, don't render
  if (!mainOrder && (!serviceItems || serviceItems.length === 0)) {
    return null
  }

  const tableData: OrderTableData[] = []

  // Add main order if it exists
  if (mainOrder) {
    tableData.push({
      uid: mainOrder.uid,
      name: mainOrder.name || 'Unnamed Order',
      type: 'order',
      isDelivered: orderConnection?.isDelivered || false,
      orderDate: safeFormatDate(mainOrder.orderDate)
    })
  }

  // Add service items if they exist
  if (serviceItems && Array.isArray(serviceItems)) {
    serviceItems.forEach(edge => {
      const serviceItem = edge.node
      if (serviceItem) {
        tableData.push({
          uid: serviceItem.order?.uid || '',
          name: serviceItem.name || 'Unnamed Service',
          type: 'service',
          isDelivered: serviceItem.isDelivered || false,
          orderDate: safeFormatDate(
            edge.created || serviceItem.order?.orderDate
          )
        })
      }
    })
  }

  return (
    <Disclosure
      title={`Order History Information (${tableData.length})`}
      defaultOpen={false}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-gray-100 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="space-y-2">
        {tableData.map((data, index) => (
          <Link
            key={index}
            href={`${PATH.ORDER}/${data.uid}`}
            target="_blank"
            className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-md border border-gray-200 dark:border-gray-700 group"
          >
            <div className="flex flex-col space-y-1">
              {/* First line: Order name */}
              <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {data.name}
              </div>

              {/* Second line: Type badge + Status badge + Date */}
              <div className="flex items-center space-x-2">
                <Badge
                  className={cx(
                    'text-xs font-medium flex items-center',
                    data.type === 'service'
                      ? 'bg-lime-100 dark:bg-lime-600 text-lime-800 dark:text-lime-100'
                      : 'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100'
                  )}
                >
                  {data.type === 'service' ? 'Service Order' : 'Item Order'}
                </Badge>
                <Badge
                  className={cx(
                    'text-xs font-medium flex items-center',
                    data.isDelivered
                      ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100'
                      : 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100'
                  )}
                >
                  {data.isDelivered ? 'Delivered' : 'Awaiting delivery'}
                </Badge>
                {data.isDelivered && (
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex">
                    ({data.orderDate})
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Disclosure>
  )
}
