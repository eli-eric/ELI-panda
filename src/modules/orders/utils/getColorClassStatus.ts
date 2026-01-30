import type { CodebookType } from '@/types/responses/codebook'

import { DELIVERY_STATUS, ORDER_STATUS } from '../types'

export const getColorClassStatus = (orderStatus: CodebookType, deliveryStatus: DELIVERY_STATUS) => {
    if (!orderStatus || !deliveryStatus) {
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
                DELIVERY_STATUS.COMPLETE,
            ],
            colorClass: 'bg-lime-200 dark:bg-lime-700',
        },
        {
            statuses: [
                ORDER_STATUS.CANCELLED,
                ORDER_STATUS.NONE,
                ORDER_STATUS.PLANNED,
                ORDER_STATUS.REQUESTED,
                ORDER_STATUS.ORDERED,
                DELIVERY_STATUS.PARTIAL,
            ],
            colorClass: 'bg-amber-400 dark:bg-amber-700',
        },
        {
            statuses: [ORDER_STATUS.ORDERED, DELIVERY_STATUS.NONE],
            colorClass: 'bg-yellow-200 dark:bg-yellow-700',
        },
        {
            statuses: [ORDER_STATUS.PLANNED, DELIVERY_STATUS.NONE],
            colorClass: 'bg-blue-100 dark:bg-blue-700',
        },
        {
            statuses: [ORDER_STATUS.ORDER_COMPLETED, DELIVERY_STATUS.COMPLETE],
            colorClass: 'bg-lime-400 dark:bg-green-800',
        },
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

export const getBadgeVariantByOrderStatus = (
    orderStatus: CodebookType,
    deliveryStatus: DELIVERY_STATUS,
) => {
    if (!orderStatus || !deliveryStatus) {
        return 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
    const statusMappingColor = [
        {
            statuses: [
                ORDER_STATUS.CANCELLED,
                ORDER_STATUS.NONE,
                ORDER_STATUS.PLANNED,
                ORDER_STATUS.REQUESTED,
                ORDER_STATUS.ORDERED,
                DELIVERY_STATUS.COMPLETE,
            ],
            badgeClass:
                'border-lime-600 bg-lime-50 text-lime-700 dark:border-lime-300 dark:bg-lime-950 dark:text-lime-300',
        },
        {
            statuses: [
                ORDER_STATUS.CANCELLED,
                ORDER_STATUS.NONE,
                ORDER_STATUS.PLANNED,
                ORDER_STATUS.REQUESTED,
                ORDER_STATUS.ORDERED,
                DELIVERY_STATUS.PARTIAL,
            ],
            badgeClass:
                'border-amber-600 bg-amber-50 text-amber-700 dark:border-amber-300 dark:bg-amber-950 dark:text-amber-300',
        },
        {
            statuses: [ORDER_STATUS.ORDERED, DELIVERY_STATUS.NONE],
            badgeClass:
                'border-yellow-600 bg-yellow-50 text-yellow-700 dark:border-yellow-300 dark:bg-yellow-950 dark:text-yellow-300',
        },
        {
            statuses: [ORDER_STATUS.PLANNED, DELIVERY_STATUS.NONE],
            badgeClass:
                'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-300 dark:bg-blue-950 dark:text-blue-300',
        },
        {
            statuses: [ORDER_STATUS.ORDER_COMPLETED, DELIVERY_STATUS.COMPLETE],
            badgeClass:
                'border-green-600 bg-green-50 text-green-700 dark:border-green-300 dark:bg-green-950 dark:text-green-300',
        },
    ]

    // Find the matching badge class based on orderStatus and deliveryStatus
    for (const mapping of statusMappingColor) {
        if (
            mapping.statuses.includes(orderStatus.uid) &&
            mapping.statuses.includes(deliveryStatus)
        ) {
            return (
                mapping.badgeClass ||
                'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
            )
        }
    }

    return 'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
}
