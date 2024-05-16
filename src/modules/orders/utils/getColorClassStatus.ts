import type { CodebookType } from '@/types/responses/codebook'

import { DELIVERY_STATUS, ORDER_STATUS } from '../types'

export const getColorClassStatus = (
  orderStatus: CodebookType,
  deliveryStatus: DELIVERY_STATUS
) => {
  if (!orderStatus ?? !deliveryStatus) {
    return 'bg-white dark:bg-gray-800'
  }
  const statusMappingColor = [
    {
      statuses: [
        ORDER_STATUS.CANCELLED,
        ORDER_STATUS.NONE,
        ORDER_STATUS.PLANNED,
        ORDER_STATUS.REQUESTED,
        ORDER_STATUS.ORDERED,
        DELIVERY_STATUS.COMPLETE
      ],
      colorClass: 'bg-lime-200 dark:bg-lime-700'
    },
    {
      statuses: [
        ORDER_STATUS.CANCELLED,
        ORDER_STATUS.NONE,
        ORDER_STATUS.PLANNED,
        ORDER_STATUS.REQUESTED,
        ORDER_STATUS.ORDERED,
        DELIVERY_STATUS.PARTIAL
      ],
      colorClass: 'bg-amber-400 dark:bg-amber-700'
    },
    {
      statuses: [ORDER_STATUS.ORDERED, DELIVERY_STATUS.NONE],
      colorClass: 'bg-yellow-200 dark:bg-yellow-700'
    },
    {
      statuses: [ORDER_STATUS.PLANNED, DELIVERY_STATUS.NONE],
      colorClass: 'bg-blue-100 dark:bg-blue-700'
    },
    {
      statuses: [ORDER_STATUS.ORDER_COMPLETED, DELIVERY_STATUS.COMPLETE],
      colorClass: 'bg-lime-400 dark:bg-green-800'
    }
    // Add more mappings as needed
  ]

  // Find the matching color class based on orderStatus and deliveryStatus
  for (const mapping of statusMappingColor) {
    if (
      mapping.statuses.includes(orderStatus.uid) &&
      mapping.statuses.includes(deliveryStatus)
    ) {
      return mapping.colorClass || 'bg-white dark:bg-gray-800'
    }
  }

  return ''
}
