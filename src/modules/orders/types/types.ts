import type { CodebookType } from '@/types/responses/codebook'

export const ORDER_STATUS = {
  NONE: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c51',
  CANCELLED: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c52',
  PLANNED: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c53',
  REQUESTED: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54',
  ORDERED: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c55',
  ORDER_COMPLETED: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c56'
}

export enum DELIVERY_STATUS {
  NONE = 0,
  PARTIAL = 1,
  COMPLETE = 2
}

export const DeliveryStatusMapping: Record<DELIVERY_STATUS, string> = {
  [DELIVERY_STATUS.NONE]: 'None',
  [DELIVERY_STATUS.PARTIAL]: 'Partially Delivered',
  [DELIVERY_STATUS.COMPLETE]: 'Delivered'
}

export type QueryFilter = {
  supplier?: CodebookType
  orderStatus?: CodebookType
  procurementResponsible?: CodebookType
  requestor?: CodebookType
}
