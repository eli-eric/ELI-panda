import { Heading } from '@/components/layout/Heading'
import { Table } from '@/components/ui/table'
import type { FragmentType } from '@/types/gql'
import { useFragment } from '@/types/gql'
import { formatDate } from '@/utils/formatters'
import { PhysicalItemFragment } from '@/utils/graphql/fragments'

import { type OrderColumns } from './order.columns'
import { useSystemOrderColumns } from './order.columns'

interface OrderInformationProps {
    physicalItem?: FragmentType<typeof PhysicalItemFragment>
}

/**
 * Safely formats a date string, handling invalid date formats
 * @param dateStr The date string to format
 * @returns Formatted date string or empty string if date is invalid
 */
const safeFormatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return ''

    try {
        // Handle the specific format with timezone that's causing issues
        // Remove the timezone part if it exists
        const cleanDateStr = dateStr.replace(/\[.*\]$/, '')
        return formatDate(cleanDateStr)
    } catch (error) {
        return ''
    }
}

export const OrderInformation = ({ physicalItem: physicalItemProp }: OrderInformationProps) => {
    const physicalItem = useFragment(PhysicalItemFragment, physicalItemProp)
    const columns = useSystemOrderColumns()
    const mainOrder = physicalItem?.order
    const orderConnection = physicalItem?.orderConnection?.edges?.[0]
    const serviceItemsFragments = physicalItem?.serviceItemsConnection?.edges

    if (!physicalItem) {
        return null
    }

    // If there's no main order and no service items, don't render
    if (!mainOrder && (!serviceItemsFragments || serviceItemsFragments.length === 0)) {
        return null
    }

    const tableData: OrderColumns[] = []

    // Add main order if it exists
    if (mainOrder) {
        tableData.push({
            uid: mainOrder.uid || '',
            name: mainOrder.name || '',
            type: 'order',
            description: '',
            isDelivered: orderConnection?.isDelivered || false,
            orderDate: safeFormatDate(mainOrder.orderDate),
        })
    }

    // Add service items if they exist
    if (serviceItemsFragments && Array.isArray(serviceItemsFragments)) {
        serviceItemsFragments.forEach(edge => {
            const serviceItem = edge.node
            if (serviceItem) {
                tableData.push({
                    uid: serviceItem.order?.uid || '',
                    name: serviceItem.name || '',
                    type: 'service',
                    description: '',
                    isDelivered: serviceItem.isDelivered || false,
                    orderDate: safeFormatDate(edge.created),
                })
            }
        })
    }

    return (
        <div className="flex flex-col w-full">
            <Heading customText="Order Information" showBorder={false} />
            <Table<OrderColumns>
                {...{
                    columns,
                    data: tableData,
                }}
            />
        </div>
    )
}
