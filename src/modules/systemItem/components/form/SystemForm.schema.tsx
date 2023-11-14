import { object, string } from 'yup'

export const schema = object({
  name: string().required(),
  systemLevel: string().nullable().required(),
  responsible: object().nullable()
})
