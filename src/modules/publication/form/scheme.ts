import { z } from 'zod'

const codebookSchema = z.object({
  uid: z.string().min(1, 'UID is required'),
  name: z.string().min(1, 'Name is required')
})

const authorsDepartmentSchema = z.object({
  department: codebookSchema.nullable().refine(val => val !== null, {
    message: 'Department is required'
  }),
  authorsCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer')
})

export const publicationPeerReviewedSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  doi: z.string().min(1, 'DOI is required'),
  openAccessType: codebookSchema.refine(val => val, {
    message: 'Open Access Type is required'
  }),
  title: z.string().min(1, 'Title is required'),
  allAuthors: z.string().min(1, 'All Authors is required'),
  allAuthorsCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  eliAuthors: z.string().min(1, 'ELI Authors is required'),
  eliAuthorsCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  authorsDepartments: z.array(authorsDepartmentSchema).optional(),
  longJournalTitle: z.string().min(1, 'Long Journal Title is required'),
  volume: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  pages: z.string().min(1, 'Pages is required'),
  pagesCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  citeAs: z.string().min(1, 'Cite As is required'),
  yearOfPublication: z.string().min(1, 'Year of Publication is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  keywords: z.string().min(1, 'Keywords is required'),
  oecdFord: z.string().min(1, 'OECD Ford is required'),
  publishingCountry: codebookSchema.refine(val => val, {
    message: 'Publishing Country is required'
  })
})

export const publicationOtherSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  openAccessType: codebookSchema.refine(val => val, {
    message: 'Open Access Type is required'
  }),
  title: z.string().min(1, 'Title is required'),
  allAuthors: z.string().min(1, 'All Authors is required'),
  allAuthorsCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  eliAuthors: z.string().min(1, 'ELI Authors is required'),
  eliAuthorsCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  authorsDepartments: z.array(authorsDepartmentSchema).optional(),
  longJournalTitle: z.string().min(1, 'Long Journal Title is required'),
  pages: z.string().min(1, 'Pages is required'),
  pagesCount: z.union([z.string(), z.number()]).refine(val => {
    const num = Number(val)
    return !isNaN(num) && num > 0 && Number.isInteger(num)
  }, 'Must be a positive integer'),
  citeAs: z.string().min(1, 'Cite As is required'),
  yearOfPublication: z.string().min(1, 'Year of Publication is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  keywords: z.string().min(1, 'Keywords is required'),
  publishingCountry: codebookSchema.refine(val => val, {
    message: 'Publishing Country is required'
  })
})

export type PublicationPeerReviewedFormData = z.infer<typeof publicationPeerReviewedSchema>
export type PublicationOtherFormData = z.infer<typeof publicationOtherSchema>

// For backward compatibility with existing code
export const validationSchemePeerReviewed = publicationPeerReviewedSchema
export const validationSchemeOther = publicationOtherSchema
