export type DeliveryStatus = 0 | 1 | 2

export enum ORDER_STATUS {
  NONE = 'None',
  CANCELLED = 'Cancelled',
  PLANNED = 'Planned',
  REQUESTED = 'Requested',
  ORDERED = 'Ordered',
  ORDER_COMPLETED = 'Order Completed'
}

export enum DELIVERY_STATUS {
  NONE = 0,
  PARTIAL = 1,
  COMPLETE = 2
}
