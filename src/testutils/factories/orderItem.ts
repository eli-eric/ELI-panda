import type {
    OrderDetailFormType,
    OrderLineFormType,
    ServiceLine,
} from '@/modules/orderItem/types/form'
import type { CodebookType } from '@/types/responses/codebook'

import { makeCodebook } from './catalogue'

let counter = 0
const nextUid = (prefix: string) => `${prefix}-${++counter}`

export const makeOrderLine = (overrides: Partial<OrderLineFormType> = {}): OrderLineFormType => ({
    uid: overrides.uid ?? nextUid('ol'),
    name: overrides.name ?? 'Order line',
    catalogueUid: overrides.catalogueUid,
    catalogueNumber: overrides.catalogueNumber ?? 'CAT-001',
    system: overrides.system,
    parentSystem: overrides.parentSystem,
    location: overrides.location,
    itemUsage: overrides.itemUsage,
    price: overrides.price ?? 100,
    currency: overrides.currency ?? 'EUR',
    quantity: overrides.quantity ?? 1,
    eun: overrides.eun,
    notes: overrides.notes,
    isDelivered: overrides.isDelivered ?? false,
    serialNumber: overrides.serialNumber,
    lastUpdateTime: overrides.lastUpdateTime,
    serialNumbers: overrides.serialNumbers,
    serviceOrderUid: overrides.serviceOrderUid,
    serviceItemName: overrides.serviceItemName,
})

export const makeServiceLine = (overrides: Partial<ServiceLine> = {}): ServiceLine => ({
    uuid: overrides.uuid ?? nextUid('sl'),
    uid: overrides.uid ?? nextUid('sl'),
    name: overrides.name ?? 'Service line',
    serviceType: overrides.serviceType ?? (makeCodebook({ name: 'Repair' }) as CodebookType),
    item: overrides.item ?? (makeCodebook({ name: 'Item' }) as CodebookType),
    price: overrides.price ?? 100,
    currency: overrides.currency ?? 'EUR',
    notes: overrides.notes,
    eun: overrides.eun,
    serialNumber: overrides.serialNumber,
    isDelivered: overrides.isDelivered ?? false,
    lastUpdateTime: overrides.lastUpdateTime,
    details: overrides.details,
})

export const makeOrder = (overrides: Partial<OrderDetailFormType> = {}): OrderDetailFormType => ({
    uid: overrides.uid ?? nextUid('order'),
    lastUpdateTime: overrides.lastUpdateTime,
    name: overrides.name ?? 'Order',
    orderNumber: overrides.orderNumber ?? '1',
    requestNumber: overrides.requestNumber ?? '1',
    contractNumber: overrides.contractNumber ?? '1',
    notes: overrides.notes ?? '',
    supplier: overrides.supplier ?? (makeCodebook({ name: 'Supplier' }) as CodebookType),
    orderStatus: overrides.orderStatus ?? (makeCodebook({ name: 'Open' }) as CodebookType),
    procurementResponsible:
        overrides.procurementResponsible ?? (makeCodebook({ name: 'Procurer' }) as CodebookType),
    requestor: overrides.requestor ?? (makeCodebook({ name: 'Requestor' }) as CodebookType),
    serviceLines: overrides.serviceLines ?? [],
    orderDate: overrides.orderDate ?? '2025-01-01',
    orderLines: overrides.orderLines ?? [],
})
