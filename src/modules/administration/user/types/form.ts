import type { z } from 'zod'

import type { userFormSchema, userUpdateFormSchema } from '../components/form/User.schema'

export type UserCreateFormType = z.infer<typeof userFormSchema>

export type UserUpdateFormType = z.infer<typeof userUpdateFormSchema>
