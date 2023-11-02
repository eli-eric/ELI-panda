import { object, string } from 'yup'

export const schema = object({
  name: string().required(),
  systemLevel: object().nullable().required(),
  description: string().nullable(),
  systemType: object().nullable(),
  systemCode: string().nullable(),
  systemAlias: string().nullable(),
  responsiblePerson: object().nullable(),
  location: object().nullable(),
  owner: object().nullable(),
  importance: object().nullable(),
  zone: object().nullable()
})
