import { z } from 'zod'

export const schema = z.object({
  name: z.string().min(1, "Order's name is required"),
  supplier: z.object({}).nullable().optional(),
  orderStatus: z.object({}).nullable().optional(),
  orderNumber: z.string().nullable().optional(),
  requestNumber: z.string().nullable().optional(),
  contractNumber: z.string().optional(),
  notes: z.string().optional(),
  orderDate: z.string().optional(),
  atLeastOneFilled: z.string().optional()
}).refine((data) => {
  return Boolean(data.orderNumber || data.requestNumber || data.contractNumber)
}, {
  message: 'At least one of Order Number, Request Number or Contract Number must be filled',
  path: ['atLeastOneFilled']
})
