import type { z } from 'zod'

import type { CodebookType } from '@/types/responses/codebook'

import { userFormSchema, userUpdateFormSchema } from '../components/form/User.schema'

export type UserCreateFormType = z.infer<typeof userFormSchema>

export type UserUpdateFormType = z.infer<typeof userUpdateFormSchema>
