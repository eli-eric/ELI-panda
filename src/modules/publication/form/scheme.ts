import { z } from 'zod'

import { messages as englishMessages } from '@/i18n/src/locale/en'

import { ELI_PUBLICATION, isMediaTypeC, isMediaTypeCOrD, isMediaTypeD } from '../types/constants'
import { normalizeDoi } from '../utils/doi'

const publicationMessages = englishMessages.publication.form

const publicationYearSchema = z
    .string()
    .regex(/^\d{4}$/u, publicationMessages.yearOfPublication.invalid)

/** Only the exact persisted DOI is exempt from syntax checks during editing. */
const isValidOrUnchangedDoi = (value: string, originalDoi?: string | null) =>
    Boolean(normalizeDoi(value)) || (typeof originalDoi === 'string' && value === originalDoi)

const requiredDoiSchema = (originalDoi?: string | null) =>
    z
        .string()
        .min(1, 'DOI is required')
        .refine(value => isValidOrUnchangedDoi(value, originalDoi), publicationMessages.doi.invalid)
const optionalDoiSchema = (originalDoi?: string | null) =>
    z
        .string()
        .nullable()
        .optional()
        .refine(
            value => !value || isValidOrUnchangedDoi(value, originalDoi),
            publicationMessages.doi.invalid,
        )

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

const eliAuthorsSchema = z.string().nullable().optional()

const eliResearchersSchema = z
    .array(selectedResearcherSchema)
    .min(1, 'At least one ELI Author is required')

const authorsDepartmentSchema = z.object({
    department: codebookSchema.nullable().refine(val => val !== null, {
        message: 'Department is required',
    }),
    authorsCount: z.union([z.string(), z.number()]).refine(val => {
        const num = Number(val)
        return !isNaN(num) && num > 0 && Number.isInteger(num)
    }, 'Must be a positive integer'),
})

/** Requires a DOI, allowing an exact persisted legacy value during edits. */
export const createPublicationPeerReviewedSchema = (originalDoi?: string | null) =>
    z.object({
        // Required fields
        eliPublication: z.nativeEnum(ELI_PUBLICATION).default(ELI_PUBLICATION.YES),
        code: z.string().min(1, 'Code is required'),
        doi: requiredDoiSchema(originalDoi),
        openAccessType: codebookSchema.nullable().refine(val => val !== null, {
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
        yearOfPublication: publicationYearSchema,
        dateOfPublication: z.string().min(1, 'Date of Publication is required'),
        abstract: z.string().min(1, 'Abstract is required'),
        keywords: z.string().min(1, 'Keywords is required'),
        oecdFord: z.string().min(1, 'OECD Ford is required'),
        publishingCountry: codebookSchema.nullable().refine(val => val !== null, {
            message: 'Publishing Country is required',
        }),

        // Optional fields
        mediaTypeCb: codebookSchema.nullable().refine(val => val !== null, {
            message: 'Media Type is required',
        }),
        shortJournalTitle: z.string().nullable().optional(),
        experimentalSystemCb: codebookSchema.nullable().optional(),
        userCall: codebookSchema.nullable().optional(),
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

/** Allows an empty DOI; otherwise checks new values and preserves unchanged legacy values. */
export const createPublicationOtherSchema = (originalDoi?: string | null) =>
    z
        .object({
            // Required fields
            eliPublication: z.nativeEnum(ELI_PUBLICATION).default(ELI_PUBLICATION.YES),
            code: z.string().min(1, 'Code is required'),
            openAccessType: codebookSchema.nullable().refine(val => val !== null, {
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
            yearOfPublication: publicationYearSchema,
            dateOfPublication: z.string().min(1, 'Date of Publication is required'),
            abstract: z.string().min(1, 'Abstract is required'),
            keywords: z.string().min(1, 'Keywords is required'),
            publishingCountry: codebookSchema.nullable().refine(val => val !== null, {
                message: 'Publishing Country is required',
            }),

            // Optional fields (different from peer-reviewed)
            mediaTypeCb: codebookSchema.nullable().refine(val => val !== null, {
                message: 'Media Type is required',
            }),
            doi: optionalDoiSchema(originalDoi), // Optional for Other articles
            volume: z.union([z.string(), z.number()]).nullable().optional(), // Optional for Other articles
            oecdFord: z.string().nullable().optional(), // Optional for Other articles
            experimentalSystemCb: codebookSchema.nullable().optional(),
            userCall: codebookSchema.nullable().optional(),
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
        .superRefine((data, ctx) => {
            const uid = data.mediaTypeCb?.uid
            if (isMediaTypeCOrD(uid)) {
                if (!data.publisher)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Publisher is required',
                        path: ['publisher'],
                    })
                if (!data.publishPlace)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Publish place is required',
                        path: ['publishPlace'],
                    })
                if (!data.publishFormatCb?.uid)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Publish format is required',
                        path: ['publishFormatCb'],
                    })
            }
            if (isMediaTypeC(uid)) {
                if (!data.isbn)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'ISBN is required',
                        path: ['isbn'],
                    })
                if (!data.bookTitle)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Book title is required',
                        path: ['bookTitle'],
                    })
                if (!data.bookPagesCount)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Book pages count is required',
                        path: ['bookPagesCount'],
                    })
                if (!data.editionVolume)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Edition/volume is required',
                        path: ['editionVolume'],
                    })
            }
            if (isMediaTypeD(uid)) {
                if (!data.proceedingsIsbn)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Proceedings ISBN is required',
                        path: ['proceedingsIsbn'],
                    })
                if (!data.conferenceDate)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Conference date is required',
                        path: ['conferenceDate'],
                    })
                if (!data.conferencePlace)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Conference place is required',
                        path: ['conferencePlace'],
                    })
                if (!data.conferenceScopeCb?.uid)
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: 'Conference scope is required',
                        path: ['conferenceScopeCb'],
                    })
            }
        })

// Without a persisted original, creation always uses strict DOI syntax checks.
export const publicationPeerReviewedSchema = createPublicationPeerReviewedSchema()
export const publicationOtherSchema = createPublicationOtherSchema()

export type PublicationPeerReviewedFormData = z.infer<typeof publicationPeerReviewedSchema>
export type PublicationOtherFormData = z.infer<typeof publicationOtherSchema>

// For backward compatibility with existing code
export const validationSchemePeerReviewed = publicationPeerReviewedSchema
export const validationSchemeOther = publicationOtherSchema
