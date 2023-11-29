import * as yup from 'yup'

import type { CodebookType } from '@/hooks/fetch/useCodebook'

export const userFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  facility: yup.mixed<CodebookType>().required(),
  firstName: yup.string().required(),
  isEnabled: yup.boolean().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  employee: yup.mixed<CodebookType>().required(),
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

export const userUpdateFormSchema = yup.object().shape({
  email: yup.string().email().required(),
  facility: yup.mixed<CodebookType>().required(),
  firstName: yup.string().required(),
  isEnabled: yup.boolean().required(),
  lastName: yup.string().required(),
  employee: yup.mixed<CodebookType>(),
  password: yup.string(),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
})
