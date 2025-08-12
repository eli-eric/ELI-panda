import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { type FC } from 'react'

import { Disclosure } from '@/components/ui/Disclosure'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'
import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import { formatDate } from '@/utils/formatters'
import { PhysicalItemFragment } from '@/utils/graphql/fragments'

interface OrderInformationProps {
  physicalItem?: FragmentType<typeof PhysicalItemFragment>
}

type OrderTableData = {
  uid: string
  name: string
  type: 'order' | 'service'
  isDelivered: boolean
  orderDate: string
}

/**
 * Safely formats a date string, handling invalid date formats
 */
const safeFormatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return 'N/A'

  try {
    // Handle the specific format with timezone that's causing issues
    // Remove the timezone part if it exists
    const cleanDateStr = dateStr.replace(/\[.*\]$/, '')
    return new Date(cleanDateStr).toLocaleDateString()
  } catch (error) {
    return 'N/A'
  }
}

export const OrderInformation: FC<OrderInformationProps> = ({
  physicalItem: physicalItemProp
}) => {
  const physicalItem = useFragment(PhysicalItemFragment, physicalItemProp)
  const mainOrder = physicalItem?.order
  const orderConnection = physicalItem?.orderConnection?.edges?.[0]
  const serviceItemsFragments = physicalItem?.serviceItemsConnection?.edges

  if (!physicalItem) {
    return null
  }

  // If there's no main order and no service items, don't render
  if (
    !mainOrder &&
    (!serviceItemsFragments || serviceItemsFragments.length === 0)
  ) {
    return null
  }

  const tableData: OrderTableData[] = []

  // Add main order if it exists
  if (mainOrder) {
    tableData.push({
      uid: mainOrder.uid || '',
      name: mainOrder.name || 'Unnamed Order',
      type: 'order',
      isDelivered: orderConnection?.isDelivered || false,
      orderDate: safeFormatDate(mainOrder.orderDate)
    })
  }

  // Add service items if they exist
  if (serviceItemsFragments && Array.isArray(serviceItemsFragments)) {
    serviceItemsFragments.forEach(edge => {
      const serviceItem = edge.node
      if (serviceItem) {
        tableData.push({
          uid: serviceItem.order?.uid || '',
          name: serviceItem.name || 'Unnamed Service',
          type: 'service',
          isDelivered: serviceItem.isDelivered || false,
          orderDate: safeFormatDate(edge.created || serviceItem.order?.orderDate)
        })
      }
    })
  }

  return (
    <Disclosure
      title={`Order Information (${tableData.length})`}
      defaultOpen={false}
      className="w-full border rounded-lg"
      buttonClassName="p-3 text-sm font-medium bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-gray-100 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
      panelClassName="p-3 space-y-2"
    >
      <div className="space-y-1">
        {tableData.map((data, index) => (
          <Link
            key={index}
            href={`${PATH.ORDER}/${data.uid}`}
            target="_blank"
            className="flex justify-between text-xs px-2 py-2 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group"
          >
            <div className="flex flex-col space-y-1 flex-1 min-w-0">
              {/* First line: Order name with link icon */}
              <div className="flex items-center space-x-1">
                <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                  {data.name}
                </span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 shrink-0" />
              </div>

              {/* Second line: Type and Status badges with date */}
              <div className="flex items-center space-x-1.5">
                <Badge
                  className={cn(
                    data.type === 'service'
                      ? 'bg-lime-100 dark:bg-lime-600 text-lime-800 dark:text-lime-100 text-xs'
                      : 'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100 text-xs'
                  )}
                >
                  {data.type === 'service' ? 'Service' : 'Order'}
                </Badge>
                <Badge
                  className={cn(
                    data.isDelivered
                      ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100 text-xs'
                      : 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100 text-xs'
                  )}
                >
                  {data.isDelivered ? 'Delivered' : 'Pending'}
                </Badge>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                  {data.orderDate}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Disclosure>
  )
}
