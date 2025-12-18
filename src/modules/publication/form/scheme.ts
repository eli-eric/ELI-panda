import { z } from 'zod'

import { isFeatureEnabled } from '@/config/featureFlags'

const codebookSchema = z.object({
  uid: z.string().min(1, 'UID is required'),
  name: z.string().min(1, 'Name is required')
})

/**
 * Schema for selected researcher (ELI Author).
 * Stores minimal data needed for display and API submission.
 */
const selectedResearcherSchema = z.object({
  uid: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1)
})

/**
 * Conditional validation for ELI Authors fields based on feature flag.
 * - When researcher picker is enabled: eliResearchers is required, eliAuthors is optional
 * - When disabled (production): eliAuthors is required, eliResearchers is optional
 */
const isResearcherPickerEnabled = isFeatureEnabled(
  'enableEliAuthorsResearcherPicker'
)

const eliAuthorsSchema = isResearcherPickerEnabled
  ? z.string().optional()
  : z.string().min(1, 'ELI Authors is required')

const eliResearchersSchema = isResearcherPickerEnabled
  ? z.array(selectedResearcherSchema).min(1, 'At least one ELI Author is required')
  : z.array(selectedResearcherSchema).optional()

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
  eliAuthors: eliAuthorsSchema,
  eliResearchers: eliResearchersSchema,
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
  issue: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => {
      if (val === '' || val === undefined) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    })
    .nullable(),

  impactFactor: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => {
      if (val === '' || val === undefined) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    })
    .nullable(),
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
  eliAuthors: eliAuthorsSchema,
  eliResearchers: eliResearchersSchema,
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
  impactFactor: z
    .union([z.string(), z.number()])
    .optional()
    .transform(val => {
      if (val === '' || val === undefined) return null
      const num = Number(val)
      return isNaN(num) ? null : num
    })
    .nullable(),
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
