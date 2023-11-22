import * as yup from 'yup'

import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { Facility } from '@/types/gql/graphql'

export type UserFormType = {
  email: string
  facility: Facility
  firstName: string
  isEnabled: boolean
  lastName: string
  password: string
  confirmPassword: string
  roles: CodebookType[]
}

export const userFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  facility: yup.mixed<Facility>().required(),
  firstName: yup.string().required(),
  isEnabled: yup.boolean().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
  roles: yup
    .array()
    .of(yup.mixed<CodebookType>().required())
    .test('at-least-one-role', 'Missing selected role', function () {
      return this.parent.roles.length > 0
    })
    .required()
})
