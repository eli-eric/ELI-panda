import { z } from 'zod'

export const employeeAssignmentSchema = z.object({
    employee: z
        .object({
            uid: z.string(),
            name: z.string().optional().nullable(),
            fullName: z.string().optional().nullable(),
            phone1: z.string().optional().nullable(),
            phone2: z.string().optional().nullable(),
        })
        .nullable(),
})

export type EmployeeAssignmentFormData = z.infer<typeof employeeAssignmentSchema>
