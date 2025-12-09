import { convertDate } from '@/utils/formatters'

import type {
  OrderDetailFormType,
  OrderLineFormType,
  ServiceLine
} from '../types/form'

/**
 * Adds React Hook Form data to orderLines and serviceLines if needed.
 * Note: React Hook Form automatically adds 'id' field via useFieldArray.
 */
export const addUuidsToOrderData = (
  orderDetail: OrderDetailFormType
): OrderDetailFormType => {
  return {
    ...orderDetail,
    orderLines: orderDetail?.orderLines,
    serviceLines: orderDetail?.serviceLines,
    orderDate: orderDetail?.orderDate,
    orderStatus: orderDetail?.orderStatus || {
      uid: 'c5ef9d00-ac38-44c1-b48a-fde0d7095c54',
      name: 'Requested'
    }
  }
}

/**
 * Removes React Hook Form's internal 'id' field from orderLines and serviceLines before submitting to backend.
 * Backend doesn't need React Hook Form's id, it's an internal field for array management.
 */
const removeUuidsFromLines = <T extends Record<string, any>>(
  lines: T[] | undefined
): T[] | undefined => {
  if (!lines) return undefined

  return lines.map(line => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = line
    return rest as T
  })
}

/**
 * Prepares order data for backend submission:
 * - Removes React Hook Form's internal 'id' field from orderLines and serviceLines
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
