import { z } from 'zod'

export const contactDeptSchema = z.object({
  employee: z
    .object({
      uid: z.string(),
      name: z.string().optional(),
      fullName: z.string().optional()
    })
    .nullable()
    .refine(val => val !== null, {
      message: 'Employee is required'
    })
})

export type ContactDeptFormData = z.infer<typeof contactDeptSchema>
