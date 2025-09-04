import { z } from 'zod'

import type { CodebookType } from '@/types/responses/codebook'

export const userFormSchema = z.object({
  email: z.string().email(),
  facility: z.custom<CodebookType>(),
  firstName: z.string().min(1),
  isEnabled: z.boolean(),
  lastName: z.string().min(1),
  password: z.string().min(1),
  employee: z.custom<CodebookType>().nullable(),
  confirmPassword: z.string().min(1),
  roles: z.array(z.custom<CodebookType>()).min(1, 'Missing selected role')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})

export const userUpdateFormSchema = z.object({
  email: z.string().email(),
  facility: z.custom<CodebookType>(),
  firstName: z.string().min(1),
  isEnabled: z.boolean(),
  lastName: z.string().min(1),
  employee: z.custom<CodebookType>().nullable(),
  password: z.string().optional(),
  confirmPassword: z.string().optional()
}).refine(data => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: 'Passwords must match',
  path: ['confirmPassword']
})
