import { convertDate } from '@/utils/formatters'

import type {
  OrderDetailFormType,
  OrderLineFormType,
  ServiceLine
} from '../types/form'

/**
 * Adds uuid property to orderLines and serviceLines for frontend use.
 * uuid is used as a fallback identifier when uid is not available.
 */
export const addUuidsToOrderData = (
  orderDetail: OrderDetailFormType
): OrderDetailFormType => {
  return {
    ...orderDetail,
    orderLines:
      orderDetail?.orderLines &&
      orderDetail.orderLines.map(orderLine => ({
        ...orderLine,
        uuid: orderLine.uid
      })),
    serviceLines:
      orderDetail?.serviceLines &&
      orderDetail.serviceLines.map(serviceLine => ({
        ...serviceLine,
        uuid: serviceLine.uid
      })),
    orderDate: orderDetail?.orderDate,
    orderStatus: orderDetail?.orderStatus || {
      uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54',
      name: 'Requested'
    }
  }
}

/**
 * Removes uuid property from orderLines and serviceLines before submitting to backend.
 * Backend doesn't need uuid, it's a helper property for frontend only.
 */
const removeUuidsFromLines = <T extends { uuid?: string }>(
  lines: T[] | undefined
): Omit<T, 'uuid'>[] | undefined => {
  if (!lines) return undefined

  return lines.map(line => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, ...rest } = line
    return rest
  })
}

/**
 * Prepares order data for backend submission:
 * - Removes uuid from orderLines and serviceLines
 * - Converts orderDate to the correct format
 */
export const prepareOrderForSubmit = (
  data: OrderDetailFormType
): OrderDetailFormType => {
  return {
    ...data,
    orderLines: removeUuidsFromLines(data.orderLines) as OrderLineFormType[],
    serviceLines: removeUuidsFromLines(data.serviceLines) as ServiceLine[],
    orderDate: convertDate(data.orderDate)
  }
}

/**
 * Validates whether order has no orderLines or serviceLines
 */
export const hasEmptyLines = (data: OrderDetailFormType): boolean => {
  const hasNoOrderLines = !data?.orderLines || data.orderLines.length === 0
  const hasNoServiceLines =
    !data?.serviceLines || data.serviceLines.length === 0

  return hasNoOrderLines && hasNoServiceLines
}
