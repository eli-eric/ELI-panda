import type { CodebookType } from '@/types/responses/codebook'

import { DELIVERY_STATUS, ORDER_STATUS } from '../types'

export const getColorClassStatus = (
  orderStatus: CodebookType,
  deliveryStatus: DELIVERY_STATUS
) => {
  if (!orderStatus || !deliveryStatus) {
    return ''
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
      colorClass: 'text-purple-800 dark:text-purple-200'
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
      colorClass: 'text-orange-800 dark:text-orange-200'
    },
    {
      statuses: [ORDER_STATUS.ORDERED, DELIVERY_STATUS.NONE],
      colorClass: 'text-red-800 dark:text-red-200'
    },
    {
      statuses: [ORDER_STATUS.PLANNED, DELIVERY_STATUS.NONE],
      colorClass: 'text-blue-800 dark:text-blue-200'
    },
    {
      statuses: [ORDER_STATUS.ORDER_COMPLETED, DELIVERY_STATUS.COMPLETE],
      colorClass: 'text-lime-600 dark:text-lime-200'
    }
    // Add more mappings as needed
  ]

  // Find the matching color class based on orderStatus and deliveryStatus
  for (const mapping of statusMappingColor) {
    if (
      mapping.statuses.includes(orderStatus.uid) &&
      mapping.statuses.includes(deliveryStatus)
    ) {
      return mapping.colorClass || ''
    }
  }

  return ''
}
