import { object, string } from 'yup'

export const schema = object({
  name: string().required(),
  systemLevel: string().nullable().required(),
  responsible: object().nullable()
})

/* const catalogueItemSchema = object().shape({
  uid: string(),
  name: string(),
  catalogueNumber: string(),
  description: string(),
  category: mixed<CodebookType>().nullable(),
  supplier: mixed<CodebookType>().nullable(),
  manufacturerUrl: string(),
  details: array().of(
    object().shape({
      uid: string(),
      name: string(),
      value: string(),
    })
  ),
}).notRequired().nullable(); // Make the entire CatalogueItem schema optional and nullable

// Define the Yup schema for PhysicalItem
const physicalItemSchema = object().shape({
  uid: string(),
  conditionStatus: mixed<CodebookType>().nullable(),
  itemUsage: mixed<CodebookType>().nullable(),
  price: number(),
  currency: string(),
  notes: string(),
  eun: string(),
  serialNumber: string(),
  catalogueItem: catalogueItemSchema, // Use the defined CatalogueItem schema
}).notRequired().nullable()

export const schema = object().shape({
  uid: string().notRequired(), // from router
  name: string().required(),
  systemLevel: mixed<SystemLevel>().required(),
  responsible: mixed<CodebookType>(), // combobox - CODEBOOK.EMPLOYEE
  description: string(), // textarea
  parentPath: array().of(mixed<CodebookType>().nullable()),
  location: mixed<CodebookType>(), // combobox - CODEBOOK.LOCATION
  zone: mixed<CodebookType>(), // combobox
  systemType: mixed<CodebookType>(), // ListBox
  systemCode: string(), // automaticky generovaný viz system edit - api dodá J.Š.
  systemAlias: string(), // input
  owner: mixed<CodebookType>(), // combobox - CODEBOOK.EMPLOYEE
  importance: mixed<CodebookType>(), // listbox - CODEBOOK.SYSTEM_IMPORTANCE
  physicalItem: physicalItemSchema, // Use the defined PhysicalItem schema
  operators:  array().of(mixed<Employee>()),
  maintainedBy:  array().of(mixed<Employee>()),
  hasImageGalleryChanges: bool(),
}) */
