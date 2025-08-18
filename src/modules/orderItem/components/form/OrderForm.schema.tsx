import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().required("Order's name is required"),
  supplier: yup.object().nullable().optional(),
  orderStatus: yup.object().nullable().optional(),
  orderNumber: yup.string().nullable().optional(),
  requestNumber: yup.string().nullable().optional(),
  contractNumber: yup.string().optional(),
  notes: yup.string().optional(),
  orderDate: yup.string().optional(),
  atLeastOneFilled: yup.string().optional()
}).test(
  'at-least-one-filled',
  'At least one of Order Number, Request Number or Contract Number must be filled',
  function(value) {
    const { orderNumber, requestNumber, contractNumber } = value || {}
    return Boolean(orderNumber || requestNumber || contractNumber)
  }
)
