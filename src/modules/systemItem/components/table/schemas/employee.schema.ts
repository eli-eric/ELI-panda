import { z } from 'zod'

export const employeeSchema = z.object({
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

export type EmployeeFormData = z.infer<typeof employeeSchema>
