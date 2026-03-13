import { z } from 'zod'

import { isFeatureEnabled } from '@/config/featureFlags'

import {
    ELI_PUBLICATION,
    isMediaTypeC,
    isMediaTypeCOrD,
    isMediaTypeD,
} from '../types/constants'

const codebookSchema = z.object({
    uid: z.string().min(1, 'UID is required'),
    name: z.string().min(1, 'Name is required'),
})

/**
 * Schema for selected researcher (ELI Author).
 * Stores minimal data needed for display and API submission.
 */
const selectedResearcherSchema = z.object({
    uid: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
})

/**
 * Schema for selected grant.
 * Stores minimal data needed for display and API submission.
 */
const selectedGrantSchema = z.object({
    uid: z.string().min(1),
    code: z.string().min(1),
    name: z.string().min(1),
})

/**
 * Conditional validation for ELI Authors fields based on feature flag.
 * - When researcher picker is enabled: eliResearchers is required, eliAuthors is optional
 * - When disabled (production): eliAuthors is required, eliResearchers is optional
 */
const isResearcherPickerEnabled = isFeatureEnabled('enableEliAuthorsResearcherPicker')

const eliAuthorsSchema = isResearcherPickerEnabled
    ? z.string().nullable().optional()
    : z.string().min(1, 'ELI Authors is required')

const eliResearchersSchema = isResearcherPickerEnabled
    ? z.array(selectedResearcherSchema).min(1, 'At least one ELI Author is required')
    : z.array(selectedResearcherSchema).optional()

const authorsDepartmentSchema = z.object({
    department: codebookSchema.nullable().refine(val => val !== null, {
        message: 'Department is required',
    }),
    authorsCount: z.union([z.string(), z.number()]).refine(val => {
        const num = Number(val)
        return !isNaN(num) && num > 0 && Number.isInteger(num)
    }, 'Must be a positive integer'),
})

export const publicationPeerReviewedSchema = z.object({
    // Required fields
    eliPublication: z.nativeEnum(ELI_PUBLICATION).default(ELI_PUBLICATION.YES),
    code: z.string().min(1, 'Code is required'),
    doi: z.string().min(1, 'DOI is required'),
    openAccessType: codebookSchema.refine(val => val, {
        message: 'Open Access Type is required',
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
        message: 'Publishing Country is required',
    }),

    // Optional fields
    mediaType: z.string().nullable().optional(),
    mediaTypeCb: codebookSchema.refine(val => val, {
        message: 'Media Type is required',
    }),
    shortJournalTitle: z.string().nullable().optional(),
    experimentalSystem: z.string().nullable().optional(),
    experimentalSystemCb: codebookSchema.nullable().optional(),
    userCall: codebookSchema.nullable().optional(),
    userExperiment: z.string().nullable().optional(),
    userExperimentCb: codebookSchema.nullable().optional(),
    webLink: z.string().nullable().optional(),
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
    quartilBasis: z.string().nullable().optional(),
    quartil: z.string().nullable().optional(),
    grant: z.string().nullable().optional(),
    grants: z.array(selectedGrantSchema).optional(),
    otherGrants: z.string().nullable().optional(),
    wosNumber: z.string().nullable().optional(),
    issn: z.string().nullable().optional(),
    eissn: z.string().nullable().optional(),
    eidScopus: z.string().nullable().optional(),
    language: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
    // C or D
    publisher: z.string().nullable().optional(),
    publishPlace: z.string().nullable().optional(),
    publishFormatCb: codebookSchema.nullable().optional(),
    // C only
    isbn: z.string().nullable().optional(),
    bookTitle: z.string().nullable().optional(),
    bookPagesCount: z
        .union([z.string(), z.number()])
        .optional()
        .transform(val => {
            if (val === '' || val === undefined) return null
            const num = Number(val)
            return isNaN(num) ? null : num
        })
        .nullable(),
    editionVolume: z.string().nullable().optional(),
    // D only
    proceedingsIsbn: z.string().nullable().optional(),
    conferenceDate: z.string().nullable().optional(),
    conferencePlace: z.string().nullable().optional(),
    conferenceScopeCb: codebookSchema.nullable().optional(),
})

export const publicationOtherSchema = z.object({
    // Required fields
    eliPublication: z.nativeEnum(ELI_PUBLICATION).default(ELI_PUBLICATION.YES),
    code: z.string().min(1, 'Code is required'),
    openAccessType: codebookSchema.refine(val => val, {
        message: 'Open Access Type is required',
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
        message: 'Publishing Country is required',
    }),

    // Optional fields (different from peer-reviewed)
    mediaType: z.string().nullable().optional(),
    mediaTypeCb: codebookSchema.optional().refine(val => val !== undefined, {
        message: 'Media Type is required',
    }),
    doi: z.string().nullable().optional(), // Optional for Other articles
    volume: z.union([z.string(), z.number()]).nullable().optional(), // Optional for Other articles
    oecdFord: z.string().nullable().optional(), // Optional for Other articles
    experimentalSystem: z.string().nullable().optional(),
    experimentalSystemCb: codebookSchema.nullable().optional(),
    userCall: codebookSchema.nullable().optional(),
    userExperiment: z.string().nullable().optional(),
    userExperimentCb: codebookSchema.nullable().optional(),
    webLink: z.string().nullable().optional(),
    issue: z.union([z.string(), z.number()]).nullable().optional(),
    impactFactor: z
        .union([z.string(), z.number()])
        .optional()
        .transform(val => {
            if (val === '' || val === undefined) return null
            const num = Number(val)
            return isNaN(num) ? null : num
        })
        .nullable(),
    shortJournalTitle: z.string().nullable().optional(),
    quartilBasis: z.string().nullable().optional(),
    quartil: z.string().nullable().optional(),
    grant: z.string().nullable().optional(),
    grants: z.array(selectedGrantSchema).optional(),
    otherGrants: z.string().nullable().optional(),
    wosNumber: z.string().nullable().optional(),
    issn: z.string().nullable().optional(),
    eissn: z.string().nullable().optional(),
    eidScopus: z.string().nullable().optional(),
    language: z.string().nullable().optional(),
    note: z.string().nullable().optional(),
    // C or D
    publisher: z.string().nullable().optional(),
    publishPlace: z.string().nullable().optional(),
    publishFormatCb: codebookSchema.nullable().optional(),
    // C only
    isbn: z.string().nullable().optional(),
    bookTitle: z.string().nullable().optional(),
    bookPagesCount: z
        .union([z.string(), z.number()])
        .optional()
        .transform(val => {
            if (val === '' || val === undefined) return null
            const num = Number(val)
            return isNaN(num) ? null : num
        })
        .nullable(),
    editionVolume: z.string().nullable().optional(),
    // D only
    proceedingsIsbn: z.string().nullable().optional(),
    conferenceDate: z.string().nullable().optional(),
    conferencePlace: z.string().nullable().optional(),
    conferenceScopeCb: codebookSchema.nullable().optional(),
}).superRefine((data, ctx) => {
    const uid = data.mediaTypeCb?.uid
    if (isMediaTypeCOrD(uid)) {
        if (!data.publisher) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Publisher is required', path: ['publisher'] })
        if (!data.publishPlace) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Publish place is required', path: ['publishPlace'] })
        if (!data.publishFormatCb?.uid) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Publish format is required', path: ['publishFormatCb'] })
    }
    if (isMediaTypeC(uid)) {
        if (!data.isbn) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'ISBN is required', path: ['isbn'] })
        if (!data.bookTitle) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Book title is required', path: ['bookTitle'] })
        if (!data.bookPagesCount) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Book pages count is required', path: ['bookPagesCount'] })
        if (!data.editionVolume) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Edition/volume is required', path: ['editionVolume'] })
    }
    if (isMediaTypeD(uid)) {
        if (!data.proceedingsIsbn) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Proceedings ISBN is required', path: ['proceedingsIsbn'] })
        if (!data.conferenceDate) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Conference date is required', path: ['conferenceDate'] })
        if (!data.conferencePlace) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Conference place is required', path: ['conferencePlace'] })
        if (!data.conferenceScopeCb?.uid) ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Conference scope is required', path: ['conferenceScopeCb'] })
    }
})

export type PublicationPeerReviewedFormData = z.infer<typeof publicationPeerReviewedSchema>
export type PublicationOtherFormData = z.infer<typeof publicationOtherSchema>

// For backward compatibility with existing code
export const validationSchemePeerReviewed = publicationPeerReviewedSchema
export const validationSchemeOther = publicationOtherSchema
