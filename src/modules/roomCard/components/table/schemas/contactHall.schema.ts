import { z } from 'zod'

export const contactHallSchema = z.object({
  role: z
    .object({
      uid: z.string(),
      name: z.string()
    })
    .nullable()
    .refine(val => val !== null, {
      message: 'Role is required'
    }),
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

export type ContactHallFormData = z.infer<typeof contactHallSchema>
