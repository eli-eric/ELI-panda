import { z } from 'zod'

const codebookTypeSchema = z.object({
  uid: z.string(),
  name: z.string(),
  code: z.string().optional(),
}).passthrough()

const propertySchema = z.object({
  uid: z.string().optional(),
  name: z.string().min(1, "Property Name can't be empty"),
  type: codebookTypeSchema.nullable(),
  unit: codebookTypeSchema.nullable(),
  defaultValue: z.string().nullable().optional(),
  listOfValues: z.array(z.string().min(1, "Value can't be empty")).optional(),
})

const groupSchema = z.object({
  uid: z.string().optional(),
  name: z.string().min(1, "Group Name can't be empty"),
  properties: z.array(propertySchema).min(1, "Properties can't be empty"),
})

export const categoryValidationSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  systemType: codebookTypeSchema.nullable(),
  groups: z.array(groupSchema).nullable(),
  parentUID: z.string().optional(),
  uid: z.string().optional(),
  code: z.string().min(1, "Code can't be empty"),
  image: z.string().optional(),
  physicalItemProperties: z
    .array(propertySchema)
    .min(1, "Properties can't be empty"),
})

export type CategoryFormType = z.infer<typeof categoryValidationSchema>