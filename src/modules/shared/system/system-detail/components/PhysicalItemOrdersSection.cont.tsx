import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'
import { formatDate } from '@/utils/formatters'

import { usePhysicalItemOrders } from '../hooks/queries/usePhysicalItemOrders'
import type { PhysicalItemOrders } from '../types'

const messages = message.systemHierarchy.orders

interface OrderRow {
    key: string
    orderUid: string | null
    name: string
    kind: 'order' | 'service'
    isDelivered: boolean
    date: string | null
}

const toOrderRows = (data: PhysicalItemOrders): OrderRow[] => {
    const rows: OrderRow[] = []
    if (data.order) {
        rows.push({
            key: `order-${data.order.uid}`,
            orderUid: data.order.uid,
            name: data.order.name,
            kind: 'order',
            isDelivered: !!data.order.isDelivered,
            date: data.order.orderDate,
        })
    }
    for (const service of data.serviceItems) {
        rows.push({
            key: `service-${service.uid}`,
            orderUid: service.order?.uid ?? null,
            name: service.name,
            kind: 'service',
            isDelivered: service.isDelivered,
            date: service.created ?? service.order?.orderDate ?? null,
        })
    }
    return rows
}

const OrderRowItem: FC<{ row: OrderRow }> = ({ row }) => {
    const { formatMessage: fm } = useIntl()
    const content = (
        <>
            <span className="font-medium truncate">{row.name}</span>
            <Badge variant="outline" className="text-[10px] shrink-0">
                {fm({ id: row.kind === 'service' ? messages.service : messages.order })}
            </Badge>
            <Badge
                variant="outline"
                className={cn(
                    'text-[10px] shrink-0',
                    row.isDelivered
                        ? 'border-green-300 text-green-700 dark:border-green-800 dark:text-green-400'
                        : 'border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-400',
                )}
            >
                {fm({ id: row.isDelivered ? messages.delivered : messages.pending })}
            </Badge>
            {row.date && (
                <span className="ml-auto text-xs text-muted-foreground shrink-0">
                    {formatDate(row.date)}
                </span>
            )}
        </>
    )
    const rowClassName = 'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm'

    if (!row.orderUid) return <div className={rowClassName}>{content}</div>
    return (
        <Link
            href={`${PATH.ORDER}/${row.orderUid}`}
            target="_blank"
            className={cn(rowClassName, 'group hover:bg-accent transition-colors')}
        >
            {content}
            <ExternalLink className="size-3 shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground" />
        </Link>
    )
}

/** Purchase order + service items of a physical item; renders nothing when there are none. */
export const PhysicalItemOrdersSection: FC<{ physicalItemUid: string }> = ({ physicalItemUid }) => {
    const { data, isLoading } = usePhysicalItemOrders(physicalItemUid)

    if (isLoading) return <Skeleton className="h-12 w-full" />
    const rows = data ? toOrderRows(data) : []
    if (rows.length === 0) return null

    return (
        <div className="space-y-0.5" data-testid="physical-item-orders">
            {rows.map(row => (
                <OrderRowItem key={row.key} row={row} />
            ))}
        </div>
    )
}
