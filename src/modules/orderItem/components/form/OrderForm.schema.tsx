import { array, object, string } from 'yup'

export const schema = object({
  name: string().required("Order's name is required"),
  supplier: object().nullable(),
  orderStatus: object().nullable(),
  orderNumber: string().nullable(),
  requestNumber: string().nullable(),
  contractNumber: string(),
  notes: string(),
  orderDate: string(),
  orderLines: array().min(1, 'Order must have at least one Order Line'),
  atLeastOneFilled: string().test(
    'at-least-one-filled',
    'At least one of Order Number, Request Number or Contract Number must be filled',
    function () {
      const { orderNumber, requestNumber, contractNumber } = this.parent
      return Boolean(orderNumber || requestNumber || contractNumber)
    }
  )
})
