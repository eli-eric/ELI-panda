import { object, string } from 'yup'

export const schema = object({
  name: string().required('Name is required'),
  catalogueNumber: string().required('Part Number is required'),
  category: object().nullable().required('Category is required')
})
