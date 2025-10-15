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
  // Required fields
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
  dateOfPublication: z.string().min(1, 'Date of Publication is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  keywords: z.string().min(1, 'Keywords is required'),
  oecdFord: z.string().min(1, 'OECD Ford is required'),
  publishingCountry: codebookSchema.refine(val => val, {
    message: 'Publishing Country is required'
  }),

  // Optional fields
  mediaType: z.string().min(1, 'Media Type is required'),
  shortJournalTitle: z.string().optional(),
  experimentalSystem: z.string().optional(),
  userCall: codebookSchema.nullable().optional(),
  userExperiment: z.string().optional(),
  webLink: z.string().optional(),
  issue: z.union([z.string(), z.number()]).optional(),
  impactFactor: z.union([z.string(), z.number()]).optional(),
  quartilBasis: z.string().optional(),
  quartil: z.string().nullable().optional(),
  grant: z.string().optional(),
  wosNumber: z.string().optional(),
  issn: z.string().optional(),
  eissn: z.string().optional(),
  eidScopus: z.string().optional(),
  language: z.string().optional(),
  note: z.string().optional()
})

export const publicationOtherSchema = z.object({
  // Required fields
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
  dateOfPublication: z.string().min(1, 'Date of Publication is required'),
  abstract: z.string().min(1, 'Abstract is required'),
  keywords: z.string().min(1, 'Keywords is required'),
  publishingCountry: codebookSchema.refine(val => val, {
    message: 'Publishing Country is required'
  }),

  // Optional fields (different from peer-reviewed)
  mediaType: z.string().optional(),
  doi: z.string().optional(), // Optional for Other articles
  volume: z.union([z.string(), z.number()]).optional(), // Optional for Other articles
  oecdFord: z.string().optional(), // Optional for Other articles
  experimentalSystem: z.string().optional(),
  userCall: codebookSchema.nullable().optional(),
  userExperiment: z.string().optional(),
  webLink: z.string().optional(),
  issue: z.union([z.string(), z.number()]).optional(),
  impactFactor: z.union([z.string(), z.number()]).optional(),
  shortJournalTitle: z.string().optional(),
  quartilBasis: z.string().optional(),
  quartil: z.string().nullable().optional(),
  grant: z.string().optional(),
  wosNumber: z.string().optional(),
  issn: z.string().optional(),
  eissn: z.string().optional(),
  eidScopus: z.string().optional(),
  language: z.string().optional(),
  note: z.string().optional()
})

export type PublicationPeerReviewedFormData = z.infer<
  typeof publicationPeerReviewedSchema
>
export type PublicationOtherFormData = z.infer<typeof publicationOtherSchema>

// For backward compatibility with existing code
export const validationSchemePeerReviewed = publicationPeerReviewedSchema
export const validationSchemeOther = publicationOtherSchema
